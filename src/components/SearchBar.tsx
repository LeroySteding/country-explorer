type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search countries...',
}: Props) {
  return (
    <input
      type="search"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      // aria-label so screen readers know what this input is for
      // (no visible <label> in this design, so this is required for a11y)
      aria-label="Search countries"
    />
  )
}