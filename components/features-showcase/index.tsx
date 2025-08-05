import React from 'react'
import { FEATURES_SHOWCASE, FEATURE_CATEGORIES, type FeatureShowcase } from './data'
import { FeaturesShowcaseClient } from './FeaturesShowcaseClient'

// Server component for better performance - following index-header pattern
export const FeaturesShowcase: React.FC = () => {
  // Group features by category for better organization
  const featuresByCategory = FEATURES_SHOWCASE.reduce(
    (acc, feature) => {
      if (!acc[feature.category]) {
        acc[feature.category] = []
      }
      acc[feature.category].push(feature)
      return acc
    },
    {} as Record<string, FeatureShowcase[]>
  )

  // Default to first feature (APM) for server-side rendering
  const defaultFeature =
    FEATURES_SHOWCASE.find((feature) => feature.id === 'apm') || FEATURES_SHOWCASE[0]

  return (
    <section className="mx-auto w-[100vw] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw]">
      <div className="container pb-16">
        {/* Header */}
        <div className="flex flex-col gap-6 pb-12">
          <div className="mx-auto mt-[50px] flex max-w-4xl flex-col items-center text-center">
            <h2 className="text-gradient text-[32px] font-semibold leading-[3.25rem] md:text-[40px]">
              Complete Observability for Every Use Case
            </h2>
            <p className="mt-4 text-lg text-signoz_vanilla-100">
              From logs to traces to metrics - everything you need in one platform
            </p>
          </div>
        </div>

        {/* Features Layout - Client Component for interactivity */}
        <FeaturesShowcaseClient
          featuresByCategory={featuresByCategory}
          defaultFeature={defaultFeature}
        />
      </div>
    </section>
  )
}
