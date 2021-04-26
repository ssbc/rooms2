## Web Dashboard

This is a WWW interface that allows [moderators](../Stakeholders/Moderator.md) to sign-in and perform some privileged actions. The sign-in method **SHOULD** be [SSB HTTP Authentication](https://github.com/ssb-ngi-pointer/ssb-http-auth-spec) but it **MAY** be username/password or other methods. [Internal users](../Stakeholders/Internal%20user.md) can also sign-in and perform basic actions such as [create invites for other users to join](Joining.md).

### Specification

The dashboard grants [moderators](../Stakeholders/Moderator.md) with features and powers such as:

- Block SSB IDs from connecting with this room, meaning two things:
  - If they were an [internal user](../Stakeholders/Internal%20user.md), they get demoted to [external user](../Stakeholders/External%20user.md)
  - Even if they were an [external user](../Stakeholders/External%20user.md), the room server will reject new attempts of secret-handshake connections
- Unblock SSB IDs that are blocked
- Nominate other internal users to become moderators too
- View the list of aliases according to the [Alias database](../Alias/Alias%20database.md)
- Revoke aliases by removing an entry from the [Alias database](../Alias/Alias%20database.md)
- Change the [privacy mode](../Setup/Privacy%20modes.md) of the room
- View other technical measurements such as bandwidth used, storage used by the databases, etc

The dashboard grants [internal users](../Stakeholders/Internal%20user.md) basic features such as:

- Register an alias for themselves
- Revoke an alias for themselves
- Create an invite for [external users](../Stakeholders/External%20user.md) to [join the room](../Participation/Joining.md) if the room is running in [Community mode](../Setup/Privacy%20modes.md)

### Security considerations

#### HTTPS vulnerabilities

Typically SSB has not relied on the certificate architecture underlying TLS, and has had no interoperability with HTTPS. Since rooms 2.0 rely on HTTPS, then the vulnerabilities inherent in TLS, such weak certificate authorities that can enable man-in-the-middle attacks. In such scenarios, with room servers there would be possibility for man-in-the-middle attacks when claiming invites (redirecting to another multiserver address), when [resolving aliases](../Alias/Alias%20consumption.md) (impersonating the alias owner), or when performing sign-in with SSB identities.

To mitigate these types of attacks, implementations and deployments of rooms should make a conscious choice of a trustworthy certificate authority.

#### Malicious [moderator](../Stakeholders/Moderator.md)

Moderators obviously hold some power, and this power may be abused through unfair blocks, unfair revoking of aliases. In many cases, fairness is subjective, and is understood to be an essential compromise of having moderation to begin with. So in this section we will focus our attention on unusual security issues with moderation.

A moderator has the right to nominate other internal users to become moderators, and this could lead to a proliferation of moderators, which increases the possibility that one of these moderators abuses their powers. On the other hand, there has been many maintainers and npm owners in the [SSBC](https://github.com/ssbc/) (e.g. 32 GitHub org members and 17 npm owners for the cornerstone [`ssb-db`](https://www.npmjs.com/package/ssb-db) package), we also know that the presence of many moderators may also help to *decrease* the possibility of abuse, because asymmetry of privilege is reduced.