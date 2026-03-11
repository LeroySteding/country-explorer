import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CountryList from '@/components/CountryList'

// mockdata
const countries = [
  { cca3: 'NLD', name: { common: 'Netherlands' }, region: 'Europe', flags: { svg: '' } },
  { cca3: 'BRA', name: { common: 'Brazil' }, region: 'Americas', flags: { svg: '' } },
]

test('toont alle landen bij start', () => {
  render(<CountryList countries={countries} />)
  expect(screen.getByText('Netherlands')).toBeInTheDocument()
  expect(screen.getByText('Brazil')).toBeInTheDocument()
})

test('zoeken filtert de lijst', async () => {
  render(<CountryList countries={countries} />)

  await userEvent.type(screen.getByRole('searchbox'), 'neth')

  // Netherlands zichtbaar, Brazil niet meer
  expect(screen.getByText('Netherlands')).toBeInTheDocument()
  expect(screen.queryByText('Brazil')).not.toBeInTheDocument()
})

test('0 resultaten toont "0 countries"', async () => {
  render(<CountryList countries={countries} />)
  await userEvent.type(screen.getByRole('searchbox'), 'zzzzz')
  expect(screen.getByText('0 countries')).toBeInTheDocument()
})
