import { Dynamite } from '../src/Dynamite'
const testData = require('../mocks/data.json')

/**
 * Dynamite
 */
describe('Dynamite', () => {
  const dynamite = new Dynamite('GatherGames')
  let Items: any

  it('is instantiable', () => {
    // console.log(dynamite)
    expect(dynamite).toBeInstanceOf(Dynamite)
  })

  it('is configurable', async () => {
    dynamite._ρ.pkGenerator = () => Math.random().toString()
    // console.log(dynamite._ρ)
    expect(dynamite._ρ).toBeDefined()
  })

  it('should list tables', async () => {
    const { TableNames } = await dynamite.listTables({})
    // console.log(TableNames)
    expect(TableNames).toEqual(['GatherGames'])
  })

  it('should scan the table', async () => {
    Items = await dynamite.Σ()
    // console.log(Items)
    expect(Items).toBeDefined()
  })

  it('should get an item by ID', async () => {
    const Item = await dynamite.Δ(Items[0].id)
    // console.log(Item)
    expect(Item).toBeDefined()
  })

  it('should update an item by ID', async () => {
    const Item = await dynamite.Ω(Items[0].id, {
      data: { name: 'Warcraft 3: The Frozen Throne' }
    })
    // console.log(Item)
    expect(Item).toBeDefined()
  })

  it('should ignore primary key updates', async () => {
    const Item = await dynamite.Ω(Items[0].id, {
      id: '123',
      data: { name: 'Warcraft 3: The Frozen Throne' }
    })
    // console.log(Item)
    expect(Item).toBeDefined()
  })

  it('should batch write to the table', async () => {
    const data: any = await dynamite.Ξ(testData)
    // console.log(data)
    expect(data).toBeDefined()
    expect(data.length).toBeDefined()
    expect(data[0]).toBeDefined()
    expect(data[0].id).toBeDefined()
  })

  it('should write a single record', async () => {
    const data: any = await dynamite.Ξ(testData[0])
    // console.log(data)
    expect(data).toBeDefined()
    expect(data.length).toBeDefined()
    expect(data[0]).toBeDefined()
    expect(data[0].id).toBeDefined()
  })

  it('should delete an item by id', async () => {
    const data = await dynamite.Γ('2deec51c-fd5c-4b91-b94b-7501d20533ee')
    // console.log(data)
    expect(data).toBeDefined()
  })

  describe('List Management', () => {
    it('should scan the table', async () => {
      Items = await dynamite.Σ()
      // console.log(Items)
      expect(Items).toBeDefined()
    })

    it('should reset the list', async () => {
      const Item = await dynamite.Ω(Items[0].id, {
        company: 'Blizzard Entertainment',
        games: []
      })
      // console.log(Item)
      expect(Item.games.length).toBe(0)
    })

    it('should push an item onto an empty list', async () => {
      const Item = await dynamite.Ω(Items[0].id, {
        games: [{ name: 'Warcraft' }]
      })
      // console.log(Item)
      expect(Item).toBeDefined()
      const UpdatedItem = await dynamite.Δ(Items[0].id)
      // console.log(UpdatedItem)
      expect(UpdatedItem.games.length).toBe(1)
    })

    it('should push multiple items onto a populated list', async () => {
      const Item = await dynamite.Ω(Items[0].id, {
        games: [{ name: 'Warcraft 2' }, { name: 'Warcraft 3: The Frozen Throne' }]
      })
      // console.log(Item)
      expect(Item).toBeDefined()
      const UpdatedItem = await dynamite.Δ(Items[0].id)
      // console.log(UpdatedItem)
      expect(UpdatedItem.games.length).toBe(3)
    })

    it('should push an item and set data at the same time', async () => {
      const Item = await dynamite.Ω(Items[0].id, {
        data: 'GAME_DATA',
        games: [{ name: 'World of Warcraft' }]
      })
      // console.log(Item)
      expect(Item).toBeDefined()
      const UpdatedItem = await dynamite.Δ(Items[0].id)
      // console.log(UpdatedItem)
      expect(UpdatedItem.games.length).toBe(4)
    })
  })
})
