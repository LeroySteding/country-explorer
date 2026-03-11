import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type FilterSelectProps = {
  value: string
  onChange: (value: string) => void
  options: string[]
  label?: string
}

// Radix staat geen lege string toe als value, gebruik dit als default voor "geen filter"
const ALL_REGIONS = '__all__'

export default function FilterSelect({
  value,
  onChange,
  options,
}: FilterSelectProps) {
  return (
    <Select value={value || ALL_REGIONS} onValueChange={v => onChange(v === ALL_REGIONS ? '' : v)}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="All regions" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL_REGIONS}>All regions</SelectItem>
        {options.map(option => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
