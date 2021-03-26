## Internal user authentication

In rooms where the [privacy mode](../Setup/Privacy%20modes.md) is not *open*, not all SSB users who connect to the room are [internal users](../Stakeholders/Internal%20user.md). The room thus needs a way to authenticate the user before granting them a [tunnel address](Tunnel%20addresses.md).

### Specification

When the room receives an incoming secret-handshake connection from Alice, it checks the [internal user registry](Internal%20user%20registry.md), looking for the entry corresponding to Alice's ID. If there is an entry, Alice is recognized as an internal user, granting her a [tunnel address](Tunnel%20addresses.md). Otherwise, the room recognizes Alice as an [external user](../Stakeholders/External%20user.md) and does not grant Alice a tunnel address.

In either case, whether Alice is an internal or external user, the secret-handshake and muxrpc connection is allowed to remain up, because external users are allowed to [consume aliases](../Alias/Alias%20consumption.md) and create [tunneled connections](Tunneled%20connection.md) with internal users.

### Security considerations

#### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room software could be modified by the room admin to not authenticate some users as internal users.
