import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { v4 } from 'uuid'

require('dotenv').config()

const defaultRegion = 'us-east-1'

export class Dynamite extends DynamoDB {
  _ρ = {
    table: '',
    primaryKey: 'id',
    pkGenerator: () => v4().split('-')[0]
  }
  constructor(table: string) {
    super({ region: process.env.AWS_REGION || defaultRegion })
    this._ρ.table = table
  }

  /**
   * Get an item by ID.
   */
  async Δ(id: string) {
    const params = { Key: marshall({ [this._ρ.primaryKey]: id }) }
    const { Item } = await this.getItem({ TableName: this._ρ.table, ...params })
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
   * Batch write up to 25 records.
   */
  async Ξ(records: object[]) {
    const response: object[] = []
    const params = {
      RequestItems: {
        [this._ρ.table]: records.map((r: object) => {
          const id = this._ρ.pkGenerator()
          const record = { id, ...r }
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
    await this.batchWriteItem(params)
    return response
  }

  /**
   * Delete an item by ID.
   */
  async Γ(id: string) {
    const params = { Key: marshall({ [this._ρ.primaryKey]: id }) }
    const { $metadata } = await this.deleteItem({ TableName: this._ρ.table, ...params })
    return $metadata.httpStatusCode
  }
}
