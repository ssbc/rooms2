# Moderator dashboard

This is a WWW interface that allows [moderators](../Stakeholders/Moderator.md) to [sign-in](Moderator%20sign-in.md) and perform some privileged actions.

## Rough spec

The dashboard grants [moderators](../Stakeholders/Moderator.md) with features and powers such as:

- Block SSB IDs from becoming [internal users](../Stakeholders/Internal%20user.md)
- Unblock SSB IDs that are blocked
- Nominate other internal users to become moderators too
- View the list of aliases according to the [Alias database](../Alias/Alias%20database.md)
- Revoke aliases by removing an entry from the [Alias database](../Alias/Alias%20database.md)
- Change the [privacy mode](../Privacy/Modes.md) of the room
- View other technical measurements such as bandwidth used, size of the [Friend request inbox](../Friend requests/Friend%20request%20inbox.md), etc

## Detailed spec #TODO 

- List and describe all actions and rights that moderators have.
- Display low-fidelity mockups of the pages in this WWW dashboard

## Security considerations

### Malicious [moderator](../Stakeholders/Moderator.md)

Moderators obviously hold some power, and this power may be abused through unfair blocks, unfair revoking of aliases. In many cases, fairness is subjective, and is understood to be an essential compromise of having moderation to begin with. So in this section we will focus our attention on unusual security issues with moderation.

A moderator has the right to nominate other internal users to become moderators, and this could lead to a proliferation of moderators, which increases the possibility that one of these moderators abuses their powers. On the other hand, there has been many maintainers and npm owners in the [SSBC](https://github.com/ssbc/) (e.g. 32 GitHub org members and 17 npm owners for the cornerstone [`ssb-db`](https://www.npmjs.com/package/ssb-db) package), we also know that the presence of many moderators may also help to *decrease* the possibility of abuse, because asymmetry of privilege is reduced.