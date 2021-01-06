# Config database

The configuration database holds basic administrative data, readable only by [admins](../Stakeholders/Room%20admin.md) and (indirectly via the [dashboard](Web%20Dashboard.md)) by [moderators](../Stakeholders/Moderator.md).

## Specification

The database should contain these data points:

- Which [privacy mode](../Setup/Privacy%20modes.md) is selected
- List of SSB IDs of [moderators](../Stakeholders/Moderator.md)
- List of blocked SSB IDs
- Name of the room (a short string)
- Description for the room (not too long string)
