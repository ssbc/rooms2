## Sign-in with SSB

To access the [WWW dashboard interface](Web%20Dashboard.md), [internal users](../Stakeholders/Internal%20user.md) (including [moderators](../Stakeholders/Moderator.md)) can use "sign-in with SSB ID".

### Specification

An [internal user](../Stakeholders/Internal%20user.md) known by its SSB ID `userId` is connected to the room via secret-handshake and muxrpc. A browser client is supposedly the same person or agent as the internal user and wishes to gain access to the web dashboard. All HTTP requests SHOULD be done with HTTPS. The three sides (browser client, SSB peer, and room server) perform the following protocol, specified as the following UML sequence diagram:

```mermaid
sequenceDiagram
    participant Umux as SSB peer
    participant Uweb as Browser client
  participant R as Room server

  Umux->>Umux: Generates a challenge code `cc`
  Umux->>Uweb: `https://${roomHost}/login<br/>?userId=${userId}&challenge=${cc}`
  Uweb->>R: `https://${roomHost}/login<br/>?userId=${userId}&challenge=${cc}`
  R->>R: Solves `cc` as `sr`
  R->>R: Generates challenge `sc`

  alt SSB peer is disconnected from the room
        R-->>Uweb: HTTP 403
  else SSB peer is connected to the room
        R-->>Umux: `sr+sc`
      alt `sr` is incorrect
        Umux->>R: `sr` is incorrect
        R-->>Uweb: HTTP 403
      else `sr` is correct
        Umux->>Umux: Solve `sc` as `cr`
      Umux->>R: `cr`
      alt `cr` is incorrect
        R-->>Uweb: HTTP 403
      else `cr` is correct
        R-->>Uweb: HTTP 200, auth token
        Uweb->>Uweb: Stores auth token as a cookie
      end
       end
  end

```
