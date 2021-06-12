import { Dynamite } from '../src/Dynamite'

/**
 * Dynamite
 */
describe('Dynamite', () => {
  const dynamite = new Dynamite('GatherGames')

  it('is instantiable', () => {
    expect(dynamite).toBeInstanceOf(Dynamite)
  })

  it('should list tables', async () => {
    const { TableNames } = await dynamite.listTables({})
    expect(TableNames).toEqual(['GatherGames'])
  })

  it('should get an item by ID', async () => {
    const Item = await dynamite.Δ('123')
    // console.log(Item)
    expect(Item).toBeDefined()
  })

  it('should scan the table', async () => {
    const Items = await dynamite.Σ()
    // console.log(Items)
    expect(Items).toBeDefined()
  })

  it('should batch write to the table', async () => {
    const data = await dynamite.Ξ([{ data: { name: 'World of Warcraft ⚔️' } }])
    // console.log(data)
    expect(data).toBeDefined()
  })
})
