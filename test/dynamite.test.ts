import Dynamite from '../src/dynamite'

/**
 * Dynamite
 */
describe('Dynamite', () => {
  const dynamite = new Dynamite({ TableName: 'GatherGames' })

  it('is instantiable', () => {
    expect(dynamite).toBeInstanceOf(Dynamite)
  })

  it('should list tables', async () => {
    const { TableNames } = await dynamite.listTables({})
    expect(TableNames).toEqual(['GatherGames'])
  })

  it('should get an item by ID', async () => {
    const { Item } = await dynamite.Δ('123')
    expect(Item).toBeDefined()
  })

  it('should scan the table', async () => {
    const { Items } = await dynamite.Σ()
    expect(Items).toBeDefined()
  })

  it('should batch write to the table', async () => {
    const data = await dynamite.Ξ([{ id: '001', data: { name: 'World of Warcraft' } }])
    expect(data).toBeDefined()
  })
})
