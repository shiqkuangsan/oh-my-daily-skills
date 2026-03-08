# 示例

三级工作流完整演练，展示阶段标记和预期行为。

## 口谕示例

> 天子："把 `getUserData` 函数全局重命名为 `fetchUserProfile`。"

**首辅：**

```text
[DRAFT]
方案：grep 搜索所有 getUserData 出现位置，重命名为 fetchUserProfile，
更新 import 和调用点。标准的查找替换加验证，确保无遗漏引用。
```

_执行：搜索代码库，重命名函数，更新所有引用。_

```text
[REPORT]
变更:
  src/api/user.ts        +1 -1  (函数声明)
  src/hooks/useUser.ts   +1 -1  (import + 调用点)
  src/pages/Profile.tsx   +1 -1  (调用点)
  tests/user.test.ts     +2 -2  (测试引用)
合计: 4 文件, +5 -5
```

**口谕模式中不发生的：** 无 plan 文件，无自审，无经验记录。快进快出。

---

## 廷议示例

> 天子："给这个 Express API 加上 JWT 认证，支持登录、token 刷新和路由保护中间件。"

**首辅：**

```text
[DRAFT]
方案已写入 plan 文件。

步骤:
1. 安装 jsonwebtoken 和 bcrypt 依赖
2. 创建 auth 中间件用于 token 验证
3. 添加 POST /auth/login 端点，校验凭据
4. 添加 POST /auth/refresh 端点，刷新 token
5. 将中间件应用到受保护路由
6. 编写全部认证流程测试

验收标准:
- 登录返回 access + refresh tokens
- 过期 access token 返回 401
- 有效 refresh token 可签发新 access token
- 受保护路由拒绝未认证请求
- 全部测试通过
```

```text
[REVIEW]
1. 可行性: 通过 - jsonwebtoken 成熟稳定，Express 中间件模式标准
2. 完整性: 通过 - 覆盖登录、刷新、中间件、测试
3. 风险: 通过 - JWT 无状态，回滚即移除中间件 + 路由
4. 范围: 通过 - 不做 session 存储、不做 OAuth、不做 RBAC（未被要求）
```

_逐步执行，打勾追踪……_

_第 1 步：安装依赖……_

**锦衣卫激活**（检测到依赖变更）：

> 扫描 package.json 变更。jsonwebtoken@9.0.0 和 bcrypt@5.1.0
> 已添加。当前版本无已知漏洞。通过。

_第 2-5 步：实现认证系统……_

_第 6 步：编写并运行测试……_

_一个测试失败：refresh token 测试预期 200 但返回 401。_

**大理寺激活**（测试失败）：

```text
[VERDICT]
表象: POST /auth/refresh 返回 401 而非 200
根因: refresh token 验证使用了 ACCESS_SECRET 而非 REFRESH_SECRET。
两种 token 都是合法 JWT，但使用不同密钥签名。
因果链: 从 access token 中间件复制了 verify() 调用，但未修改密钥参数。
修复建议: 将 refreshToken 处理函数（第 47 行）中的
jwt.verify(token, ACCESS_SECRET) 改为 jwt.verify(token, REFRESH_SECRET)。
防范措施: 将密钥选择抽取为按 token 类型参数化的辅助函数。
```

_天子批准判词。首辅修复。全部测试通过。_

```text
[REPORT]
验收标准:
- [x] 登录返回 access + refresh tokens
- [x] 过期 access token 返回 401
- [x] 有效 refresh token 签发新 access token
- [x] 受保护路由拒绝未认证请求
- [x] 全部测试通过 (8/8)

变更:
  package.json              +2 -0  (新依赖)
  src/middleware/auth.ts     +45 -0 (新文件: JWT 中间件)
  src/routes/auth.ts         +62 -0 (新文件: 登录 + 刷新)
  src/routes/index.ts        +3 -1  (应用中间件)
  tests/auth.test.ts         +89 -0 (新文件: 8 个测试用例)
合计: 5 文件, +201 -1
```

**翰林院记录：**

```text
- 错误: 复制粘贴 jwt.verify() 调用并在每个调用点硬编码密钥
  正确: 将 token 验证抽取为接受 token 类型参数的辅助函数
  场景: 任何处理多种 JWT token 类型的代码
  防范: 实现多 token JWT 时，始终参数化密钥选择
```

