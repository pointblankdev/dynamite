import { Dynamite } from '../src/Dynamite'

/**
 * Dynamite
 */
describe('Dynamite', () => {
  const dynamite = new Dynamite('GatherGames')

  it('is instantiable', () => {
    // console.log(dynamite)
    expect(dynamite).toBeInstanceOf(Dynamite)
  })

  it('is configurable', async () => {
    dynamite._ρ.pkGenerator = () => Math.random().toString()
    expect(dynamite._ρ).toBeDefined()
  })

  it('should list tables', async () => {
    const { TableNames } = await dynamite.listTables({})
    expect(TableNames).toEqual(['GatherGames'])
  })

  it('should get an item by ID', async () => {
    const Item = await dynamite.Δ('cbf8f41d')
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

  it('should delete an item by id', async () => {
    const data = await dynamite.Γ('2deec51c-fd5c-4b91-b94b-7501d20533ee')
    // console.log(data)
    expect(data).toBeDefined()
  })
})
