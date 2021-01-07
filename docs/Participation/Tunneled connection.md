## Tunneled connection

A tunneled connection is an indirect connection between two peers assisted by an intermediary peer. Ideally, two peers could always connect with each other directly, but they often have unstable IP addresses behind NATs and firewalls, making it difficult to consistently and reliably establish connections. The purpose of the intermediary peer is to improve connection reliability, because these intermediary peers can be privileged nodes with public IP addresses, such as from hosting services.

### Specification

Tunneled connections in SSB originated from the proof-of-concept [ssb-tunnel](https://github.com/ssbc/ssb-tunnel) module. Suppose A and B are clients of a intermediary server M. Peer A creates a conventional [handshake](https://ssbc.github.io/scuttlebutt-protocol-guide/#handshake) connection to M, and waits to receive tunnel connections. Peer B creates a conventional secret handshake connection to M, and then requests a tunneled connection to A through that conventional connection (B-M). Then, M calls A, creating a tunneled connection where one end is attached to A and the other end is attached to B's request. Finally, B uses the secret handshake to authenticate A.

Notice that for the intermediary M, peer A is the server and B is the client (client calls, server answers) but M is just the portal. The tunneled connection is inside the outer (conventional) connections, which means it is encrypted twice with [box stream](https://ssbc.github.io/scuttlebutt-protocol-guide/#box-stream). This means A and B can mutually authenticate each other, and M cannot see the content of their connection.

Diagram:

```
,---,      ,---,     ,---,
|   |----->|   |<----|   |
| A |<=====| M |<====| B |
|   |----->|   |<----|   |
`---`      `---`     `---`
```

The arrows represent the direction of the connection – from the client, pointing to the server. Notice the M<=B connection is the same direction as the M<-B outer connection, but the A<=M connection is the opposite direction as the A->M outer connection.

### Security considerations

#### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room admin could log and track all connection sessions for every tunneled connection, thus tracking the **IP addresses**, **timestamps**, **durations**, and **bandwidth** of interactions between [internal users](../Stakeholders/Internal%20user.md). That said, because of encrypted tunneled secret-handshake channels, the room admin could not know the contents of data transmitted between the internal users.

