## Web endpoint

Once an alias is [registered](Registration.md), it will also enable any web user to visit an endpoint in the room server dedicated to that alias, for the purpose of telling the visitor what SSB ID does the alias resolve to, and with instructions on how to install an SSB app if the visitor doesn't have it yet.

The goal of this page is primarily to improve SSB onboarding when the visitor being onboarded does not yet have an SSB ID. This web endpoint is very valuable for new SSB users being invited by an [internal user](../Stakeholders/Internal%20user.md).

**Prior art:** This endpoint should be in many ways similar to the [Telegram](https://telegram.org/) `https://t.me/example` service for the username `@example`, also capable of redirecting the web visitor to a scheme `tg` URI `tg://resolve?domain=example`, which Telegram apps know how to parse and open the target user's profile screen.

### Specification

This specification does not apply if the [privacy mode](../Setup/Privacy%20modes.md) is *Restricted*.

If the alias `alice` is registered at the room `scuttlebutt.eu` for a certain `feedId`, then the room's HTTP endpoint `https://scuttlebutt.eu/alice` will respond with a web site which:

- Displays the alias `alice`
- Displays the [resolved](Alias%20resolution.md) SSB ID `feedId` and signature `sig`
- Informs users how to install an SSB app that can correctly consume room aliases
- Renders a "Connect with me" button
  - The button links to `ssb:roomalias/scuttlebutt.eu/alice`
- The page automatically redirects to `ssb:roomalias/scuttlebutt.eu/alice`

### Security considerations

#### Malicious web visitor

A web visitor, either human or bot, could attempt brute force visiting all possible alias endpoints, in order to build a dataset of all SSB IDs and claimed aliases gathered at this room, potentially tracking profiles of these SSB IDs. Malicious web visitors can also attempt to connect with these target IDs as victims, and may use social engineering or impersonation tactics during [tunneled authentication](../Participation/Tunneled%20authentication.md).

#### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room admin could tamper with the [alias database](Alias%20database.md) and provide fake information on this web endpoint, e.g. that a certain alias was claimed by a certain users. Although the [database signature](Alias%20database.md) exists to prevent this type of tampering, it is only verified when performing muxrpc [resolution](Alias%20resolution.md). For web visitors who only want to know which SSB ID corresponds to an alias, and only that, these visitors must trust the room administrator, who could provide inauthentic information.