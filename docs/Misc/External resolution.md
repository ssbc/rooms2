<!--
SPDX-FileCopyrightText: 2021 Andre 'Staltz' Medeiros

SPDX-License-Identifier: CC-BY-4.0
-->

# External alias resolution

(DEPRECATED DOCUMENT BUT KEPT HERE FOR ARCHIVAL PURPOSES)

When an [external user](../Stakeholders/External%20user.md) who knows an [internal user](../Stakeholders/Internal%20user.md) with an alias wishes to [connect](../Participation/Tunneled%20connection.md) with them, they must first *resolve the full alias*.

## Rough spec

It's done with HTTPS requests following the WebFinger spec and `acct:` spec. The **input** is the [full alias](Full%20alias%20string.md) and the **output** is an [ssb-tunnel](https://github.com/ssbc/ssb-tunnel) `tunnel` address.

## Detailed spec TO-DO

TO-DO Make UML diagram, see [sequenceDiagram example](../Misc/sequenceDiagram%20example.md).

## Security considerations

### Malicious [external users](../Stakeholders/External%20user.md) and [spiders](https://en.wikipedia.org/wiki/Web_crawler)

All of [WebFinger's security considerations](https://tools.ietf.org/html/rfc7033#section-9), particularly how a malicious node can harvest resolved aliases by picking alias strings at random or brute force. For privacy considerations, both the full alias string and the resolved tunnel address should be considered effectively public information.

### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room admin receiving a WebFinger request could log and track IP addresses, session duration, and other metadata from WebFinger clients.


## See also

- [WebFinger.net](https://webfinger.net/)
- [Mastodon's WebFinger](https://docs.joinmastodon.org/spec/webfinger/)
- [RFC 7033 (WebFinger spec)](https://tools.ietf.org/html/rfc7033)
- [RFC 7565 (`acct:` URI spec)](https://tools.ietf.org/html/rfc7565)