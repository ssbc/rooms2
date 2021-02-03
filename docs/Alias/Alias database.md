## Alias database

This is a database that stores all aliases that were [registered](Registration.md) by internal users.

### Example

The following is a mock up of a key-value store:

| Key | Value |
|----|-----|
| `alice` | `@FlieaFef19uJ6jhHwv2CSkFrDLYKJd/SuIS71A5Y2as=.ed25519` plus signature |
| `bob` | `@25WfId3Vx/gyMAZqCyZzhtW4iPtUVXB/aOMYbq44P4c=.ed25519` plus signature |
| `carla` | `@dRE+jzKo0VWX6JbcSVATyOvFlbjCNwPWNzQLkTGenac=.ed25519` plus signature |
| `daniel` | `@SMMgb4bZAgRgtAPdMw4loQeZL9lQgsRDi+xin0ZDzAg=.ed25519` plus signature |

### Specification

This can be a simple persistent key-value store, such as Leveldb.

- Each **Key** is an [alias string](Alias%20string.md)
- Each **Value** is a string that encodes two things:
  - [SSB identity](https://ssbc.github.io/scuttlebutt-protocol-guide/#keys-and-identities) of the [internal user](../Stakeholders/Internal%20user.md)
  - A cryptographic signature that covers **all these**
    - the room server's ID, i.e. `roomId`
    - the SSB ID, i.e. `userId`
    - alias string, i.e. `alias`

The signature is applied on the following string: `=room-alias-registration:${roomId}:${userId}:${alias}`, known as the *Alias confirmation*, see example (without spaces nor newlines):

```
=room-alias-registration:@51w4nYL0k7mRzDGw20KQqCjt35
y8qLiBNtWk3MX7ppo=.ed25519:@FlieaFef19uJ6jhHwv2
CSkFrDLYKJd/SuIS71A5Y2as=.ed25519:alice
```

where

- `roomId` is `@51w4nYL0k7mRzDGw20KQqCjt35y8qLiBNtWk3MX7ppo=.ed25519`
- `userId` is `@FlieaFef19uJ6jhHwv2CSkFrDLYKJd/SuIS71A5Y2as=.ed25519`
- `alias` is `alice`

The purpose of a cryptographic signature on the combined `roomId` & `userId` & `alias` is to make sure that the [Room admin](../Stakeholders/Room%20admin.md) cannot tamper with the database to delegitimize its contents. This means that each key-value pair is certainly authored by the declared SSB ID, that is, neither the key (the alias) nor the value (the SSB ID) was modified by the Room admin.

### Security considerations

#### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room admin can freely read or write to this database, they can create new entries, and so forth. If they modify an entry and thus break the validation of the signatures, other SSB users can detect this when verifying the signatures.

Thus the admin **cannot** effectively:

- Register a signed alias on behalf of an [internal user](../Stakeholders/Internal%20user.md)
- Modify a registered alias made by [internal users](../Stakeholders/Internal%20user.md)

But the admin **can**:

- Remove any registered key-value pairs from the database, essentially removing an alias
- Register signed aliases for fake users it has created itself

#### Malicious [moderator](../Stakeholders/Moderator.md)

Similar considerations as with the room admin, but less powers. The malicious moderator *cannot* do the actions that the room admin cannot do (otherwise moderators would have more power than admins), but the one thing moderators can do is:

- Remove any registered key-value pairs from the database, essentially removing an alias