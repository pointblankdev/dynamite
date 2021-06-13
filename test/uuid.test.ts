import { v4 as uuid } from 'uuid'

describe('uuid', () => {
  it('is defined', () => {
    const id = uuid()
    // console.log(id)
    expect(id).toBeDefined()
  })
})
