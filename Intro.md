<!--
SPDX-FileCopyrightText: 2021 Andre 'Staltz' Medeiros

SPDX-License-Identifier: CC-BY-4.0
-->

# SSB Rooms 2.0

**Revision:** `$REVISION`

**Author:** Andre Medeiros <contact@staltz.com>

**License:** This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

## Abstract

A room server is an SSB peer with privileged internet presence (for instance, not behind a NAT layer) which allows its clients to perform tunneled connections wich each other. For practical purposes, room clients seem to be connected to each other directly, but the room is an intermediary. Connections between server and client are end-to-end encrypted via secret-handshake, as well as in tunneled connections between room clients, so that the room server cannot eavesdrop on the payloads in the tunneled connections. This document describes new capabilities for rooms, such as user aliases, privacy modes, and tunneled authentication.

## Terminology

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

## Table of contents
