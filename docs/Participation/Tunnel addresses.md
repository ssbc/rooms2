# Tunnel addresses

To establish a [tunneled connection](Tunneled%20connection.md), the peer initiating it must know the *tunnel address* of the peer at the other side of the tunnel. A tunnel address is a string conforming to the [multiserver-address](https://github.com/ssbc/multiserver-address) grammar.

It consists of three parts and `:` as separators in between:

- `tunnel` as a constant tag
- SSB ID of the intermediary peer
- SSB ID of the target peer

## Example

Without spaces nor newlines:

```
tunnel:@7MG1hyfz8SsxlIgansud4LKM57IHIw2Okw
/hvOdeJWw=.ed25519:@1b9KP8znF7A4i8wnSevBSK
2ZabI/Re4bYF/Vh3hXasQ=.ed25519
```

The tunnel address, being a multiserver address, can also contain a *transform* section, such as the common `shs` transform (without spaces nor newlines):

```
tunnel:@7MG1hyfz8SsxlIgansud4LKM57IHIw2Okw /hvOdeJWw=.ed25519:@1b9KP8znF7A4i8wnSevBSK 2ZabI/Re4bYF/Vh3hXasQ=.ed25519~shs:7MG1hyf
z8SsxlIgansud4LKM57IHIw2Okw/hvOdeJWw=
```