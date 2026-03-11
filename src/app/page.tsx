import { getAllCountries } from '@/lib/api'
import CountryList from '@/components/CountryList'

export default async function HomePage() {
  const countries = await getAllCountries()

  // sorteren op de server zodat de client dit niet hoeft te doen, localeCompare begrijpt accenten en speciale tekens
  const sorted = countries.sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  )

  return (
    <main className="py-8 space-y-6">
      <h1 className="text-3xl font-bold">Country Explorer</h1>
      <CountryList countries={sorted} />
    </main>
  )
}
