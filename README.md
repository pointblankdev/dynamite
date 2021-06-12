# Dynamite

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
<a href="https://gitmoji.dev">
<img  style="border-radius: 3px;" src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a>

<br/>

A hyper-opinionated DynamoDB client 🧨

<br/>

## Why does this exist?

DynamoDB is great- but having to marshall/unmarshall all the inputs/outputs isn't.

This library extends `@aws-sdk/client-dynamodb`, and implements a few new APIs to create a DynamoDB client that's:

- Magical ✨
- Opinionated 🧠
- Fast 💥

Just pass JSON in and get JSON out. Payloads are converted into DynamoDB inputs using `marshall` from `@aws-sdk/util-dynamodb`. Only the results are returned from responses. It also defaults to `us-east-1` if the `AWS_REGION` environment variable isn't defined. Have fun.

<br/>

## Install

```bash
# yarn
yarn add @pointblankdev/dynamite

# npm
npm install @pointblankdev/dynamite
```

<br/>

## Usage

```ts
// typescript
import { Dynamite } from '@pointblankdev/dynamite'

// javascript
// const { Dynamite } = require('@pointblankdev/dynamite')

const dynamite = new Dynamite('PostsTable')

// Write items
dynamite.Ξ([{ title: 'Hello World' }])
// [{ id: '4c76...', title: 'Hello World' }]

// Scan all items
dynamite.Σ()
// [{ id: '4c76...', title: 'Hello World' }]

// Get an item by id
dynamite.Δ('4c767a46-c961-4923-bb0b-21564051f9b2')
// { id: '4c76...', title: 'Hello World' }
```

<br/>

## Roadmap

Add support for DynamoDB queries.

<br/>

### What's with the Greek letters as functions names?

Javascript treats characters from any language as valid for defining variables. I've never seen anyone do that, and it seemed fun. Yes, you'll need to use copy/paste or intellisense to write functions- and yes it's 100% worth it.
