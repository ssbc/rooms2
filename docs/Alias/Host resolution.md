# Host resolution

When an [external user](../Stakeholders/External%20user.md) who knows an [internal user](../Stakeholders/Internal%20user.md)'s [full alias](Full%20alias%20string.md) wishes to [connect](../Participation/Tunneled%20connection.md) with them, they must first *resolve the host* contained in the full alias. The external user's goal is to get a [multiserver address](https://github.com/ssb-js/multiserver) they can use to create a connection with the room, and then perform [alias resolution](Alias%20resolution.md) to create a [tunneled connection](../Participation/Tunneled%20connection.md) with the internal user.

## Example

Suppose we want to resolve the full alias `@alice@scuttlebutt.eu`. The input for host resolution is `scuttlebutt.eu`, which we then create a `.well-known` request:

```
GET /.well-known/ssb-room.json HTTP/1.1
Host: scuttlebutt.eu
```

And it should respond with the JSON

```
{"multiserverAddress":"net:scuttlebutt.eu:8008~shs:51w4nYL0k7mRzDGw20KQqCjt35y8qLiBNtWk3MX7ppo="}
```

## Rough spec

The room should be serving **HTTPS** connections, and one of its HTTPS resources must be `/.well-known/ssb-room.json`. That resource should provide a JSON response with the following JSON schema:

```json
{
	"$schema": "http://json-schema.org/draft-07/schema#", 
	"$id": "https://github.com/ssb-ngi-pointer/rooms2", 
	"type": "object",
	"properties": {
		"multiserverAddress": {
			"title": "Multiserver Address", 
			"description": "Should conform to https://github.com/ssbc/multiserver-address"
			"type": "string"
		}
	},
	"required": [
		"multiserverAddress"
	]
}
```

The client (external user) picks the `multiserverAddress` property of the responded JSON and uses that as the address to create a muxrpc connection with the room. 

## Detailed spec #TODO

TODO Make UML diagram, see [sequenceDiagram example](../Misc/sequenceDiagram%20example.md).

## Security considerations

### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room admin receiving `.well-known` requests could log and track IP addresses, session duration, and other metadata from HTTPS clients.

Another possibility is that the room could have been modified by the room admin or by a MITM attacker (e.g. in the TLS connection) to spoof the response, providing another multiserver address, or spoofing only the SHS portion of the multiserver address.

That said, SSB peers often remember previously used multiserver addresses, so peers who use the original `multiserverAddress` prior to the spoof attack will be unable to establish a valid [tunneled connection](Tunneled%20connection.md) to peers who use the spoofed `multiserverAddress`, because the outer connections wrapping the tunneled connection will refer to different SHS keys.