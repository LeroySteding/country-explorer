// Dit is een Server Component: data wordt op de server gefetcht (SSR bonus!)
import { getAllCountries } from '@/lib/api'
import CountryList from '@/components/CountryList' // client component

export default async function HomePage() {
  const countries = await getAllCountries()
  
  // Sorteer server-side: dit hoeft de client niet te doen
  const sorted = countries.sort((a, b) => 
    a.name.common.localeCompare(b.name.common)
  )

  return (
    <main>
      <h1>Country Explorer</h1>
      {/* CountryList is Client Component voor interactieve zoek/filter */}
      <CountryList countries={sorted} />
    </main>
  )
}