---

## 早朝示例

> 天子："给这个 API 搭建 Docker 部署，写部署文档，再对代码库做一次安全审计。"

**首辅：**

```text
[DRAFT]
此任务涉及三个独立专业领域需并行处理。
建议启用早朝模式。

派发计划:
- 工部: Dockerfile + docker-compose + CI 流水线
- 礼部: 部署文档（README 章节 + 独立指南）
- 刑部: 安全审计（依赖扫描 + 代码审查 + OWASP 检查）

依赖关系: 各部之间无依赖，可全部并行。
工部提供 Docker 配置，礼部写部署文档，刑部审计现有代码。

验收标准:
- 工部: docker-compose up 能成功启动 API
- 礼部: 文档覆盖构建、运行、环境变量、故障排查
- 刑部: 安全报告含严重等级评定，无未解决的 critical 问题
```

```text
[REVIEW]
1. 可行性: 通过 - 三个独立领域，标准工具链
2. 完整性: 通过 - 覆盖基础设施、文档、安全
3. 风险: 通过 - 全部并行，无交叉依赖，各部可独立失败
4. 范围: 通过 - 不做 Kubernetes、不做监控搭建、不做压力测试（未被要求）
```

**通政使司派发：**

```text
[DISPATCH] -> 工部
任务: 创建 Docker 部署配置
验收标准:
  - 多阶段构建的 Dockerfile
  - 包含 API + 数据库服务的 docker-compose.yml
  - 用于干净构建的 .dockerignore
  - docker-compose up 启动 API 并响应健康检查
上下文: Express API + PostgreSQL, Node 20, 运行在端口 3000
完成后报: 通政使司

[DISPATCH] -> 礼部
任务: 编写部署文档
验收标准:
  - 在 README 中添加部署章节
  - 覆盖：前置条件、构建步骤、环境变量、启动、故障排查
  - 包含 Docker 和手动部署两种路径
上下文: Docker 配置正在并行创建，基于标准模式编写文档
完成后报: 通政使司

[DISPATCH] -> 刑部
任务: 对现有代码库进行安全审计
验收标准:
  - 依赖漏洞扫描（npm audit 或等效工具）
  - OWASP Top 10 代码审查（注入、XSS、认证问题）
  - 报告含按严重等级（critical/high/medium/low）的发现
  - 无未解决的 critical 问题
上下文: Express API + JWT 认证 + PostgreSQL，处理用户数据
完成后报: 通政使司
```

_三部并行执行……_

**通政使司汇总结果：**

```text
[汇总报告]
已派发: 3 部
已完成: 3 / 阻塞: 0

工部:
  状态: 完成
  产出: Dockerfile（多阶段构建，最终镜像 85MB），docker-compose.yml
  （API + PostgreSQL + 健康检查），.dockerignore 已添加

礼部:
  状态: 完成
  产出: README 部署章节（120 行），覆盖 Docker + 手动路径，
  环境变量表，故障排查 FAQ

刑部:
  状态: 完成
  产出: 安全报告 - 0 critical, 1 high（过时的 express-session），
  2 medium（缺少速率限制、生产环境错误信息过于详细）。
  三项均已记录严重等级与修复建议。
```

**首辅统一审查：**

- 工部：docker-compose up 已测试，API 在 :3000 响应。通过。
- 礼部：文档引用的环境变量正确且与 docker-compose.yml 一致。通过。
- 刑部：报告 1 high + 2 medium。首辅指派兵部升级 express-session，high 已修复。Medium 暂可接受且已记录。通过。

```text
[REPORT]
三部均按验收标准交付。

变更:
  Dockerfile               +24 -0  (新文件)
  docker-compose.yml       +35 -0  (新文件)
  .dockerignore             +8 -0  (新文件)
  README.md               +120 -2  (部署章节)
  docs/security-audit.md   +67 -0  (新文件: 审计报告)
  package.json              +1 -1  (express-session 升级)
合计: 6 文件, +255 -3

安全: 1 high 已修复, 2 medium 已记录待后续迭代处理。
```
