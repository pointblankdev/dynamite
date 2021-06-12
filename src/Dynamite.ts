import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

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
  Ξ(data: any) {
    const params = {
      RequestItems: {
        [this.params.TableName]: data.map((d: any) => ({
          PutRequest: {
            Item: marshall(d)
          }
        }))
      }
    }
    return this.batchWriteItem(params)
  }
}
