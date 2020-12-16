# Alias database

This is a database that stores all aliases that were [registered](Registration.md) by internal users.

## Example

The following is a mock up of a key-value store:

| Key | Value |
|----|-----|
| `alice` | `@FlieaFef19uJ6jhHwv2CSkFrDLYKJd/SuIS71A5Y2as=.ed25519` plus signature |
| `bob` | `@25WfId3Vx/gyMAZqCyZzhtW4iPtUVXB/aOMYbq44P4c=.ed25519` plus signature |
| `carla` | `@dRE+jzKo0VWX6JbcSVATyOvFlbjCNwPWNzQLkTGenac=.ed25519` plus signature |
| `daniel` | `@SMMgb4bZAgRgtAPdMw4loQeZL9lQgsRDi+xin0ZDzAg=.ed25519` plus signature |

## Rough spec

This can be a simple persistent key-value store, such as Leveldb.

- Each **Key** is an [alias string](Alias%20string.md)
- Each **Value** is a string that encodes two things:
  - [SSB identities](https://ssbc.github.io/scuttlebutt-protocol-guide/#keys-and-identities) of [internal users](../Stakeholders/Internal%20user.md)
  - A cryptographic signature that covers **both** the alias string and the SSB ID

The purpose of a cryptographic signature on the combined alias & SSB ID is to make sure that the [Room admin](../Stakeholders/Room%20admin.md) cannot tamper with the database to delegitimize its contents. This means that each key-value pair is certainly authored by the declared SSB ID, that is, neither the key (the alias) nor the value (the SSB ID) was modified by the Room admin.

## Detailed spec #TODO

Detail how the signature should happen, with a derived key perhaps?

TODO Make UML diagram, see [sequenceDiagram example](../Misc/sequenceDiagram%20example.md).

## Security considerations

### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room admin can freely read or write to this database, they can create new entries, and so forth. If they modify an entry and thus break the validation of the signatures, other SSB users can detect this when verifying the signatures.

Thus the admin **cannot**:

- Register a signed alias on behalf of an [internal user](../Stakeholders/Internal%20user.md)
- Effectively modify a registered alias made by [internal users](../Stakeholders/Internal%20user.md)

But the admin **can**:

- Remove any registered key-value pairs from the database, essentially removing an alias
- Register signed aliases for fake users it has created itself
