# Dynamite

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
<a href="https://gitmoji.dev">
<img  style="border-radius: 3px;" src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a>

<br/>

An exciting DynamoDB client 🧨

<br/>

## Why?

DynamoDB has too much boilerplate. This makes it better. Your teammates will love it.

This library extends `@aws-sdk/client-dynamodb`to create a minimal client that's:

- Magical ✨
- Opinionated 🧠
- Funny 😂

Just pass JSON in and get JSON out. Payloads are converted into DynamoDB inputs using `marshall` from `@aws-sdk/util-dynamodb`. Only the results are returned from responses. It also defaults to `us-east-1` if the `AWS_REGION` environment variable isn't set. When writing data, a `uuid` is generated for the primary key (`id` by default) if one is not provided.

<br/>

### Requirements

- For AWS workloads, AWS IAM permissions `dynamodb:*`

- For local development, install the AWS CLI and run `aws configure`, providing your IAM access and secret keys.

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

// Update an item by id
dynamite.Ω('4c767a46', { title: 'Goodnight Moon' })
// { id: '4c767a46', title: 'Goodnight Moon' }

// list_append is used when passed an array with '+'
dynamite.Ω('4c767a46', { '+books': [{ title: 'Brave New World' }] })
dynamite.Ω('4c767a46', { '+books': [{ title: 'Hello World' }, { title: 'Goodnight Moon' }] })
// { id: '4c767a46', books: [{ title: 'Brave New World' }, { title: 'Hello World' }, { title: 'Goodnight Moon' }] }

// And reset with an empty array
dynamite.Ω('4c767a46', { books: [] })
// { id: '4c767a46', books: [] }

// Delete an item by id
dynamite.Γ('4c767a46')
// 200
```

<br/>

## Configuration

Optionally pass a table and/or region to the contructor

```ts
const dynamite = new Dynamite('PostsTable', 'us-east-1')
```

Edit the configuration object directly

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

dynamite._ρ.primaryKey = 'random_id'
dynamite._ρ.pkGenerator = () => Math.random().toString()
```

Or just let the environment variables do their thing

```bash
# .env
DYNAMITE_TABLE="Dynamite"
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="🔒"
AWS_SECRET_ACCESS_KEY="🔑"
```

<br/>

## Roadmap

- Add generic types for requests/responses.
- Add support for DynamoDB `query`.

<br/>

### What's with the Greek letters?

Javascript allows characters from any language for defining variables. I've always found the idea of using single characters symbols for a library intriguing, and since I haven't yet seen anyone give it a try- I figured I would! Yes, you'll need to use copy/paste or intellisense to write functions- and yes it's 100% worth it.

<br/>

## Recommended Settings

By default, VSCode shows a lot of junk intellisense results. Disable these by adding the following to your VSCode `settings.json` file.

```bash
"editor.suggest.showWords": false,
```
