# SSB Rooms 2.0

##### Revision: `$REVISION`

##### Author: Andre Medeiros <contact@staltz.com>

##### This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

## Abstract

A room server is an SSB peer with privileged internet presence (for instance, not behind a NAT layer) which allows its clients to perform tunneled connections wich each other. For practical purposes, room clients seem to be connected to each other directly, but the room is an intermediary. Connections between server and client are end-to-end encrypted via secret-handshake, as well as in tunneled connections between room clients, so that the room server cannot eavesdrop on the payloads in the tunneled connections. This document describes new capabilities for rooms, such as user aliases, privacy modes, and tunneled authentication.

## Table of contents
