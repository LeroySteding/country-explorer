import Link from "next/link";
import Image from "next/image";
import type { Country } from "@/lib/types";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



type CountryCardProps = {
  country: Country;
};

export default function CountryCard({ country }: CountryCardProps) {
  const { cca3, name, flags, population, region, capital } = country;

  return (
    <Link href={`/${cca3}`}>
      <Card className="relative mx-auto w-full max-w-sm pt-0">
          <div className="absolute inset-0 z-30 aspect-video" />
          <Image
            src={flags.svg}
            alt={flags.alt ?? `Flag of ${name.common}`}
            width={320}
            height={200}
            className="relative z-20 aspect-video w-full object-cover"
          />
          <CardHeader>
            <CardAction>
              <Badge variant="secondary">{region} Region</Badge>
            </CardAction>
            <CardTitle>{name.common}</CardTitle>
          </CardHeader>
          <CardFooter>
            <Button className="w-full">View Details</Button>
          </CardFooter>
        </Card>
    </Link>
  );
}
