## Internal user authentication

In rooms where the [privacy mode](../Setup/Privacy%20modes.md) is not *open*, not all SSB users who connect to the room are [internal users](../Stakeholders/Internal%20user.md). The room thus needs a way to authenticate the user before granting them a [tunnel address](Tunnel%20addresses.md).

### Specification

When the room receives a secret-handshake incoming connection from Alice, it checks the [internal user registry](Internal%20user%20registry.md), looking for entry in the registry corresponding to Alice's ID. If there is an entry, the room allows the incoming connection to stay alive, and grants Alice a [tunnel address](Tunnel%20addresses.md). Otherwise, the room allows the connection but does not grant Alice a tunnel address.

We need the connection to remain up even in the event of internal user authentication failing, because there are other muxrpc APIs that the room should allow external users to call, such as when consuming an invite (to become an internal user) or to perform [alias resolution](../Alias/Alias%20resolution.md).

### Security considerations

#### Malicious [external user](../Stakeholders/External%20user.md)

In the case of a room configured with [privacy modes](../Setup/Privacy%20modes.md) *Restricted*, the internal users of this room may want to be shielded from any external user gathering data about them, such as resolving aliases. The room needs to allow the external user to call muxrpc APIs, because the external user may be trying to [join](Joining.md) by consuming an invite. But in the case of a malicious external user, they may try to call other muxrpc APIs and so far this spec does not address how to protect against this possibility.

#### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room software could be modified by the room admin to not authenticate some users as internal users.