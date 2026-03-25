#!/bin/bash
# OpenClash 配置合并工具
# 用法: ./merge.sh <订阅链接或本地文件> [输出文件]

set -e

# 获取 skill 目录（脚本所在目录的父目录）
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS_DIR="$SKILL_DIR/assets"

INPUT="${1:-}"
OUTPUT="${2:-$HOME/Downloads/openclash_merged.yaml}"

if [ -z "$INPUT" ]; then
    echo "用法: $0 <订阅链接或本地文件> [输出文件]"
    echo ""
    echo "示例:"
    echo "  $0 'https://xxx.com/sub/xxx/clash'"
    echo "  $0 /path/to/provider.yaml"
    echo "  $0 'https://xxx.com/sub' ./my-config.yaml"
    exit 1
fi

TEMP_DIR=$(mktemp -d)
PROVIDER_FILE="$TEMP_DIR/provider.yaml"

# 1. 获取提供商配置
echo "📥 获取提供商配置..."
if [[ "$INPUT" == http* ]]; then
    curl -sL -o "$PROVIDER_FILE" "$INPUT"
else
    cp "$INPUT" "$PROVIDER_FILE"
fi

if [ ! -s "$PROVIDER_FILE" ]; then
    echo "❌ 获取配置失败"
    rm -rf "$TEMP_DIR"
    exit 1
fi

# 2. 使用 Node.js 处理
echo "🔧 处理配置..."
node - "$PROVIDER_FILE" "$ASSETS_DIR/template.yaml" "$ASSETS_DIR/rules.yaml" "$OUTPUT" << 'NODEJS'
const { readFileSync, writeFileSync } = require('fs');

const providerPath = process.argv[2];
const templatePath = process.argv[3];
const rulesPath = process.argv[4];
const outputPath = process.argv[5];

// 读取提供商配置
const provider = readFileSync(providerPath, 'utf-8');

// 提取 proxies 部分
const proxiesStart = provider.indexOf('proxies:');
const proxiesEnd = provider.indexOf('\nproxy-groups:');
if (proxiesStart === -1 || proxiesEnd === -1) {
    console.error('❌ 无法解析配置文件');
    process.exit(1);
}
const proxiesSection = provider.slice(proxiesStart, proxiesEnd);

// 提取节点名
const nodeNames = [];
for (const line of proxiesSection.split('\n')) {
    const match = line.match(/^- name: (.+)$/);
    if (match) {
        nodeNames.push(match[1].replace(/^["']|["']$/g, ''));
    }
}
console.log(`  节点数: ${nodeNames.length}`);

// 按地区分类
const categories = {
    HK: [], JP: [], US: [], SG: [], TW: [], KR: [],
    GB: [], DE: [], AU: [], CA: [], FR: [],
    OTHER: []
};

const regionMap = {
    '香港': 'HK', 'HK': 'HK', 'Hong Kong': 'HK',
    '日本': 'JP', 'JP': 'JP', 'Japan': 'JP',
    '美国': 'US', 'US': 'US', 'USA': 'US', 'America': 'US',
    '新加坡': 'SG', 'SG': 'SG', 'Singapore': 'SG', '狮城': 'SG',
    '台湾': 'TW', 'TW': 'TW', 'Taiwan': 'TW',
    '韩国': 'KR', 'KR': 'KR', 'Korea': 'KR',
    '英国': 'GB', 'UK': 'GB', 'GB': 'GB', 'United Kingdom': 'GB', 'Britain': 'GB',
    '德国': 'DE', 'DE': 'DE', 'Germany': 'DE',
    '澳大利亚': 'AU', '澳洲': 'AU', 'AU': 'AU', 'Australia': 'AU',
    '加拿大': 'CA', 'CA': 'CA', 'Canada': 'CA',
    '法国': 'FR', 'FR': 'FR', 'France': 'FR'
};

for (const name of nodeNames) {
    let matched = false;
    for (const [keyword, region] of Object.entries(regionMap)) {
        if (name.includes(keyword)) {
            categories[region].push(name);
            matched = true;
            break;
        }
    }
    if (!matched) categories.OTHER.push(name);
}

// 打印分类结果
const regionNames = {
    HK:'香港', JP:'日本', US:'美国', SG:'新加坡', TW:'台湾', KR:'韩国',
    GB:'英国', DE:'德国', AU:'澳洲', CA:'加拿大', FR:'法国'
};
for (const [region, nodes] of Object.entries(categories)) {
    if (nodes.length > 0 && region !== 'OTHER') {
        console.log(`  ${regionNames[region]}: ${nodes.length}`);
    }
}
if (categories.OTHER.length > 0) {
    console.log(`  其他: ${categories.OTHER.length}`);
}

// 读取模板
let template = readFileSync(templatePath, 'utf-8');

// 读取规则
const rules = readFileSync(rulesPath, 'utf-8');

// 格式化节点列表
const fmt = (arr) => arr.length > 0
    ? arr.map(n => `  - ${n}`).join('\n')
    : '  - DIRECT';

// 所有节点（按地区顺序）
const allNodes = [
    ...categories.HK, ...categories.TW, ...categories.JP,
    ...categories.SG, ...categories.US, ...categories.KR,
    ...categories.GB, ...categories.DE, ...categories.AU,
    ...categories.CA, ...categories.FR, ...categories.OTHER
];

// 替换占位符
template = template
    .replace('{{PROXIES}}', proxiesSection)
    .replace('{{ALL_NODES}}', fmt(allNodes))
    .replace('{{HK_NODES}}', fmt(categories.HK.length ? categories.HK : allNodes.slice(0, 3)))
    .replace('{{JP_NODES}}', fmt(categories.JP.length ? categories.JP : allNodes.slice(0, 3)))
    .replace('{{US_NODES}}', fmt(categories.US.length ? categories.US : allNodes.slice(0, 3)))
    .replace('{{SG_NODES}}', fmt(categories.SG.length ? categories.SG : allNodes.slice(0, 3)))
    .replace('{{TW_NODES}}', fmt(categories.TW.length ? categories.TW : allNodes.slice(0, 3)))
    .replace('{{KR_NODES}}', fmt(categories.KR.length ? categories.KR : allNodes.slice(0, 3)))
    .replace('{{GB_NODES}}', fmt(categories.GB.length ? categories.GB : allNodes.slice(0, 3)))
    .replace('{{DE_NODES}}', fmt(categories.DE.length ? categories.DE : allNodes.slice(0, 3)))
    .replace('{{AU_NODES}}', fmt(categories.AU.length ? categories.AU : allNodes.slice(0, 3)))
    .replace('{{CA_NODES}}', fmt(categories.CA.length ? categories.CA : allNodes.slice(0, 3)))
    .replace('{{FR_NODES}}', fmt(categories.FR.length ? categories.FR : allNodes.slice(0, 3)))
    .replace('{{RULES}}', rules);

// 写入输出
writeFileSync(outputPath, template);
console.log(`\n✅ 生成完成: ${outputPath}`);
console.log(`  文件大小: ${(template.length / 1024).toFixed(0)}KB`);
NODEJS

rm -rf "$TEMP_DIR"
