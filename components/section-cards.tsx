import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  footerText?: string;
  footerTrendText?: string;
}

interface SectionCardsProps {
  stats: StatCardProps[];
}

export function SectionCards({ stats }: SectionCardsProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="@container/card">
          <CardHeader>
            <CardDescription>{stat.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {stat.value}
            </CardTitle>
            {stat.change && (
              <CardAction>
                <Badge variant="outline">
                  {stat.trend === "up" ? <IconTrendingUp /> : stat.trend === "down" ? <IconTrendingDown /> : null}
                  {stat.change}
                </Badge>
              </CardAction>
            )}
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            {stat.footerTrendText && (
              <div className="line-clamp-1 flex gap-2 font-medium">
                {stat.footerTrendText} {stat.trend === "up" ? <IconTrendingUp className="size-4" /> : stat.trend === "down" ? <IconTrendingDown className="size-4" /> : null}
              </div>
            )}
            {stat.footerText && (
              <div className="text-muted-foreground">
                {stat.footerText}
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
