type Props = {
  value: string
  onChange: (value: string) => void
  options: string[]
  label?: string
}

export default function FilterSelect({
  value,
  onChange,
  options,
  label = 'Filter by region',
}: Props) {
  return (
    <label>
      {/* Visible label paired with the select — correct a11y pattern */}
      <span>{label}</span>

      <select
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {/* Empty string = no filter applied, show everything */}
        <option value="">All regions</option>

        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}