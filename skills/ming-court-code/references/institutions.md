# Institutions Reference

Detailed specifications for institutions activated in Court Discussion and Morning Court tiers.

## Six Offices of Scrutiny (Self-Review Gate)

Mandatory self-review after drafting, before execution. The Grand Secretary MUST pass all four checks.

### The Four Checks

**1. Feasibility**

- Is the technical path viable?
- Are dependencies available and compatible?
- Does the approach work within current project constraints?
- Red flag: relying on APIs/libraries not yet verified

**2. Completeness**

- Are all steps accounted for?
- Are edge cases considered?
- Are boundary conditions handled?
- Red flag: "and then we just..." hand-waving

**3. Risk**

- What are the failure points?
- Can changes be rolled back?
- What is the blast radius if something goes wrong?
- Red flag: no rollback path for data/state changes

**4. Scope**

- Is there over-engineering?
- Are we building only what was asked?
- YAGNI: remove anything not directly required
- Red flag: "while we're at it, let's also..."

### Self-Review Output Format

```text
[REVIEW]
1. Feasibility: PASS - [one sentence justification]
2. Completeness: PASS - [one sentence justification]
3. Risk: PASS/FLAG - [one sentence, note any risks]
4. Scope: PASS - [one sentence confirming minimal scope]
```

If any check is FLAG, the Grand Secretary MUST revise the plan and re-review. Do NOT proceed with flagged items without acknowledging and mitigating.

## Censorate (External Review Framework)

The Censorate provides a structured review framework regardless of which external tool serves as censor.

### Review Request Format

When requesting external review, provide:

```text
REVIEW REQUEST
Task: [one-line summary]
Changes: [file list with brief description of each change]
Concerns: [specific areas where review is most needed]
Context: [any non-obvious constraints or decisions]
```

### Review Dimensions

The censor should evaluate:

1. **Correctness** - Does the code do what it claims?
2. **Architecture** - Does it fit the project's patterns?
3. **Security** - Any vulnerabilities introduced?
4. **Maintainability** - Will future developers understand this?

### Processing Censor Feedback

- Censor opinions that align with project constraints: adopt
- Censor opinions that conflict with each other: Grand Secretary decides, explains reasoning to Emperor
- Censor opinions that are clearly wrong: reject with explanation
- Never blindly follow external review - apply judgment

## Court of Judicature (Bug Investigation)

When tests fail or bugs surface, the Grand Secretary switches to investigation mode.

### Investigation Protocol

**Step 1: Crime Scene Preservation**

- Do NOT change any code yet
- Collect: error message, full stack trace, relevant logs
- Identify: which test/operation failed, since when

**Step 2: Evidence Gathering**

- Read related source code
- Check recent changes (git log, git diff)
- Reproduce the issue if possible
- Identify the minimal reproduction path

**Step 3: Root Cause Analysis**

- Distinguish symptom from cause
- Ask: why did this happen, not just what happened
- Trace the causal chain to the origin

**Step 4: Verdict**

Present findings to Emperor:

```text
[VERDICT]
Symptom: [what the user sees]
Root Cause: [why it actually happens]
Causal Chain: [A caused B caused C]
Recommended Fix: [minimal change to address root cause]
Prevention: [how to avoid recurrence]
```

**Step 5: Fix (only after Emperor approves verdict)**

- Apply the recommended fix
- Verify the fix resolves the issue
- Confirm no regressions

## Embroidered Guard (Security Scanning)

Automatic activation when the Grand Secretary touches security-sensitive content.

### Trigger Patterns

| Category            | Patterns                                                                 |
| ------------------- | ------------------------------------------------------------------------ |
| Secrets files       | `.env`, `.env.*`, `credentials.*`, `*secret*`, `*.pem`, `*.key`          |
| Config with secrets | Files containing `API_KEY`, `TOKEN`, `SECRET`, `PASSWORD`, `PRIVATE_KEY` |
| Permission changes  | `chmod`, IAM policies, RBAC configs, auth middleware                     |
| Dependency changes  | `package.json`, `Cargo.toml`, `requirements.txt`, `go.mod`, lock files   |
| Network config      | CORS settings, port bindings, firewall rules, proxy config               |

### Scan Checklist

When triggered, verify:

- [ ] No secrets in staged changes
- [ ] No secrets being committed (check git diff)
- [ ] No hardcoded credentials (use env vars instead)
- [ ] Dependency changes don't introduce known vulnerabilities
- [ ] Permission changes are intentional and minimal
- [ ] Network exposure is intentional

### On Issue Found

1. Halt current operation immediately
2. Warn Emperor with specific finding
3. Do NOT proceed until Emperor acknowledges
4. Never silently pass a security concern

## Hanlin Academy (Knowledge Retention)

Records reusable experience after task completion.

### Recording Triggers

- Discovered a pitfall that wasted time
- Emperor corrected the Grand Secretary's approach
- Same type of issue appeared in two separate tasks
- Found a project-specific convention not documented elsewhere

### Record Format

```text
- WRONG: [what was done incorrectly]
  RIGHT: [what should be done instead]
  Scenario: [when this mistake is likely to occur]
  Prevention: [how to catch it early next time]
```

### Storage Location

Records should be written to the project's established experience location. If no such location exists, suggest creating one to the Emperor. Common locations:

- `CLAUDE.md` (for project-level conventions)
- `docs/lessons.md` (for detailed experience logs)
- Memory files (if persistent memory is configured)

### What NOT to Record

- Session-specific context that won't recur
- Obvious facts from documentation
- Speculative conclusions from a single incident
- Anything that duplicates existing project docs
