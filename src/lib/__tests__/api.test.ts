import { getAllCountries, getBorderCountries } from '@/lib/api'

// global.fetch vervangen door een mock
beforeEach(() => {
  global.fetch = vi.fn()
})

test('getAllCountries geeft een lijst van landen terug', async () => {
  // fetch geeft dit terug als je hem aanroept
  vi.mocked(fetch).mockResolvedValue({
    ok: true,
    json: async () => [{ cca3: 'NLD', name: { common: 'Netherlands' } }],
  } as Response)

  const result = await getAllCountries()
  expect(result).toHaveLength(1)
  expect(result[0].name.common).toBe('Netherlands')
})

test('getBorderCountries geeft [] terug bij lege codes', async () => {
  // mag fetch niet aanroepen als codes leeg is
  const result = await getBorderCountries([])
  expect(result).toEqual([])
  expect(fetch).not.toHaveBeenCalled()
})
