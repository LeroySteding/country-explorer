import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getCountryByCode, getBorderCountries } from '@/lib/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Fact } from '@/components/Fact'
import { Card, CardContent } from '@/components/ui/card'

type Props = {
  params: Promise<{ code: string }>
}

export default async function CountryPage({ params }: Props) {
  const { code } = await params
  // 404 als landcode niet bestaat
  const country = await getCountryByCode(code).catch(() => notFound())

  // destructuring zodat we niet country.flags hoeven te schrijven
  const { name, flags, population, region, capital, area, languages, currencies, borders } = country

  // we willen alleen de namen ipv het object
  const languageList = languages ? Object.values(languages) : []
  const currencyList = currencies
    ? Object.values(currencies).map(c => `${c.name} (${c.symbol})`)
    : []

  const borderCountries = await getBorderCountries(borders ?? [])

  return (
    <main className="py-8 space-y-8">
      <Button variant="outline" asChild>
        <Link href="/">← Back</Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <Image
          src={flags.svg}
          alt={flags.alt ?? `Flag of ${name.common}`}
          width={600}
          height={400}
          className="w-full rounded-lg object-cover shadow"
          priority
        />

        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold">{name.common}</h1>
            <p className="text-muted-foreground">{name.official}</p>
          </div>

          <Badge variant="secondary">{region}</Badge>

          <Card>
            <CardContent className="pt-6">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <Fact label="Population" value={population.toLocaleString()} />
                <Fact label="Capital" value={capital?.[0] ?? '—'} />
                <Fact label="Area" value={`${area.toLocaleString()} km²`} />
                <Fact label="Languages" value={languageList.join(', ') || '—'} />
                <Fact label="Currencies" value={currencyList.join(', ') || '—'} />
              </dl>
            </CardContent>
          </Card>

          {borderCountries.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Border Countries</p>
              <div className="flex flex-wrap gap-2">
                {borderCountries.map(({ cca3, name: borderName }) => (
                  <Button key={cca3} variant="outline" size="sm" asChild>
                    <Link href={`/${cca3}`}>{borderName.common}</Link>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}