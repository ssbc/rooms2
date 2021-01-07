# SSB Rooms 2.0

A redesign of [room servers](https://github.com/staltz/ssb-room) with [user aliases](docs/Alias/Readme.md) and [better privacy](docs/Setup/Privacy%20modes.md). A room server is an SSB peer with privileged internet presence (not behind NATs) that allows its clients to perform [tunneled connections](docs/Participation/Tunneled%20connection.md) with [tunnel addresses](docs/Participation/Tunnel%20addresses.md).


## Table of contents

*   [Stakeholders](#stakeholders)
    *   [Room admin](#room-admin)
    *   [Internal user](#internal-user)
    *   [External user](#external-user)
    *   [Moderator](#moderator)
*   [Setup](#setup)
    *   [Components](#components)
    *   [Privacy modes](#privacy-modes)
    *   [Config database](#config-database)
    *   [Web Dashboard](#web-dashboard)
    *   [Sign-in with SSB](#sign-in-with-ssb)
*   [Participation](#participation)
    *   [Joining](#joining)
    *   [Internal user registry](#internal-user-registry)
    *   [Internal user authentication](#internal-user-authentication)
    *   [Invite endpoint](#invite-endpoint)
    *   [Tunnel addresses](#tunnel-addresses)
    *   [Tunneled connection](#tunneled-connection)
    *   [Tunneled authentication](#tunneled-authentication)
*   [Alias](#alias)
    *   [Full alias string](#full-alias-string)
    *   [Alias string](#alias-string)
    *   [Alias registration](#alias-registration)
    *   [Alias revocation](#alias-revocation)
    *   [Host resolution](#host-resolution)
    *   [Alias resolution](#alias-resolution)
    *   [Web endpoint](#web-endpoint)
    *   [Alias database](#alias-database)


## Stakeholders

Persons or organizations that are involved or engaged in or around room servers. They may hold responsibilities or powers, and may cause harm to other stakeholders when their responsibilities or powers are abused. They hold interest in engaging with other stakeholders while managing the risk for harm associated with engagement. Harm mitigation such as [Privacy modes](../Setup/Privacy%20modes.md) is important when discussing stakeholders.


### Room admin

Person or organization responsible for operating the room server, and has full access rights over the server's resources such as logs, disk, memory, etc. In other words, this person or organization physically owns the room server or has SSH access to the remote server hosted in some PaaS cloud provider.

Typically, the admin possesses an SSB ID (it's very common, but not necessarily always the case), and is also a [moderator](Moderator.md) in the room.


### Internal user

SSB user who accesses the room server and is considered *internal* because they have already [joined](Joining.md) the room and may even have registered an [alias](../Alias/Readme.md) in the room.

#### Specification

**Definition:** an *internal user* of a room is any SSB ID for which the room grants a [tunnel address](../Participation/Tunnel%20addresses.md). In other words, if an SSB ID is *reachable* via a [tunneled connection](../Participation/Tunneled%20connection.md) through a room server, then they are considered an internal user of that room.

**Becoming an internal user:** read more about that in [Joining a room](../Participation/Joining.md).


### External user

Any SSB user who is not an [internal user](Internal%20user.md) of the room (i.e. do not have a usable [tunnel address](../Participation/Tunnel%20addresses.md) referencing the room), but may still interact with the room server in meaningful ways, for instance with [tunneled connections](../Participation/Tunneled%20connection.md), [host resolution](../Alias/Host%20resolution.md) or [alias resolution](../Alias/Alias%20resolution.md).


### Moderator

A moderator is an [internal user](Internal%20user.md) that has acquired special privileges in the [web dashboard](../Setup/Web%20Dashboard.md) and actions allowed by the dashboard.

Moderators can use [Moderator sign-in](../Setup/Sign-in%20with%20SSB.md) to access the [dashboard](../Setup/Web%20Dashboard.md).


## Setup

There are different ways a room server can be configured.


### Components

A room server is defined by several components, which are systems that enable features, some of these are optional and some are required.

#### Required

*   [Tunneled connection](../Participation/Tunneled%20connection.md)
*   [Tunnel addresses](../Participation/Tunnel%20addresses.md)
*   [Privacy modes](../Setup/Privacy%20modes.md) (at least the *Open* mode)
*   [Joining](../Participation/Joining.md) (for at least the *Open* mode)

#### Optional

*   Other [Privacy modes](../Setup/Privacy%20modes.md) and respective ways of [joining](../Participation/Joining.md)
*   [Internal user authentication](../Participation/Internal%20user%20authentication.md)
*   [Tunneled authentication](../Participation/Tunneled%20authentication.md)
*   [Invite endpoint](../Participation/Invite%20endpoint.md)
*   [Web Dashboard](Web%20Dashboard.md) and [Sign-in with SSB](Sign-in%20with%20SSB.md)
*   [Aliases](../Alias/Readme.md) (requires "Web Dashboard" and "Sign-in with SSB")


### Privacy modes

A room server should allow the [room admin](../Stakeholders/Room%20admin.md) or a [moderator](../Stakeholders/Moderator.md) to configure which users can become [internal user](../Stakeholders/Internal%20user.md).

#### Specification

There are three strategies recommended as policies to [join](../Participation/Joining.md) the room, known as privacy modes:

*   **Open**: invite codes are openly known, similar to [ssb-room v1](https://github.com/staltz/ssb-room)
*   **Community**: any [internal user](../Stakeholders/Internal%20user.md) can invite any [external user](../Stakeholders/External%20user.md) to become an internal user
*   **Restricted**: any [moderator](../Stakeholders/Moderator.md) can invite any [external user](../Stakeholders/External%20user.md) to become an internal user

**Joining:** To become a member of the room, peers need to [join the room](../Participation/Joining.md).


### Config database

The configuration database holds basic administrative data, readable only by [admins](../Stakeholders/Room%20admin.md) and (indirectly via the [dashboard](Web%20Dashboard.md)) by [moderators](../Stakeholders/Moderator.md).

#### Specification

The database should contain these data points:

*   Which [privacy mode](../Setup/Privacy%20modes.md) is selected
*   List of SSB IDs of [moderators](../Stakeholders/Moderator.md)
*   List of blocked SSB IDs
*   Name of the room (a short string)
*   Description for the room (not too long string)


### Web Dashboard

This is a WWW interface that allows [moderators](../Stakeholders/Moderator.md) to [sign-in](Sign-in%20with%20SSB.md) and perform some privileged actions. [Internal users](../Stakeholders/Internal%20user.md) can also sign-in and perform basic actions such as [create invites for other users to join](Joining.md).

#### Specification

The dashboard grants [moderators](../Stakeholders/Moderator.md) with features and powers such as:

*   Block SSB IDs from becoming connecting with this room, meaning two things:
    *   If they were an [internal user](../Stakeholders/Internal%20user.md), they get demoted to [external user](../Stakeholders/External%20user.md)
    *   Even if they were an [external user](../Stakeholders/External%20user.md), the room server will reject new attempts of secret-handshake connections, meaning that blocked users cannot even perform [alias resolution](../Alias/Alias%20resolution.md) anymore
*   Unblock SSB IDs that are blocked
*   Nominate other internal users to become moderators too
*   View the list of aliases according to the [Alias database](../Alias/Alias%20database.md)
*   Revoke aliases by removing an entry from the [Alias database](../Alias/Alias%20database.md)
*   Change the [privacy mode](../Setup/Privacy%20modes.md) of the room
*   View other technical measurements such as bandwidth used, storage used by the databases, etc

The dashboard grants [internal users](../Stakeholders/Internal%20user.md) basic features such as:

*   Register an alias for themselves
*   Revoke an alias for themselves
*   Create an invite for [external users](../Stakeholders/External%20user.md) to [join the room](../Participation/Joining.md) if the room is running in [Community mode](../Setup/Privacy%20modes.md)

#### Security considerations

##### Malicious [moderator](../Stakeholders/Moderator.md)

Moderators obviously hold some power, and this power may be abused through unfair blocks, unfair revoking of aliases. In many cases, fairness is subjective, and is understood to be an essential compromise of having moderation to begin with. So in this section we will focus our attention on unusual security issues with moderation.

A moderator has the right to nominate other internal users to become moderators, and this could lead to a proliferation of moderators, which increases the possibility that one of these moderators abuses their powers. On the other hand, there has been many maintainers and npm owners in the [SSBC](https://github.com/ssbc/) (e.g. 32 GitHub org members and 17 npm owners for the cornerstone [`ssb-db`](https://www.npmjs.com/package/ssb-db) package), we also know that the presence of many moderators may also help to *decrease* the possibility of abuse, because asymmetry of privilege is reduced.


### Sign-in with SSB

To access the [WWW dashboard interface](Web%20Dashboard.md), [internal users](../Stakeholders/Internal%20user.md) (including [moderators](../Stakeholders/Moderator.md)) can use "sign-in with SSB ID".

#### Specification

| Client (internal user) | Server (room) |
|----------------------|---------------|
| Is connected to the room via secret-handshake and muxrpc | Recognizes the client as an [internal user](../Stakeholders/Internal%20user.md) |
| Presses a button in the SSB app "Open web dashboard" | |
| Generates a challenge code `cc` | |
| SSB app redirects to login endpoint at the room and passes the challenge as a a request param, `/login?feedid=${sbot.id}&challenge=${cc}` | |
| | Receives challenge `cc`, solves it as `sr`. Generates a challenge `sc` and sends `sr+sc` to the client `feedid` via muxrpc |
| Receives solution `sr`, if it's incorrect, don't do anything (and let the login HTTP request fail with a timeout). Else, solve `sc` as `cr`, and send it to the room via muxrpc. | |
| | Receives solution `cr`, if it's incorrect, respond the login HTTP request with a failure. Else, redirect to the logged-in view of the dashboard `/manage` |

*   HTTPS please #TODO
*   How is the challenge exactly generated? #TODO
*   Shouldn't the `/login` endpoint always be a POST method? #TODO
*   Something about tokens and cookies to keep the client signed in #TODO


## Participation

Before peers can connect to each other via a room server, they first need to become members, i.e. [internal users](../Stakeholders/Internal%20user.md). This section describes the different protocols used for establishing internal user participation.


### Joining

"Joining a room" means the process where an [external user](../Stakeholders/External%20user.md) becomes an [internal user](../Stakeholders/Internal%20user.md).

#### Specification

The joining process is different for each [Privacy mode](../Setup/Privacy%20modes.md):

*   **Open:**
    1.  An [external user](../Stakeholders/External%20user.md), Alice, acquires the open *invite code* either through the room's public website or via other means
    2.  Alice consumes the invite code in her SSB app that supports being a room client
    3.  The room accepts the connection from Alice and immediately grants her a [tunnel address](Tunnel%20addresses.md)
    4.  Alice has become an [internal user](../Stakeholders/Internal%20user.md)
*   **Community:**
    1.  An [internal user](../Stakeholders/Internal%20user.md), Bob, [signs into](../Setup/Sign-in%20with%20SSB.md) the room's [web dashboard](../Setup/Web%20Dashboard.md) where he creates a one-time invite code in the form of an [invite endpoint](Invite%20endpoint.md), provided on the dashboard provides.
    2.  Bob informs an [external user](../Stakeholders/External%20user.md), Alice, of the invite code
    3.  Alice consumes the invite code in their SSB app that supports being a room client
    4.  The room checks whether the invite code is valid and has not yet been consumed
        1.  If it is invalid or has been consumed, reply to Alice with an error
        2.  Else, proceed (below)
    5.  The room accepts the connection from Alice and immediately grants her a [tunnel address](Tunnel%20addresses.md)
    6.  Alice has become an [internal user](../Stakeholders/Internal%20user.md)
    7.  The room stores Alice's SSB ID in the [Internal user registry](Internal%20user%20registry.md)
*   **Restricted:**
    1.  A [moderator](../Stakeholders/Moderator.md), Carla, [signs into](../Setup/Sign-in%20with%20SSB.md) the room's [web dashboard](../Setup/Web%20Dashboard.md) where she creates a one-time invite code in the form of an [invite endpoint](Invite%20endpoint.md), provided on the dashboard.
    2.  Bob informs an [external user](../Stakeholders/External%20user.md), Alice, of the invite code
    3.  Alice consumes the invite code in their SSB app that supports being a room client
    4.  The room checks whether the invite code is valid and has not yet been consumed
        1.  If it is invalid or has been consumed, reply to Alice with an error
        2.  Else, proceed (below)
    5.  The room accepts the connection from Alice and immediately grants her a [tunnel address](Tunnel%20addresses.md)
    6.  Alice has become an [internal user](../Stakeholders/Internal%20user.md)
    7.  The room stores Alice's SSB ID in the [Internal user registry](Internal%20user%20registry.md)


### Internal user registry

The *internal user registry* is a database the room manages, keeping records of which SSB users are [internal users](../Stakeholders/Internal%20user.md). It is a simple list or table, where each entry refers to an internal user, and must contain at least the SSB ID for that user.


### Internal user authentication

In rooms where the [privacy mode](../Setup/Privacy%20modes.md) is not *open*, not all SSB users who connect to the room are [internal users](../Stakeholders/Internal%20user.md). The room thus needs a way to authenticate the user before granting them a [tunnel address](Tunnel%20addresses.md).

#### Specification

When the room receives a secret-handshake incoming connection from Alice, it checks the [internal user registry](Internal%20user%20registry.md), looking for entry in the registry corresponding to Alice's ID. If there is an entry, the room allows the incoming connection to stay alive, and grants Alice a [tunnel address](Tunnel%20addresses.md). Otherwise, the room allows the connection but does not grant Alice a tunnel address.

We need the connection to remain up even in the event of internal user authentication failing, because there are other muxrpc APIs that the room should allow external users to call, such as when consuming an invite (to become an internal user) or to perform [alias resolution](../Alias/Alias%20resolution.md).

#### Security considerations

##### Malicious [external user](../Stakeholders/External%20user.md)

In the case of a room configured with [privacy modes](../Setup/Privacy%20modes.md) *Restricted*, the internal users of this room may want to be shielded from any external user gathering data about them, such as resolving aliases. The room needs to allow the external user to call muxrpc APIs, because the external user may be trying to [join](Joining.md) by consuming an invite. But in the case of a malicious external user, they may try to call other muxrpc APIs and so far this spec does not address how to protect against this possibility.

##### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room software could be modified by the room admin to not authenticate some users as internal users.


### Invite endpoint

When [joining](Joining.md) a *Community* room or *Restricted* room, [internal users](../Stakeholders/Internal%20user.md) create invites. The invite code is originally just random bytes encoded as hex, but can be transformed into an *invite link*, i.e. an HTTPS endpoint URL on the room server.

#### Example

1.  Invite link is `https://scuttlebutt.eu/join?invite=39c0ac1850ec9af14f1bb73`
2.  User opens that link in a browser, which redirects to `ssb://joinroom/net:scuttlebutt.eu:8008~shs:51w4nYL0k7mRzDGw20KQqCjt35y8qLiBNtWk3MX7ppo=/39c0ac1850ec9af14f1bb73`
3.  User's operating system opens that SSB URI in an SSB app, which then communicates with the room server via muxrpc, read more in [Joining](Joining.md)

#### Specification

1.  Suppose the room is hosted at domain `roomHost` and it has generated an invite `inviteCode`
2.  The invite link is `https://${roomHost}/join?invite=${inviteCode}`
3.  Once a web visitor opens that link, then they are presented with the SSB URI `ssb://room-invite/${multiserverAddress}/${inviteCode}` (debatable URI path #TODO)
    1.  If the operating system detects an installed SSB app that recognizes the `ssb://` scheme, the SSB app handles this URI
    2.  Else, the website at displays instructions how to install an SSB app
        *   For instance, there could be an app store URL (see [this technical possibility](https://stackoverflow.com/questions/28744167/android-deep-linking-use-the-same-link-for-the-app-and-the-play-store)) to install Manyverse which further redirects to this SSB URI, maybe may have to rely on a fixed URL (for Manyverse to register in its manifest) such as `join.manyver.se`. Same idea for other mobile apps, say "Imaginary App" using the fixed URL "join.imaginary.app". Desktop apps are different as they can be installed without an app store (or not?).
4.  The SSB app knows how to transform the SSB URI into muxrpc methods, and then proceeds to perform the [joining protocol](Joining.md)

#### Security considerations

##### Malicious web visitor

A web visitor, either human or bot, could attempt brute force visiting all possible invite endpoints, in order to force themselves to become an [internal user](../Stakeholders/Internal%20user.md). However, this could easily be mitigated by rate limiting requests by the same IP address.


### Tunnel addresses

To establish a [tunneled connection](Tunneled%20connection.md), the peer initiating it must know the *tunnel address* of the peer at the other side of the tunnel.

#### Specification

A tunnel address is a string conforming to the [multiserver-address](https://github.com/ssbc/multiserver-address) grammar. We say that "room M *grants* peer A a tunnel address" when room M allows other peers to request and establish [tunneled connections](Tunneled%20connection.md) with peer A, using the tunnel address to identify peer A.

It consists of three parts and `:` as separators in between:

*   `tunnel` as a constant tag
*   SSB ID of the intermediary peer
*   SSB ID of the target peer

#### Example

Without spaces nor newlines:

    tunnel:@7MG1hyfz8SsxlIgansud4LKM57IHIw2Okw
    /hvOdeJWw=.ed25519:@1b9KP8znF7A4i8wnSevBSK
    2ZabI/Re4bYF/Vh3hXasQ=.ed25519

The tunnel address, being a multiserver address, can also contain a *transform* section, such as the common `shs` transform (without spaces nor newlines):

    tunnel:@7MG1hyfz8SsxlIgansud4LKM57IHIw2Okw
    /hvOdeJWw=.ed25519:@1b9KP8znF7A4i8wnSevBSK
    2ZabI/Re4bYF/Vh3hXasQ=.ed25519~shs:7MG1hyf
    z8SsxlIgansud4LKM57IHIw2Okw/hvOdeJWw=


### Tunneled connection

A tunneled connection is an indirect connection between two peers assisted by an intermediary peer. Ideally, two peers could always connect with each other directly, but they often have unstable IP addresses behind NATs and firewalls, making it difficult to consistently and reliably establish connections. The purpose of the intermediary peer is to improve connection reliability, because these intermediary peers can be privileged nodes with public IP addresses, such as from hosting services.

#### Specification

Tunneled connections in SSB originated from the proof-of-concept [ssb-tunnel](https://github.com/ssbc/ssb-tunnel) module. Suppose A and B are clients of a intermediary server M. Peer A creates a conventional [handshake](https://ssbc.github.io/scuttlebutt-protocol-guide/#handshake) connection to M, and waits to receive tunnel connections. Peer B creates a conventional secret handshake connection to M, and then requests a tunneled connection to A through that conventional connection (B-M). Then, M calls A, creating a tunneled connection where one end is attached to A and the other end is attached to B's request. Finally, B uses the secret handshake to authenticate A.

Notice that for the intermediary M, peer A is the server and B is the client (client calls, server answers) but M is just the portal. The tunneled connection is inside the outer (conventional) connections, which means it is encrypted twice with [box stream](https://ssbc.github.io/scuttlebutt-protocol-guide/#box-stream). This means A and B can mutually authenticate each other, and M cannot see the content of their connection.

Diagram:

    ,---,      ,---,     ,---,
    |   |----->|   |<----|   |
    | A |<=====| M |<====| B |
    |   |----->|   |<----|   |
    `---`      `---`     `---`

The arrows represent the direction of the connection – from the client, pointing to the server. Notice the M<=B connection is the same direction as the M<-B outer connection, but the A<=M connection is the opposite direction as the A->M outer connection.

#### Security considerations

##### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room admin could log and track all connection sessions for every tunneled connection, thus tracking the **IP addresses**, **timestamps**, **durations**, and **bandwidth** of interactions between [internal users](../Stakeholders/Internal%20user.md). That said, because of encrypted tunneled secret-handshake channels, the room admin could not know the contents of data transmitted between the internal users.


### Tunneled authentication

Tunneled authentication is about making sure that SSB peers on the opposite end of a [tunneled connection](Tunneled%20connection.md) only allow the connection to occur if they follow the peer on the other side. Thus we need a way for peers to know who wants to open a tunneled connection and we should facilitate mutual follows to occur so that peers only create tunneled connections imbued with mutual interest.

#### Specification

Tunneled friend authentication is an algorithm or protocol that applies automatically without any user input from either end of the secret-handshake channel. This protocol should not apply for the intermediary peer, that is, the room server.

When Alice receives a tunneled secret-handshake incoming connection from Bob, she automatically allows it if Alice checks that she follows Bob, or automatically cancels the connection if Alice checks that she does not follow Bob (or blocks Bob). Same is true reciprocically: Bob applies this rule for incoming connections from Alice.

Thus tunneled authentication **requires mutual follows** ("friendship") before establishing a functioning [tunneled connection](Tunneled%20connection.md).

When a denial of connection occurs, the peer that received the connection should be able to see (and thus locally log): (1) SSB ID of the intermediary peer (room) used, (2) SSB ID of the origin peer behind the intermediary, (3) (MAYBE) the address ([tunnel address](Tunnel%20addresses.md) or [full alias string](../Alias/Full%20alias%20string.md)) of the origin peer.

The user that received the denied connection can then see this fact in their SSB app, and then they can make a conscious choice to either (1) follow the origin peer, or (2) connect to the origin peer (if (3) from the previous paragraph existed), or both.

#### Implementation notes

Note that in current room server implementation in JavaScript, [`opts.origin`](https://github.com/staltz/ssb-room/blob/e78d54887682664def36d48ca9e648fc609478e9/tunnel/server.js#L100) in the room is calculated from secret-handshake, so it can be trusted to be authentic.

For the next version of rooms, if we want `opts.origin` to also contain the origin peer's address (ssb-tunnel address or full alias string), then we need other means of verifying that the origin address is authentic. E.g. if it's a full alias string, maybe the receiving peer performs [host resolution](../Alias/Host%20resolution.md) and [alias resolution](../Alias/Alias%20resolution.md), or maybe the receiving peer takes the ssb-tunnel address and verifies that the ID matches with the secret-handshake-given ID.


## Alias

An alias (also known as "room alias") is a string that identifies an [internal user](../Stakeholders/Internal%20user.md), designed to be short and human-friendly, similar to [email addresses](https://en.wikipedia.org/wiki/Email_address) and [Mastodon WebFinger addresses](https://docs.joinmastodon.org/spec/webfinger/).

As an example, suppose Alice is an internal user of the room "Scuttlebutt EU". The room's domain is `scuttlebutt.eu` and Alice's [alias](Alias%20string.md) is `alice`. Alice's [full alias](Full%20alias%20string.md) is thus `@alice@scuttlebutt.eu`, and her [web endpoint](Web%20endpoint.md) is `https://scuttlebutt.eu/alice`.

In short,

*   [Internal users](../Stakeholders/Internal%20user.md) can [register](Registration.md) aliases, [revoke](Revocation.md) them, as well as perform [alias resolution](Alias%20resolution.md)
*   [Internal users](../Stakeholders/Internal%20user.md) who know a target user's [alias](Alias%20string.md) can [resolve it](Alias%20resolution.md) in order to [connect](../Participation/Tunneled%20connection.md) with the target internal user
*   [External users](../Stakeholders/External%20user.md) who know a target user's [full alias](Full%20alias%20string.md) can [resolve the host](Host%20resolution.md) and [resolve the user alias](Alias%20resolution.md) in order to [connect](../Participation/Tunneled%20connection.md) with the target internal user
*   Other users who don't yet have an SSB ID can use the [Web endpoint](Web%20endpoint.md) of an alias to read more information on how to acquire an SSB ID and connect with the target internal user
*   [Room admin](../Stakeholders/Room%20admin.md) has read/write access to the [alias database](Alias%20database.md)
*   [Moderators](../Stakeholders/Moderator.md) can remove an alias entry from the [alias database](Alias%20database.md)


### Full alias string

An [internal user](../Stakeholders/Internal%20user.md)'s globally relevant alias, also known as "full alias string", is used to uniquely identify that internal user globally, on the internet. This string is useful everywhere, for [external users](../Stakeholders/External%20user.md), [room admins](../Stakeholders/Room%20admin.md), and [internal users](../Stakeholders/Internal%20user.md). See also [alias string](Alias%20string.md).

#### Example

Suppose Alice is an internal user of the room "Scuttlebutt EU". The room's domain is `scuttlebutt.eu`. Alice's alias could be one of these strings (non-exhaustive list):

*   `@alice@scuttlebutt.eu`
*   `@alice1994@scuttlebutt.eu`
*   `@aLiCee@scuttlebutt.eu`

#### Specification

Composed of the following substrings, in this order

1.  `@`
2.  userpart, e.g. `alice`
3.  `@`
4.  room's domain, e.g. `scuttlebutt.eu`

#### Related work

This should be the same as [RFC 7565 Section 7](https://tools.ietf.org/html/rfc7565#section-7). See also [Mastodon's WebFinger](https://docs.joinmastodon.org/spec/webfinger/).


### Alias string

An [internal user](../Stakeholders/Internal%20user.md)'s alias, also known as "alias string", is used to uniquely (unique within the room server only) identify that internal user. This string is useful only within the current room, i.e. relevant only for the [room's admin](../Stakeholders/Room%20admin.md) other [internal users](../Stakeholders/Internal%20user.md) or [external user](../Stakeholders/External%20user.md) that can connect to the room, although external users may have first used the [full alias strings](Full%20alias%20string.md) to connect with the room in the first place.

#### Example

Suppose Alice is an internal user of the room "Scuttlebutt EU". Alice's alias could be one of these strings (non-exhaustive list):

*   `alice`
*   `alice1994`
*   `aLiCee`

#### Specification

Alphanumerics, uppercase and lowercase. Perhaps `-` and `.` could be allowed. This should be the same as `userpart` in [RFC 7565 Section 7](https://tools.ietf.org/html/rfc7565#section-7).


### Alias registration

An [internal user](../Stakeholders/Internal%20user.md) who does not have an alias in the current room server can choose to register an alias. Not all internal users need to have aliases, so the process described here is optional.

#### Specification

1.  An internal user with SSB ID `feedId` and a room server with SSB ID `roomId` are connected to each other via secret-handshake
2.  The internal user [signs into](Sign-in%20with%20SSB.md) the room's [web dashboard](Web%20Dashboard.md)
3.  The internal user uses the dashboard's "Register Alias" feature, inputting the string `alias` as candidate [alias string](Alias%20string.md)
4.  The room checks whether that `alias` is valid (see spec in [Alias string](Alias%20string.md))
    1.  If it is invalid, respond with an error on the web dashboard
    2.  Else, proceed (below)
5.  The room checks whether there already exists an entry in the [Alias database](Alias%20database.md) associated with this `feedId`
    1.  If there is, respond with an error on the web dashboard
    2.  Else, proceed (below)
6.  The room checks whether there already exists an entry in the [Alias database](Alias%20database.md) with the *key* `alias`
    1.  If there is, respond with an error on the web dashboard
    2.  Else, proceed (below)
7.  The room receives the internal user's `alias` via HTTPS, and calls a specific [muxrpc](https://github.com/ssb-js/muxrpc/) API `confirmAlias(alias)` at the internal user
8.  The internal user receives the muxrpc message, and prompts the user interface to confirm this choice
    1.  If it is denied, reply to the room with an error
        1.  The room then responds with an error on the web dashboard
    2.  Else, proceed (below)
9.  The internal user replies to the room's muxrpc call with two strings:
    *   `=alias-registration:${roomId}:${feedId}:${alias}`, read more about it in the [alias database](Alias%20database.md) spec
    *   A cryptographic signature of the string above using `feedId`'s cryptographic keypair, referred to as `sig`, read more about it in the [alias database](Alias%20database.md) spec
10. The room adds an entry to its [Alias database](Alias%20database.md) for `key=alias` & `value=feedId+sig`
11. The room replies back to the client on the web dashboard with "success"
12. (Optional) The room replies back to the internal user via muxrpc to inform successful alias registration (more details #TODO)
13. (Optional) The internal user publishes an SSB msg of type `about` with a field listing all its aliases for various rooms, where this specific `alias` is included (more details #TODO)

#### Security considerations

##### Malicious [internal user](../Stakeholders/Internal%20user.md)

The reason why there can be only one alias for SSB ID is to prevent a malicious internal user from exhausting many or all possible aliases in case the room accidentally allows such malicious user to become an internal user. Arguably, some room implementations could choose to relax this choice, perhaps to allow different aliases for an internal user, that covers typographic mistakes such as `aliec`, `alicce`. For the time being, it seems sensible that each internal user can receive only one alias.

#### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room admin could reply with errors when technically the muxrpc should have succeeded, e.g. pretending that the `alias` candidate is invalid or pretending that it's already registered.


### Alias revocation

When an [internal user](../Stakeholders/Internal%20user.md) who has [registered](Registration.md) no longer wishes to have that alias associated with them anymore, they can perform *alias revocation* to remove that alias from the [alias database](Alias%20database.md).

#### Specification

1.  An internal user with SSB ID `feedId` and a room server with SSB ID `roomId` are connected to each other via secret-handshake. We assume the internal user has [registered](Registration.md) `alias` in the past
2.  The internal user [signs into](../Setup/Sign-in%20with%20SSB.md) the room's [web dashboard](../Setup/Web%20Dashboard.md)
3.  The internal user uses the dashboard's "Revoke Alias" feature
4.  The room checks whether there exists an entry in the [Alias database](Alias%20database.md) associated with `feedId`
    1.  If there is no entry, respond with an error on the web dashboard
    2.  Else, proceed (below)
5.  The room removes the entry in the [Alias database](Alias%20database.md) associated with `feedId`
6.  The room replies back to the client on the web dashboard with "success"
7.  (Optional) The room replies back to the internal user via muxrpc to inform successful alias revocation (how? #TODO)
8.  (Optional) The internal user publishes an SSB msg of type `about` with a field listing all its aliases for various rooms, where this specific `alias` is no longer listed (how? #TODO)

#### Security considerations

##### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room admin could refuse to remove the database entry, or could delete the database entry at will (before the internal user performs revocation). In other words, the internal user does not ultimately have power over the deletion of the alias entry from the alias database, it must trust the room admin regarding deletion.


### Host resolution

When an [external user](../Stakeholders/External%20user.md) who knows an [internal user](../Stakeholders/Internal%20user.md)'s [full alias](Full%20alias%20string.md) wishes to [connect](../Participation/Tunneled%20connection.md) with them, they must first *resolve the host* contained in the full alias. The external user's goal is to get a [multiserver address](https://github.com/ssb-js/multiserver) they can use to create a connection with the room, and then perform [alias resolution](Alias%20resolution.md) to create a [tunneled connection](../Participation/Tunneled%20connection.md) with the internal user.

#### Example

Suppose we want to resolve the full alias `@alice@scuttlebutt.eu`. The input for host resolution is `scuttlebutt.eu`, which we then create a `.well-known` request:

    GET /.well-known/ssb-room.json HTTP/1.1
    Host: scuttlebutt.eu

And it should respond with the JSON

    {"multiserverAddress":"net:scuttlebutt.eu:8008~shs:51w4nYL0k7mRzDGw20KQqCjt35y8qLiBNtWk3MX7ppo="}

#### Specification

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

#### Security considerations

##### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room admin receiving `.well-known` requests could log and track IP addresses, session duration, and other metadata from HTTPS clients.

Another possibility is that the room could have been modified by the room admin or by a MITM attacker (e.g. in the TLS connection) to spoof the response, providing another multiserver address, or spoofing only the SHS portion of the multiserver address.

That said, SSB peers often remember previously used multiserver addresses, so peers who use the original `multiserverAddress` prior to the spoof attack will be unable to establish a valid [tunneled connection](Tunneled%20connection.md) to peers who use the spoofed `multiserverAddress`, because the outer connections wrapping the tunneled connection will refer to different SHS keys.


### Alias resolution

When an SSB user ([external](../Stakeholders/External%20user.md) or [internal](../Stakeholders/Internal%20user.md)) is connected to the room, and knows of another [internal user's](../Stakeholders/Internal%20user.md) [alias](Alias%20string.md), they can perform *resolution* via muxrpc. After resolution is completed successfully, they obtain the target user's SSB ID and can use it to start a [tunneled connection](../Participation/Tunneled%20connection.md).

#### Specification

If the input is a [full alias string](Full%20alias%20string.md), then first perform [host resolution](Host%20resolution.md) on the room server. Once the room's `multiserverAddress` is known, the SSB user creates a muxrpc connection with the room, and picks the `alias` part of the full alias string to perform the following algorithm:

1.  An SSB user acting as a client calls a specific [muxrpc](https://github.com/ssb-js/muxrpc/) API `resolveAlias(alias)` on the room server
    *   `alias` is a supposed to be a string, a candidate [alias string](Alias%20string.md)
2.  The room checks whether that `alias` is valid (see spec in [Alias string](Alias%20string.md))
    1.  If it is invalid, reply with an error
    2.  Else, proceed (below)
3.  The room checks whether there already exists an entry in the [Alias database](Alias%20database.md) with the *key* `alias`
    1.  If there is none, reply with an error
    2.  Else, proceed (below)
4.  The room replies back to the client the **value** associated with the requested **key** `alias` in the [Alias database](Alias%20database.md)
5.  The client now in possession of the **value** will deconstruct the `feedId` and the `sig`
6.  The client verifies that the signature `sig` authentically matches `feedId` and `alias`
7.  The client can now use `feedId` to initiate a [tunneled connection](../Participation/Tunneled%20connection.md) with `feedId`

#### Security considerations

##### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room admin could track which SSB users are interested in connecting with internal users, i.e. they can gather **social interest metadata**, which could be used to create a draft of a social graph.


### Web endpoint

Once an alias is [registered](Registration.md), it will also enable any web user to visit an endpoint in the room server dedicated to that alias, for the purpose of telling the visitor what SSB ID does the alias resolve to, and with instructions on how to install an SSB app if the visitor doesn't have it yet.

The goal of this page is primarily to improve SSB onboarding when the visitor being onboarded does not yet have an SSB ID. This web endpoint is very valuable for new SSB users being invited by an [internal user](../Stakeholders/Internal%20user.md).

**Prior art:** This endpoint should be in many ways similar to the [Telegram](https://telegram.org/) `https://t.me/example` service for the username `@example`, also capable of redirecting the web visitor to a scheme `tg` URI `tg://resolve?domain=example`, which Telegram apps know how to parse and open the target user's profile screen.

#### Specification

If the alias `alice` is registered at the room `scuttlebutt.eu` for a certain `feedId`, then the room's HTTP endpoint `https://scuttlebutt.eu/alice` will respond with a web site which:

*   Displays the alias `alice`
*   Displays the [resolved](Alias%20resolution.md) SSB ID `feedId` and signature `sig`
*   Informs users how to install an SSB app that can correctly consume room aliases
*   Renders a "Connect with me" button
    *   The button links to `ssb://roomalias/scuttlebutt.eu/alice` (debatable format! #TODO)
*   The page automatically redirects to `ssb://roomalias/scuttlebutt.eu/alice`

#### Open questions

*   Is this endpoint disabled when the room's [privacy mode](../Setup/Privacy%20modes.md) is *Community* or *Restricted*? #TODO

#### Security considerations

##### Malicious web visitor

A web visitor, either human or bot, could attempt brute force visiting all possible alias endpoints, in order to build a dataset of all SSB IDs and claimed aliases gathered at this room, potentially tracking profiles of these SSB IDs. Malicious web visitors can also attempt to connect with these target IDs as victims, and may use social engineering or impersonation tactics during [tunneled authentication](../Participation/Tunneled%20authentication.md).

##### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room admin could tamper with the [alias database](Alias%20database.md) and provide fake information on this web endpoint, e.g. that a certain alias was claimed by a certain users. Although the [database signature](Alias%20database.md) exists to prevent this type of tampering, it is only verified when performing muxrpc [resolution](Alias%20resolution.md). For web visitors who only want to know which SSB ID corresponds to an alias, and only that, these visitors must trust the room administrator, who could provide inauthentic information.


### Alias database

This is a database that stores all aliases that were [registered](Registration.md) by internal users.

#### Example

The following is a mock up of a key-value store:

| Key | Value |
|----|-----|
| `alice` | `@FlieaFef19uJ6jhHwv2CSkFrDLYKJd/SuIS71A5Y2as=.ed25519` plus signature |
| `bob` | `@25WfId3Vx/gyMAZqCyZzhtW4iPtUVXB/aOMYbq44P4c=.ed25519` plus signature |
| `carla` | `@dRE+jzKo0VWX6JbcSVATyOvFlbjCNwPWNzQLkTGenac=.ed25519` plus signature |
| `daniel` | `@SMMgb4bZAgRgtAPdMw4loQeZL9lQgsRDi+xin0ZDzAg=.ed25519` plus signature |

#### Specification

This can be a simple persistent key-value store, such as Leveldb.

*   Each **Key** is an [alias string](Alias%20string.md)
*   Each **Value** is a string that encodes two things:
    *   [SSB identity](https://ssbc.github.io/scuttlebutt-protocol-guide/#keys-and-identities) of the [internal user](../Stakeholders/Internal%20user.md)
    *   A cryptographic signature that covers **all these**
        *   the room server's ID, i.e. `roomid`
        *   the SSB ID, i.e. `userid`
        *   alias string, i.e. `useralias`

The signature is applied on the following string: `=alias-registration:${roomid}:${userid}:${useralias}`, known as the *Alias confirmation*, see example (without spaces nor newlines):

    =alias-registration:@51w4nYL0k7mRzDGw20KQqCjt35
    y8qLiBNtWk3MX7ppo=.ed25519:@FlieaFef19uJ6jhHwv2
    CSkFrDLYKJd/SuIS71A5Y2as=.ed25519:alice

where

*   `roomid` is `@51w4nYL0k7mRzDGw20KQqCjt35y8qLiBNtWk3MX7ppo=.ed25519`
*   `userid` is `@FlieaFef19uJ6jhHwv2CSkFrDLYKJd/SuIS71A5Y2as=.ed25519`
*   `useralias` is `alice`

The purpose of a cryptographic signature on the combined `roomid` & `userid` & `useralias` is to make sure that the [Room admin](../Stakeholders/Room%20admin.md) cannot tamper with the database to delegitimize its contents. This means that each key-value pair is certainly authored by the declared SSB ID, that is, neither the key (the alias) nor the value (the SSB ID) was modified by the Room admin.

#### Security considerations

##### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room admin can freely read or write to this database, they can create new entries, and so forth. If they modify an entry and thus break the validation of the signatures, other SSB users can detect this when verifying the signatures.

Thus the admin **cannot** effectively:

*   Register a signed alias on behalf of an [internal user](../Stakeholders/Internal%20user.md)
*   Modify a registered alias made by [internal users](../Stakeholders/Internal%20user.md)

But the admin **can**:

*   Remove any registered key-value pairs from the database, essentially removing an alias
*   Register signed aliases for fake users it has created itself

##### Malicious [moderator](../Stakeholders/Moderator.md)

Similar considerations as with the room admin, but less powers. The malicious moderator *cannot* do the actions that the room admin cannot do (otherwise moderators would have more power than admins), but the one thing moderators can do is:

*   Remove any registered key-value pairs from the database, essentially removing an alias
