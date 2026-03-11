import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '@/components/SearchBar'

test('toont de standaard placeholder', () => {
  render(<SearchBar value="" onChange={() => {}} />)
  expect(screen.getByPlaceholderText('Search countries...')).toBeInTheDocument()
})

test('toont een custom placeholder', () => {
  render(<SearchBar value="" onChange={() => {}} placeholder="Zoek een land..." />)
  expect(screen.getByPlaceholderText('Zoek een land...')).toBeInTheDocument()
})

test('roept onChange aan als je typt', async () => {
  const onChange = vi.fn()
  render(<SearchBar value="" onChange={onChange} />)

  await userEvent.type(screen.getByRole('searchbox'), 'n')

  expect(onChange).toHaveBeenCalledWith('n')
})

test('heeft een aria-label voor screenreaders', () => {
  render(<SearchBar value="" onChange={() => {}} />)
  expect(screen.getByLabelText('Search countries')).toBeInTheDocument()
})
