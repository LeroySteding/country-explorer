type FactProps = {
  label: string
  value: string
}

export function Fact({ label, value }: FactProps) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  )
}
