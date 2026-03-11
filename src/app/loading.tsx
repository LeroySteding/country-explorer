export default function Loading() {
  return (
    <main className="py-8 space-y-6">
      <div className="h-9 w-48 rounded-md bg-muted animate-pulse" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="rounded-lg bg-muted animate-pulse aspect-[4/3]" />
        ))}
      </div>
    </main>
  )
}
