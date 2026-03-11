'use client' // we gebruiken useState vandaar een client component

import { useState, useMemo } from 'react'
import type { Country } from '@/lib/types'
import CountryCard from '@/components/CountryCard'
import SearchBar from '@/components/SearchBar'
import FilterSelect from '@/components/FilterSelect'

type CountryListProps = {
  countries: Country[]
}

export default function CountryList({ countries }: CountryListProps) {
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('')

  // Maken de array opnieuw aan door gebruik te maken van Set zodat we geen duplications hebben gezien Set dit niet toestaat
  const regions = [...new Set(countries.map(c => c.region))].sort()

  // herberekent alleen als search of region verandert, 
  // loopt over elk land en houdt alleen matches over, 
  // countries veranderd namelijk niet omdat het vanuit de server komt. 
  const filtered = useMemo(() =>
    countries.filter(c =>
      c.name.common.toLowerCase().includes(search.toLowerCase()) &&
      (region === '' || c.region === region)
    ),
    [search, region]
  )

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <SearchBar value={search} onChange={setSearch} />
        <FilterSelect value={region} onChange={setRegion} options={regions} />
      </div>

      <p className="text-sm text-muted-foreground">{filtered.length} countries</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map(country => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  )
}
