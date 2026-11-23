# Security Policy

Pulsar uses PostgreSQL and PGMQ for messaging and data dispatch.

The project is still early. Its security model is incomplete, so do not treat it as production-ready for workloads that require strong tenant isolation, authenticated delivery, or strict access control.

## Known limitations

### Database access and RLS

Pulsar does not yet enforce Row-Level Security (RLS) or database policies consistently enough to act as a security boundary.

Some database operations may bypass intended RLS restrictions. Do not rely on the current policies for tenant, user, or transaction isolation.

We plan to strengthen RLS enforcement, database policies, and transaction isolation in upcoming releases.

### Authentication and authorization

Pulsar does not currently provide complete API-key management, authentication, or authorization for message dispatch.

In particular, dispatch operations do not reliably:

- Authenticate consumers or receiving clients.
- Validate API keys or client credentials.
- Check whether a client is authorized to access a specific dispatch operation.

Until this is implemented, assume that dispatch endpoints and consumers are not access-controlled.

### AI-assisted SQL and Lua

Much of the PostgreSQL SQL and Redis Lua code was generated with AI assistance. We estimate that around 90% of these scripts were AI-generated.

The code has been reviewed and tested in the project’s current test environment, but it has not received a thorough security audit. It may contain edge cases, inefficient queries, or security issues that have not yet been identified.

We welcome review from database and backend engineers, especially around SQL functions, Redis scripts, permissions, and transaction behavior.

## Production guidance

Avoid using Pulsar in security-sensitive or production-critical environments until the limitations above are addressed.

If you do use it, assume that:

- Database-level isolation is incomplete.
- Dispatch operations may be accessible without adequate authentication or authorization.
- SQL and Lua code still needs independent security review.

## Planned improvements

Planned work includes:

- Stronger RLS enforcement and database access policies.
- API-key management, validation, and rotation.
- Consumer and client authentication.
- Authorization checks for message dispatch.
- Broader validation and security checks across data transactions.

## Reporting vulnerabilities

Please do **not** open a public GitHub issue for a security vulnerability.

Report it privately through GitHub’s **Report a vulnerability** option on the repository’s Security tab. If that is unavailable, contact the maintainers directly to arrange a private disclosure channel.

Include:

- A clear description of the issue.
- The affected component, file, endpoint, or database function.
- Steps to reproduce it.
- The potential impact.
- A suggested fix or mitigation, if you have one.

We will update this document as security controls are added and limitations are resolved.