import { render, screen } from '@testing-library/react'
import { Fact } from '@/components/Fact'

test('toont het label en de waarde', () => {
  render(<Fact label="Population" value="17,000,000" />)

  // screen.getByText zoekt naar tekst in de DOM
  expect(screen.getByText('Population')).toBeInTheDocument()
  expect(screen.getByText('17,000,000')).toBeInTheDocument()
})
