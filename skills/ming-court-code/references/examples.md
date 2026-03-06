# Examples

Full walkthrough for each tier, showing stage markers and expected behavior.

## Oral Edict Example

> Emperor: "Rename the `getUserData` function to `fetchUserProfile` across the codebase."

**Grand Secretary:**

```text
[DRAFT]
Plan: grep for all occurrences of getUserData, rename to fetchUserProfile,
update imports and call sites. Straightforward find-and-replace with
verification that no references are missed.
```

_Executes: searches codebase, renames function, updates all references._

```text
[REPORT]
Changes:
  src/api/user.ts        +1 -1  (function declaration)
  src/hooks/useUser.ts   +1 -1  (import + call site)
  src/pages/Profile.tsx   +1 -1  (call site)
  tests/user.test.ts     +2 -2  (test references)
Total: 4 files, +5 -5
```

**What did NOT happen:** No plan file, no self-review, no experience recording. Quick in, quick out.

---

## Court Discussion Example

> Emperor: "Add JWT authentication to the Express API. Support login, token refresh, and protected route middleware."

**Grand Secretary:**

```text
[DRAFT]
Plan written to plan file.

Steps:
1. Install jsonwebtoken and bcrypt dependencies
2. Create auth middleware for token verification
3. Add POST /auth/login endpoint with credential validation
4. Add POST /auth/refresh endpoint for token renewal
5. Apply middleware to protected routes
6. Add tests for all auth flows

Acceptance Criteria:
- Login returns access + refresh tokens
- Expired access token returns 401
- Valid refresh token issues new access token
- Protected routes reject unauthenticated requests
- All tests pass
```

```text
[REVIEW]
1. Feasibility: PASS - jsonwebtoken is mature, Express middleware pattern is standard
2. Completeness: PASS - covers login, refresh, middleware, tests
3. Risk: PASS - JWT is stateless, rollback is removing middleware + routes
4. Scope: PASS - no session store, no OAuth, no role-based access (not requested)
```

_Executes step by step, checking off todos..._

_Step 1: installs dependencies..._

**Embroidered Guard activates** (dependency change detected):

> Scanned package.json changes. jsonwebtoken@9.0.0 and bcrypt@5.1.0
> added. No known vulnerabilities in current versions. CLEAR.

_Steps 2-5: implements auth system..._

_Step 6: writes and runs tests..._

_One test fails: refresh token test expects 200 but gets 401._

**Court of Judicature activates** (test failure):

```text
[VERDICT]
Symptom: POST /auth/refresh returns 401 instead of 200
Root Cause: Refresh token verification uses ACCESS_SECRET instead of
REFRESH_SECRET. Both tokens are valid JWT but signed with different secrets.
Causal Chain: Copy-pasted verify() call from access token middleware without
changing the secret parameter.
Recommended Fix: Change jwt.verify(token, ACCESS_SECRET) to
jwt.verify(token, REFRESH_SECRET) in refreshToken handler (line 47).
Prevention: Extract secret selection into a helper that takes token type
as parameter.
```

_Emperor approves verdict. Grand Secretary applies fix. All tests pass._

```text
[REPORT]
Acceptance Criteria:
- [x] Login returns access + refresh tokens
- [x] Expired access token returns 401
- [x] Valid refresh token issues new access token
- [x] Protected routes reject unauthenticated requests
- [x] All tests pass (8/8)

Changes:
  package.json              +2 -0  (new dependencies)
  src/middleware/auth.ts     +45 -0 (new file: JWT middleware)
  src/routes/auth.ts         +62 -0 (new file: login + refresh)
  src/routes/index.ts        +3 -1  (apply middleware)
  tests/auth.test.ts         +89 -0 (new file: 8 test cases)
Total: 5 files, +201 -1
```

**Hanlin Academy records:**

```text
- WRONG: Copy-paste jwt.verify() calls with hardcoded secret per call site
  RIGHT: Extract token verification into helper that accepts token type
  Scenario: Any code that handles multiple JWT token types
  Prevention: When implementing multi-token JWT, always parameterize the secret
```

