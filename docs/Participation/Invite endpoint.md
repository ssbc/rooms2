## Invite endpoint

When [joining](Joining.md) a *Community* room or *Restricted* room, [internal users](../Stakeholders/Internal%20user.md) create invites. The invite code is originally just random bytes encoded as hex, but can be transformed into an *invite link*, i.e. an HTTPS endpoint URL on the room server.

### Specification

1. Suppose the room is hosted at domain `roomHost` and it has generated an invite `inviteCode`
1. The invite URL **SHOULD** be `https://${roomHost}/join?invite=${inviteCode}`
1. Once a web visitor opens that link, then they **MUST** be presented with the SSB URI `ssb:?action=join-room&invite=${inviteCode}&multiserverAddress=${roomMsAddr}` where `${roomMsAddr}` consititutes the room's multiserver address in an SSB URI friendly format
    1. If the operating system detects an installed SSB app that recognizes the `ssb` scheme, the SSB app handles this URI
    1. Else, the website at displays instructions how to install an SSB app
      - For instance, there could be an app store URL (see [this technical possibility](https://stackoverflow.com/questions/28744167/android-deep-linking-use-the-same-link-for-the-app-and-the-play-store)) to install Manyverse which further redirects to this SSB URI, maybe may have to rely on a fixed URL (for Manyverse to register in its manifest) such as `join.manyver.se`. Same idea for other mobile apps, say "Imaginary App" using the fixed URL "join.imaginary.app". Desktop apps are different as they can be installed without an app store.
1. The SSB app knows how to parse the SSB URI into inputs necessary for [joining the room](Joining.md)

### Example

1. Invite link is `https://scuttlebutt.eu/join?invite=39c0ac1850ec9af14f1bb73`
1. User opens that link in a browser, which redirects to the SSB URI [ssb:?action=join-room&invite=39c0ac1850ec9af14f1bb73&multiserverAddress=net%3Ascuttlebutt.eu%3A8008~shs%3A51w4nYL0k7mRzDGw20KQqCjt35y8qLiBNtWk3MX7ppo%3D](ssb:?action=join-room&invite=39c0ac1850ec9af14f1bb73&multiserverAddress=net%3Ascuttlebutt.eu%3A8008~shs%3A51w4nYL0k7mRzDGw20KQqCjt35y8qLiBNtWk3MX7ppo%3D)
1. User's operating system opens that SSB URI in an SSB app, which then communicates with the room server via muxrpc (read more in [Joining](Joining.md))

### Security considerations

#### Malicious web visitor

A web visitor, either human or bot, could attempt brute force visiting all possible invite endpoints, in order to force themselves to become an [internal user](../Stakeholders/Internal%20user.md). However, this could easily be mitigated by rate limiting requests by the same IP address.
