# Config database

The configuration database holds basic administrative data, readable only by [admins](../Stakeholders/Room%20admin.md) and (indirectly via the [dashboard](Moderator%20dashboard.md)) by [moderators](../Stakeholders/Moderator.md).

## Rough spec

The database should contain these data points:

- Which [privacy mode](../Privacy/Modes.md) is selected
- List of SSB IDs of [moderators](../Stakeholders/Moderator.md)
- List of blocked SSB IDs
