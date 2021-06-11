import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

require('dotenv').config()

export default class Dynamite extends DynamoDB {
  params: any
  constructor(params) {
    super({ region: process.env.AWS_ENV || 'us-east-1' })
    this.params = params
  }

  /**
   * Get an item by ID.
   */
  async Δ(id) {
    const params = { Key: marshall({ id }) }
    const { Item } = await this.getItem({ ...this.params, ...params })
    return unmarshall(Item)
  }

  /**
   * Scan all records.
   */
  async Σ() {
    const { Items } = await this.scan(this.params)
    return Items.map(i => unmarshall(i))
  }

  /**
   * Batch write up to 25 records.
   */
  Ξ(data) {
    const params = {
      RequestItems: {
        [this.params.TableName]: data.map(d => ({
          PutRequest: {
            Item: marshall(d)
          }
        }))
      }
    }
    return this.batchWriteItem(params)
  }
}
