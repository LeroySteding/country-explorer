// Not using all the data available, just to keep it more simpler. 
export type Country = {
  cca3: string           // unieke code, gebruik je als key + route param
  name: { common: string }
  flags: { svg: string; alt: string }
  population: number
  region: string
  capital?: string[]     // optional, niet elk land heeft een hoofdstad
}

export type CountryDetail = Country & {
  languages?: Record<string, string>
  currencies?: Record<string, { name: string; symbol: string }>
  borders?: string[]     // array van cca3 codes → leuk voor "buurlanden" feature
  area: number
}