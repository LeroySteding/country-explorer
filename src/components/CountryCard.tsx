import Link from "next/link";
import Image from "next/image";
import type { Country } from "@/lib/types";

type Props = {
  country: Country;
};

export default function CountryCard({ country }: Props) {
  const { cca3, name, flags, population, region, capital } = country;

  return (
    // Link wraps the entire card — cca3 is the unique route param (e.g. /NLD)
    <Link href={`/${cca3}`}>
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <Image
          className="w-full h-48 object-cover"
          src={flags.svg}
          alt={flags.alt ?? `Flag of ${name.common}`}
          width={320}
          height={200}
          // priority={false} by default — fine for a list of cards
        />

        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-900">{name.common}</h2>

          <dl className="mt-2 space-y-1 text-sm">
            <div>
              <dt className="inline text-gray-500">Population:</dt>
              <dd className="inline ml-1 font-medium">{population.toLocaleString()}</dd>
            </div>
            <div>
              <dt className="inline text-gray-500">Region</dt>
              <dd className="inline ml-1 font-medium">{region}</dd>
            </div>

            <div>
               <dt className="inline text-gray-500">Capital</dt>
              {/* capital is optional in the API — some territories have none */}
              <dd className="inline ml-1 font-medium">{capital?.[0] ?? "—"}</dd>
            </div>
          </dl>
        </div>
      </article>
    </Link>
  );
}
