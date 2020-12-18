# Invite endpoint

When [joining](Joining.md) a *Community* room or *Restricted* room, [internal users](../Stakeholders/Internal%20user.md) create invites. The invite code is originally just random bytes encoded as hex, but can be transformed into an *invite link*, i.e. an HTTPS endpoint URL on the room server.

## Example

1. Invite link is `https://scuttlebutt.eu/join?invite=39c0ac1850ec9af14f1bb73`
1. User opens that link in a browser, which redirects to `ssb://joinroom/net:scuttlebutt.eu:8008~shs:51w4nYL0k7mRzDGw20KQqCjt35y8qLiBNtWk3MX7ppo=/39c0ac1850ec9af14f1bb73`
1. User's operating system opens that SSB URI in an SSB app, which then communicates with the room server via muxrpc, read more in [Joining](Joining.md)

## Rough spec

1. Suppose the room is hosted at domain `roomHost` and it has generated an invite `inviteCode`
1. The invite link is `https://${roomHost}/join?invite=${inviteCode}`
1. Once a web visitor opens that link, then they are presented with the SSB URI `ssb://joinroom/${multiserverAddress}/${inviteCode}`
    1. If the operating system detects an installed SSB app that recognizes the `ssb://` scheme, the SSB app handles this URI
	1. Else, the website at displays instructions how to install an SSB app
	    - Should there be an app store URL which further redirects to this SSB URI? #TODO
1. The SSB app knows how to transform the SSB URI into muxrpc methods, and then proceeds to perform the [joining protocol](Joining.md)

## Detailed spec #TODO

TODO Make UML diagram, see [sequenceDiagram example](../Misc/sequenceDiagram%20example.md).

## Security considerations

### Malicious web visitor

A web visitor, either human or bot, could attempt brute force visiting all possible invite endpoints, in order to force themselves to become an [internal user](../Stakeholders/Internal%20user.md). However, this could easily be mitigated by rate limiting requests by the same IP address.
