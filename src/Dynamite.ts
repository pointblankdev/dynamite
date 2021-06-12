import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { v4 as uuid } from 'uuid'

require('dotenv').config()

export class Dynamite extends DynamoDB {
  params: any
  constructor(params: any) {
    super({ region: process.env.AWS_REGION || 'us-east-1' })
    this.params = params
  }

  /**
   * Get an item by ID.
   */
  async Δ(id: string) {
    const params = { Key: marshall({ id }) }
    const { Item } = await this.getItem({ ...this.params, ...params })
    return unmarshall(Item as any)
  }

  /**
   * Scan all records.
   */
  async Σ() {
    const { Items } = await this.scan(this.params)
    return Items?.map(i => unmarshall(i))
  }

  /**
   * Batch write up to 25 records.
   */
  Ξ(records: object[]) {
    const params = {
      RequestItems: {
        [this.params.TableName]: records.map((r: object) => ({
          PutRequest: {
            Item: marshall({ id: uuid(), ...r })
          }
        }))
      }
    }
    return this.batchWriteItem(params)
  }
}
