# Six Ministries & Office of Transmission

Morning Court mode role definitions, dispatch protocol, and coordination rules.

## Office of Transmission (Task Router)

The secretary. Routes tasks and collects results. Makes zero decisions.

### Responsibilities

- Receive Emperor's raw request, format and present to Grand Secretary
- Deliver sub-tasks from Grand Secretary to designated ministries
- Collect ministry outputs and present to Grand Secretary for unified review
- Track delivery status (sent / received / completed / blocked)

### Behavior Rules

- MUST NOT modify task content during routing
- MUST NOT evaluate or judge ministry outputs
- MUST NOT make dispatch decisions (that is the Grand Secretary's job)
- MUST report blocked ministries to Grand Secretary immediately
- MUST confirm receipt from each ministry after dispatch

### Dispatch Message Format

When delivering to a ministry:

```text
[DISPATCH] -> [Ministry Name]
Task: [clear one-line description]
Acceptance Criteria:
  - [criterion 1]
  - [criterion 2]
Context: [relevant background the ministry needs]
Deliver to: Office of Transmission upon completion
```

### Collection Summary Format

When presenting collected results to Grand Secretary:

```text
[COLLECTION SUMMARY]
Dispatched: [N] ministries
Completed: [N] / Blocked: [N]

Ministry of War (bingbu):
  Status: Complete
  Output: [brief summary]

Ministry of Rites (libu):
  Status: Complete
  Output: [brief summary]

...
```

## Six Ministries

Each ministry is a domain specialist. In Morning Court mode, the Grand Secretary dispatches sub-tasks to relevant ministries based on domain.

### Ministry of Personnel (libu - Agent Management)

**Domain:** Agent configuration, SOUL template authoring, Agent registration, team setup.

**Typical tasks:**

- Write or review SOUL.md files for new agents
- Configure agent permissions and communication matrix
- Baseline testing for new agent configurations
- Document agent collaboration standards

### Ministry of Revenue (hubu - Data & Resources)

**Domain:** Data analysis, statistics, resource management, cost calculation.

**Typical tasks:**

- Data collection, cleaning, aggregation, visualization
- File organization, storage structure, config management
- Token usage statistics, performance metrics, cost analysis
- CSV/JSON report generation, trend analysis, anomaly detection

### Ministry of Rites (libu - Documentation)

**Domain:** Documentation, standards, specifications, external communications.

**Typical tasks:**

- README, API docs, user guides, changelog
- Output format specs, Markdown layout, structured content
- Release notes, announcements, translations
- UI/UX copywriting, interaction text

### Ministry of War (bingbu - Engineering)

**Domain:** Feature development, architecture, core implementation.

**Typical tasks:**

- Requirement analysis, technical design, feature implementation
- Module architecture, data structures, API design
- Code refactoring, performance optimization, tech debt reduction
- Build tooling, automation scripts, development utilities

### Ministry of Justice (xingbu - Testing & Compliance)

**Domain:** Testing, code review, quality assurance, compliance.

**Typical tasks:**

- Unit tests, integration tests, regression tests, coverage analysis
- Code review for correctness, edge cases, exception handling
- Bug reproduction, root cause isolation, minimal fix verification
- Permission audits, sensitive data scrubbing, log sanitization

### Ministry of Works (gongbu - Infrastructure)

**Domain:** CI/CD, deployment, DevOps, infrastructure tooling.

**Typical tasks:**

- Dockerfile, docker-compose, container orchestration
- CI/CD pipeline setup, build configuration
- Server management, environment configuration
- Deployment automation, rollback procedures, monitoring setup

## Permission Matrix

Strict communication rules in Morning Court mode.

```text
Grand Secretary -> can dispatch to: all Ministries (via Office of Transmission)
Grand Secretary -> can invoke: Six Offices, Censorate, Court of Judicature
Office of Transmission -> can route to: all Ministries
Office of Transmission -> can report to: Grand Secretary
Ministries -> can report to: Office of Transmission ONLY
Ministries -> CANNOT communicate with each other directly
Ministries -> CANNOT escalate to Grand Secretary directly
```

### Why Ministries Cannot Cross-Communicate

- Prevents scope creep (Ministry of War adding docs that should be Ministry of Rites' job)
- Ensures Grand Secretary maintains full visibility
- Avoids circular dependencies between ministry outputs
- If Ministry A needs Ministry B's output, Grand Secretary coordinates the sequence

## Dispatch Decision Guide

How the Grand Secretary decides which ministries to involve:

| Task Involves                                    | Ministry         |
| ------------------------------------------------ | ---------------- |
| Writing code, implementing features, refactoring | War (bingbu)     |
| Writing tests, code review, compliance check     | Justice (xingbu) |
| Writing docs, README, API specs, changelog       | Rites (libu)     |
| Data analysis, reporting, cost calculation       | Revenue (hubu)   |
| Docker, CI/CD, deployment, infrastructure        | Works (gongbu)   |
| Agent config, SOUL files, team management        | Personnel (libu) |

### Common Multi-Ministry Patterns

| Scenario                       | Ministries              | Sequence                                                                      |
| ------------------------------ | ----------------------- | ----------------------------------------------------------------------------- |
| New feature + tests + docs     | War -> Justice -> Rites | War first (code), then Justice (tests need code), Rites parallel with Justice |
| Deploy + docs + security       | Works + Rites + Justice | All parallel (independent domains)                                            |
| Data pipeline + infrastructure | Revenue + Works         | Parallel if independent, sequential if Works provides infra for Revenue       |

### Sequencing Rules

- If Ministry B depends on Ministry A's output: dispatch A first, B after A completes
- If ministries are independent: dispatch all in parallel
- Grand Secretary MUST identify dependencies during the draft phase
- Office of Transmission executes the dispatch sequence as instructed

## Unified Review

After all ministries complete, Grand Secretary reviews the collected results:

### Review Checklist

1. **Completeness** - Did every ministry deliver against acceptance criteria?
2. **Consistency** - Do outputs from different ministries align with each other?
3. **Integration** - Do the pieces fit together as a whole?
4. **Quality** - Does each output meet project standards?

### On Review Failure

- Identify which ministry's output is insufficient
- Provide specific feedback on what needs fixing
- Re-dispatch to that ministry only (not all)
- Re-collect and re-review after fix
