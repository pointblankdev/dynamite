# Dynamite

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
<a href="https://gitmoji.dev">
<img  style="border-radius: 3px;" src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a>

<br/>

An exciting DynamoDB client 🧨

<br/>

## Why?

DynamoDB has to much boilerplate IMO. This makes it better. Your teammates will love it.

This library extends `@aws-sdk/client-dynamodb`to create a minimal client that's:

- Magical ✨
- Opinionated 🧠
- Funny 😂

Just pass JSON in and get JSON out. Payloads are converted into DynamoDB inputs using `marshall` from `@aws-sdk/util-dynamodb`. Only the results are returned from responses. It also defaults to `us-east-1` if the `AWS_REGION` environment variable isn't set. The `id` defaults to a v4 UUID if not provided.

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
// [{ id: '4c767a46', title: 'Hello World' }]

// Scan all items
dynamite.Σ()
// [{ id: '4c767a46', title: 'Hello World' }]

// Get an item by id
dynamite.Δ('4c767a46')
// { id: '4c767a46', title: 'Hello World' }

// Delete an item by id
dynamite.Δ('4c767a46')
// 200
```

<br/>

## Configuration

You can edit the config like this:

```ts
// typescript
import { Dynamite } from '@pointblankdev/dynamite'

// javascript
// const { Dynamite } = require('@pointblankdev/dynamite')

const dynamite = new Dynamite('PostsTable')

console.log(dynamite._ρ)
// _ρ = {
//   table: 'PostsTable',
//   primaryKey: 'id',
//   pkGenerator: () => v4().split('-')[0]
// }

dynamite.primaryKey = 'random_id'
dynamite.pkGenerator = () => Math.random().toString()
```

<br/>

## Roadmap

- Add support for DynamoDB queries.
- Improve client configuration types.

<br/>

### What's with the Greek letters as functions names?

Javascript allows characters from any language for defining variables. I've always found the idea of using single characters symbols for a library intriguing, and since I haven't yet seen anyone give it a try- I figured I would! Yes, you'll need to use copy/paste or intellisense to write functions- and yes it's 100% worth it.
