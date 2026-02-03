---
name: personal:mac-docker
description: 个人 Docker 服务管理配置。包含服务清单、路径、端口映射、常用命令。触发词：docker、容器、heimdall、portainer、qinglong
compatibility: 需要 Docker Desktop。使用前将 $BASE_PATH 替换为实际路径
metadata:
  version: "1.0.0"
---

# Mac Docker 服务管理

> **个人配置**：使用前将 `$BASE_PATH` 替换为实际路径（如 `~/docker`）。

## 目录结构

```
$BASE_PATH/
├── docker-compose/    # compose 文件
├── envs/              # 环境变量
├── appdata/           # 持久化数据
└── appdirectory/      # NPM 数据
```

## 服务清单

| 服务 | Compose 文件 | 端口 | 访问地址 |
|------|-------------|------|----------|
| Heimdall | heimdall-compose.yml | 5233, 5234 | http://localhost:5233 |
| Nginx PM | nginx-pm-compose.yml | 80, 81, 443 | http://localhost:81 |
| Portainer | portainer-compose.yml | 9000 | http://localhost:9000 |
| Qinglong | qinglong-compose.yml | 5700 | http://localhost:5700 |
| MySQL | mysql-compose.yml | 3306 | localhost:3306 |
| Mermaid | mermaid-compose.yml | 3301 | http://localhost:3301 |
| Subconverter | subconverter-compose.yml | 25500 | http://localhost:25500 |
| Sub-web | sub-web-compose.yml | 18080 | http://localhost:18080 |

## 常用命令

```bash
# 状态查看
docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
docker stats --no-stream

# 服务管理（替换 [service] 为服务名）
docker compose -f $BASE_PATH/docker-compose/[service]-compose.yml up -d
docker compose -f $BASE_PATH/docker-compose/[service]-compose.yml down
docker compose -f $BASE_PATH/docker-compose/[service]-compose.yml restart
docker compose -f $BASE_PATH/docker-compose/[service]-compose.yml logs -f --tail 100

# 容器操作
docker logs [container] --tail 100
docker restart [container]

# 清理
docker image prune -f
docker system prune -a
```

## 故障排查

```bash
# 启动失败
docker logs [container] 2>&1
docker compose -f [file] config

# 端口冲突
lsof -i :[port]

# 磁盘占用
docker system df

# 网络检查
docker network ls
docker inspect [container] | grep -A 20 "Networks"
```

## 时区配置

```yaml
# docker-compose.yml
environment:
  - TZ=Asia/Shanghai
```

## 备份

关键目录：
- `$BASE_PATH/appdata/` — 应用数据
- `$BASE_PATH/appdirectory/` — NPM 数据

## 备注

- 重启策略：`restart: unless-stopped`
- Portainer 挂载 Docker socket
- NPM 管理 SSL 证书（Let's Encrypt）
