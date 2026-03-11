import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CountryList from '@/components/CountryList'

// minimale testdata — klein en overzichtelijk
const countries = [
  { cca3: 'NLD', name: { common: 'Netherlands' }, region: 'Europe', flags: { svg: '', alt: '' }, population: 17000000, capital: ['Amsterdam'] },
  { cca3: 'BRA', name: { common: 'Brazil' }, region: 'Americas', flags: { svg: '', alt: '' }, population: 210000000, capital: ['Brasília'] },
  { cca3: 'JPN', name: { common: 'Japan' }, region: 'Asia', flags: { svg: '', alt: '' }, population: 125000000, capital: ['Tokyo'] },
]

test('toont alle landen bij start', () => {
  render(<CountryList countries={countries} />)
  expect(screen.getByText('Netherlands')).toBeInTheDocument()
  expect(screen.getByText('Brazil')).toBeInTheDocument()
  expect(screen.getByText('Japan')).toBeInTheDocument()
})

test('toont het juiste aantal landen', () => {
  render(<CountryList countries={countries} />)
  expect(screen.getByText('3 countries')).toBeInTheDocument()
})

test('zoeken filtert de lijst', async () => {
  render(<CountryList countries={countries} />)

  await userEvent.type(screen.getByRole('searchbox'), 'neth')

  expect(screen.getByText('Netherlands')).toBeInTheDocument()
  expect(screen.queryByText('Brazil')).not.toBeInTheDocument()
  expect(screen.getByText('1 countries')).toBeInTheDocument()
})

test('zoeken is niet hoofdlettergevoelig', async () => {
  render(<CountryList countries={countries} />)

  await userEvent.type(screen.getByRole('searchbox'), 'JAPAN')

  expect(screen.getByText('Japan')).toBeInTheDocument()
  expect(screen.getByText('1 countries')).toBeInTheDocument()
})

test('geen resultaten toont 0 countries', async () => {
  render(<CountryList countries={countries} />)

  await userEvent.type(screen.getByRole('searchbox'), 'zzzzz')

  expect(screen.getByText('0 countries')).toBeInTheDocument()
})
