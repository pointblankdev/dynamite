import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'

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
  Δ(id) {
    const params = { Key: marshall({ id }) }
    return this.getItem({ ...this.params, ...params })
  }

  /**
   * Scan all records.
   */
  Σ() {
    return this.scan(this.params)
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
