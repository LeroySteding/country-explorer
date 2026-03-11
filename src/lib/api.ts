const BASE_URL = 'https://restcountries.com/v3.1'

// Specifieke velden ophalen = snellere response
const FIELDS = 'cca3,name,flags,population,region,capital'

export async function getAllCountries(): Promise<Country[]> {
  const res = await fetch(`${BASE_URL}/all?fields=${FIELDS}`, {
    next: { revalidate: 3600 } // Next.js SSR cache: 1 uur
  })
  
  if (!res.ok) throw new Error('Failed to fetch countries')
  return res.json()
}

export async function getCountryByCode(code: string): Promise<CountryDetail> {
  const res = await fetch(`${BASE_URL}/alpha/${code}`, {
    next: { revalidate: 3600 }
  })
  
  if (!res.ok) throw new Error(`Country ${code} not found`)
  const data = await res.json()
  return data[0] // API geeft altijd een array terug
}

export async function getBorderCountries(codes: string[]): Promise<{ cca3: string; name: { common: string } }[]> {
  if (!codes.length) return []
  const res = await fetch(`${BASE_URL}/alpha?codes=${codes.join(',')}&fields=cca3,name`, {
    next: { revalidate: 3600 }
  })
  if (!res.ok) return []
  return res.json()
}