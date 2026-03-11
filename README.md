# Country Explorer

Een simpele Next.js app waarmee je landen kunt opzoeken en filteren. Data komt van de gratis [REST Countries API](https://restcountries.com/).

## Wat doet het?

- **Overzichtspagina** — alle landen in een grid, te filteren op naam of regio
- **Detailpagina** — populatie, oppervlakte, talen, valuta en buurlanden per land
- **Buurlanden** — klikbaar, navigeert direct naar het buurland

## Hoe werkt het globaal?

De homepagina is een **Server Component** — de data wordt op de server gefetcht en gesorteerd voordat de browser iets ziet. Het zoeken en filteren zelf gebeurt in de client (`CountryList`) via `useState` en `useMemo`.

De detailpagina fetcht de landdata én de buurlanden server-side. De buurlanden worden in één batch-request opgehaald in plaats van losse calls per land.

De API-responses worden 1 uur gecached via Next.js ISR (`revalidate: 3600`).

## Starten

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
pnpm dev          # lokaal draaien
pnpm build        # productie build
pnpm lint         # ESLint checken
npx vitest run    # tests eenmalig draaien
npx vitest        # tests in watch mode
```

## Stack

| Tool | Waarom |
|---|---|
| Next.js 16 | Server Components, file-based routing, ISR caching |
| Tailwind v4 | Utility-first styling, geen custom CSS nodig |
| shadcn/ui | Kant-en-klare componenten (Card, Badge, Button, Select) |
| Vitest v4 + Testing Library | Snel, past goed bij Vite/Next.js |
| ESLint v9 + jsx-a11y | Code kwaliteit + toegankelijkheid |
| Prettier v3 | Consistente formatting |

## Mogelijke verbeteringen

### Klein en de moeite waard
- **Dark mode** — Tailwind heeft hier native support voor, shadcn ook
- **Skeleton loading per detailpagina** — nu heeft alleen de homepagina een `loading.tsx`
- **`not-found.tsx`** — een nette 404-pagina als een landcode niet bestaat
- **Debounce op de zoekbalk** — nu filtert hij bij elke toetsaanslag, met debounce wacht hij even tot je klaar bent met typen

### Iets meer werk
- **URL-state voor filters** — zoekterm en regio in de URL opslaan zodat je een gefilterde view kunt delen (`?search=ger&region=Europe`)
- **Paginering** — nu worden alle ~250 landen in één keer gerenderd, paginering of infinite scroll maakt dat lichter
- **Favorieten** — landen opslaan in `localStorage`, simpel te implementeren met `useState` + `useEffect`

### Zou ik overslaan
- **Storybook** — overkill voor dit formaat
- **i18n** — zinvol als je het voor echte gebruikers bouwt, anders niet
- **Database** — de REST Countries API is stabiel genoeg, eigen opslag voegt niets toe