---

## Morning Court Example

> Emperor: "Set up Docker deployment for the API, write deployment documentation, and run a security audit on the codebase."

**Grand Secretary:**

```text
[DRAFT]
This task requires three distinct professional domains in parallel.
Recommending Morning Court mode.

Dispatch Plan:
- Ministry of Works (gongbu): Dockerfile + docker-compose + CI pipeline
- Ministry of Rites (libu): Deployment documentation (README section + standalone guide)
- Ministry of Justice (xingbu): Security audit (dependency scan + code review + OWASP check)

Dependencies: None between ministries. All can run in parallel.
Works provides Docker config, Rites documents deployment, Justice audits existing code.

Acceptance Criteria:
- Works: docker-compose up starts the API successfully
- Rites: Docs cover build, run, env vars, troubleshooting
- Justice: Security report with severity ratings, no critical issues unresolved
```

```text
[REVIEW]
1. Feasibility: PASS - three independent domains, standard tooling
2. Completeness: PASS - covers infrastructure, documentation, security
3. Risk: PASS - all parallel, no cross-dependency, each can fail independently
4. Scope: PASS - no Kubernetes, no monitoring setup, no load testing (not requested)
```

**Office of Transmission dispatches:**

```text
[DISPATCH] -> Ministry of Works
Task: Create Docker deployment configuration
Acceptance Criteria:
  - Dockerfile with multi-stage build
  - docker-compose.yml with API + database services
  - .dockerignore for clean builds
  - docker-compose up starts API and responds to health check
Context: Express API with PostgreSQL, Node 20, runs on port 3000
Deliver to: Office of Transmission upon completion

[DISPATCH] -> Ministry of Rites
Task: Write deployment documentation
Acceptance Criteria:
  - Add Deployment section to README
  - Cover: prerequisites, build steps, environment variables, startup, troubleshooting
  - Include both Docker and manual deployment paths
Context: Docker setup being created in parallel, document based on standard patterns
Deliver to: Office of Transmission upon completion

[DISPATCH] -> Ministry of Justice
Task: Security audit of existing codebase
Acceptance Criteria:
  - Dependency vulnerability scan (npm audit or equivalent)
  - Code review for OWASP Top 10 (injection, XSS, auth issues)
  - Report with findings rated by severity (critical/high/medium/low)
  - No critical issues left unresolved
Context: Express API with JWT auth, PostgreSQL, handles user data
Deliver to: Office of Transmission upon completion
```

_Three ministries execute in parallel..._

**Office of Transmission collects results:**

```text
[COLLECTION SUMMARY]
Dispatched: 3 ministries
Completed: 3 / Blocked: 0

Ministry of Works (gongbu):
  Status: Complete
  Output: Dockerfile (multi-stage, 85MB final image), docker-compose.yml
  (API + PostgreSQL + health check), .dockerignore added

Ministry of Rites (libu):
  Status: Complete
  Output: README Deployment section (120 lines), covers Docker + manual
  paths, env var table, troubleshooting FAQ

Ministry of Justice (xingbu):
  Status: Complete
  Output: Security report - 0 critical, 1 high (outdated express-session),
  2 medium (missing rate limiting, verbose error messages in production).
  High issue fixed (dependency updated). Medium issues documented with
  recommended fixes.
```

**Grand Secretary unified review:**

- Works: docker-compose up tested, API responds on :3000. PASS.
- Rites: Docs reference correct env vars and match docker-compose.yml. PASS.
- Justice: High issue resolved. Medium issues acceptable for now with documentation. PASS.

```text
[REPORT]
All three ministries delivered against acceptance criteria.

Changes:
  Dockerfile               +24 -0  (new file)
  docker-compose.yml       +35 -0  (new file)
  .dockerignore             +8 -0  (new file)
  README.md               +120 -2  (deployment section)
  docs/security-audit.md   +67 -0  (new file: audit report)
  package.json              +1 -1  (express-session upgrade)
Total: 6 files, +255 -3

Security: 1 high resolved, 2 medium documented for future sprint.
```
