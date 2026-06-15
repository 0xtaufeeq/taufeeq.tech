import { MapPin } from 'lucide-react'

import { SOCIAL_ICON_MAP } from '@/components/icons'
import { getGithubContributions } from '@/lib/github'
import { EXTRA_SOCIALS } from '@/lib/site'
import { cn } from '@/lib/utils'

import { BentoCard, BentoBadge } from './BentoCard'
import { BentoGrid } from './BentoGrid'
import { FeaturedWork } from './FeaturedWork'
import { GithubActivity } from './GithubActivity'
import { LocalWeather } from './LocalWeather'
import { NowPlaying } from './NowPlaying'
import { TechStack } from './TechStack'
import { DiscoverMoreCTA } from './DiscoverMoreCTA'
import { MapCard } from './MapCard'

export async function BentoSection() {
  // Spotify is intentionally not fetched here: its no-store fetches would
  // force the whole route dynamic. NowPlaying polls /api/spotify instead.
  const contributions = await getGithubContributions()

  return (
    <BentoGrid>
      {/* Location & social medias */}
      <div
        className={cn(
          'relative col-start-1 col-end-11 row-start-1 row-end-[8] aspect-square',
          'overflow-hidden rounded-3xl border border-line',
          'max-lg:col-end-3 max-lg:row-end-3'
        )}
      >
        <BentoBadge
          icon={<MapPin />}
          text="Location"
          className="absolute left-4 top-4 z-[1001]"
        />
        <MapCard />
      </div>

      <div
        className={cn(
          'grid grid-cols-3 gap-4',
          'col-start-1 col-end-11 row-start-[7] row-end-[9]',
          'max-lg:col-end-4 max-lg:row-start-3 max-lg:row-end-4'
        )}
      >
        {EXTRA_SOCIALS.map(({ name, href }) => {
          const Icon = SOCIAL_ICON_MAP[name]
          return (
            <BentoCard key={name} className="aspect-square">
              <a
                href={href}
                aria-label={name}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-full items-center justify-center rounded-3xl text-muted transition-colors group-hover:text-accent"
              >
                <Icon className="size-10" />
              </a>
            </BentoCard>
          )
        })}
      </div>

      {/* Works */}
      <BentoCard
        className={cn(
          'col-start-11 col-end-[24] row-start-1 row-end-[7]',
          'max-lg:col-start-3 max-lg:col-end-7 max-lg:row-end-3'
        )}
      >
        <FeaturedWork />
      </BentoCard>

      <BentoCard
        className={cn(
          'col-start-11 col-end-[24] row-start-[7] row-end-[9]',
          'max-lg:col-start-4 max-lg:col-end-7 max-lg:row-start-3 max-lg:row-end-4'
        )}
      >
        <DiscoverMoreCTA />
      </BentoCard>

      {/* Spotify & local time */}
      <BentoCard
        className={cn(
          'col-start-[24] col-end-[37] row-start-1 row-end-4',
          'max-lg:col-start-1 max-lg:col-end-4 max-lg:row-start-4 max-lg:row-end-6'
        )}
      >
        <NowPlaying />
      </BentoCard>

      <BentoCard
        className={cn(
          'col-start-[24] col-end-[37] row-start-4 row-end-[9]',
          'max-lg:col-start-4 max-lg:col-end-7 max-lg:row-start-4 max-lg:row-end-6'
        )}
      >
        <LocalWeather />
      </BentoCard>

      {/* Github activity & tech stack */}
      <BentoCard
        className={cn(
          'col-start-1 col-end-[19] row-start-9 row-end-[15]',
          'max-lg:col-start-1 max-lg:col-end-4 max-lg:row-start-6 max-lg:row-end-9'
        )}
      >
        {contributions ? (
          <GithubActivity {...contributions} />
        ) : (
          <p className="p-5 text-sm text-muted">
            GitHub activity is unavailable right now.
          </p>
        )}
      </BentoCard>

      <BentoCard
        className={cn(
          'col-start-[19] col-end-[37] row-start-9 row-end-[15]',
          'max-lg:col-start-4 max-lg:col-end-7 max-lg:row-start-6 max-lg:row-end-9'
        )}
      >
        <TechStack />
      </BentoCard>
    </BentoGrid>
  )
}
