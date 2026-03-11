'use client' // needs useState — can't be a Server Component

import { useState, useMemo } from 'react'
import type { Country } from '@/lib/types'
import CountryCard from '@/components/CountryCard'
import SearchBar from '@/components/SearchBar'
import FilterSelect from '@/components/FilterSelect'

type Props = {
  countries: Country[]
}

export default function CountryList({ countries }: Props) {
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('')

  // Derive unique regions from the data — no hardcoding
  // Runs once since `countries` never changes (it's a Server Component prop)
  const regions = useMemo(
    () => [...new Set(countries.map(c => c.region))].sort(),
    [countries]
  )

  // Only re-runs when search or region changes, not on every render
  const filtered = useMemo(() => {
    return countries.filter(c => {
      const matchesSearch = c.name.common
        .toLowerCase()
        .includes(search.toLowerCase())

      // Empty string means "all regions" — FilterSelect passes '' as default
      const matchesRegion = region ? c.region === region : true

      return matchesSearch && matchesRegion
    })
  }, [countries, search, region])

  return (
    <>
      <div>
        {/* Controlled components: state lives here, components just emit changes */}
        <SearchBar value={search} onChange={setSearch} />
        <FilterSelect value={region} onChange={setRegion} options={regions} />
      </div>

      {/* Lets the user know filters are working, even if results are 0 */}
      <p>{filtered.length} countries</p>

      <div>
        {filtered.map(country => (
          // cca3 is unique per country — safe to use as key
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </>
  )
}