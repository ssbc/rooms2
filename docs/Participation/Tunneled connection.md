# Tunneled connection

#TODO summary here

## Rough spec

Read more at [ssb-tunnel](https://github.com/ssbc/ssb-tunnel). #TODO summarize it here.

## Detailed spec #TODO

TODO Make UML diagram, see [sequenceDiagram example](../Misc/sequenceDiagram%20example.md).

## Security considerations

### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room admin could log and track all connection sessions for every tunneled connection, thus tracking the **IP addresses**, **timestamps**, **durations**, and **bandwidth** of interactions between [internal users](../Stakeholders/Internal%20user.md). That said, because of encrypted tunneled secret-handshake channels, the room admin could not know the contents of data transmitted between the internal users.

