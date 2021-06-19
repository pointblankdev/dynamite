import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { v4 } from 'uuid'
import forIn from 'lodash/forIn'
import fromPairs from 'lodash/fromPairs'
import merge from 'lodash/merge'

require('dotenv').config()

const defaultTable = 'Dynamite'
const defaultRegion = 'us-east-1'
const defaultPrimaryKey = 'id'

export class Dynamite extends DynamoDB {
  _ρ = {
    table: defaultTable,
    primaryKey: defaultPrimaryKey,
    pkGenerator: () => v4().split('-')[0]
  }
  constructor(table?: string, region?: string) {
    super({ region: region || process.env.AWS_REGION || defaultRegion })
    this._ρ.table = table || process.env.DYNAMITE_TABLE || defaultTable
  }

  /**
   * Get an item by ID.
   */
  async Δ(id: string) {
    const params = {
      TableName: this._ρ.table,
      Key: marshall({ [this._ρ.primaryKey]: id })
    }
    const { Item } = await this.getItem(params)
    return unmarshall(Item as any)
  }

  /**
   * Scan all records.
   */
  async Σ() {
    const { Items } = await this.scan({ TableName: this._ρ.table })
    return Items?.map(i => unmarshall(i))
  }

  /**
   * Batch write any number of records.
   */
  async Ξ(data: object[] | object) {
    let records: object[]
    if (!Array.isArray(data) && typeof data === 'object' && data !== null) {
      records = [data]
    } else {
      records = data
    }
    // Chunk into batches of 25 requests maximum
    let requestBatches = []
    for (let i = 0; i < records.length; i += 25) {
      let chunk = records.slice(i, i + 25)
      requestBatches.push(chunk)
    }
    // Track responses for a single return collection
    const response: object[] = []
    // Loop through each batch
    for (const batch of requestBatches) {
      // Form payload
      const params = {
        RequestItems: {
          [this._ρ.table]: batch.map((r: object) => {
            const id = this._ρ.pkGenerator()
            const record = { [this._ρ.primaryKey]: id, ...r }
            response.push(record)
            const Item = marshall(record)
            return {
              PutRequest: {
                Item
              }
            }
          })
        }
      }
      // Send request
      await this.batchWriteItem(params)
    }
    return response
  }

  /**
   * Update an item by ID.
   */
  async Ω(id: string, updates: any) {
    const values: any = []
    const names: any = []
    const sets: string[] = []
    forIn(updates, (v, k) => {
      if (k === this._ρ.primaryKey) return
      values.push([`:${k}`, marshall({ [k]: v })[k]])
      names.push([`#${k}`, k])
      sets.push(`#${k} = :${k}`)
    })
    const ExpressionAttributeValues = fromPairs(values) as any
    const ExpressionAttributeNames = fromPairs(names) as any
    const UpdateExpression = `SET ${sets.join(', ')}`
    const params = {
      TableName: this._ρ.table,
      Key: marshall({ [this._ρ.primaryKey]: id }),
      UpdateExpression,
      ExpressionAttributeValues,
      ExpressionAttributeNames,
      ReturnValues: 'ALL_NEW'
    }
    const { Attributes } = await this.updateItem(params)
    const Item: any = {}
    forIn(Attributes, (v, k) => {
      merge(Item, unmarshall({ [k]: v }))
    })
    return Item
  }

  /**
   * Delete an item by ID.
   */
  async Γ(id: string) {
    const params = {
      TableName: this._ρ.table,
      Key: marshall({ [this._ρ.primaryKey]: id })
    }
    const { $metadata } = await this.deleteItem(params)
    return $metadata.httpStatusCode
  }
}
