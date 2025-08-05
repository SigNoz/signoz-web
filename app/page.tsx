/* eslint-disable jsx-a11y/media-has-caption */
import { Header } from '@/components/index-header'
import BuildForDevelopers from '@/components/build-for-developers'
import { FeaturesShowcase } from '@/components/features-showcase'
import SigNozStats from '@/components/signoz-stats'
import { Testimonials } from '@/components/testimonials'
import { TrustedByTeams } from '@/components/trusted-by'
import { WhyOpenTelemetry } from '@/components/why-opentelemetry'
import WhySelectSignoz from '@/components/why-select-signoz'
import { GetStarted } from '@/components/GetStarted'
import { NextUIProvider } from '@nextui-org/react'
import { Metadata } from 'next'
import Chatbase from '@/components/Chatbase'
import { evaluateFeatureFlag } from '@/utils/growthbookServer'
import { EXPERIMENTS } from '@/constants/experiments'
import { ExperimentTracker } from '@/components/ExperimentTracker'

export const metadata: Metadata = {
  title: 'SigNoz | The Open Source Datadog Alternative',
  openGraph: {
    title: 'SigNoz | The Open Source Datadog Alternative',
    description:
      'SigNoz is an open-source observability tool powered by OpenTelemetry. Get APM, logs, traces, metrics, exceptions, & alerts in a single tool.',
  },
  description:
    'SigNoz is an open-source observability tool powered by OpenTelemetry. Get APM, logs, traces, metrics, exceptions, & alerts in a single tool.',
}

export default async function Page() {
  // Check if the chatbase bubble experiment is enabled
  const isChatbaseBubbleVariant = await evaluateFeatureFlag(
    EXPERIMENTS.CHATBASE_BUBBLE?.flagName || 'chatbase-bubble-experiment'
  )

  // Safety check for experiment configuration
  const chatbaseExperiment = EXPERIMENTS.CHATBASE_BUBBLE
  const experimentId = chatbaseExperiment?.id || 'chatbase-bubble-experiment'
  const variantId = chatbaseExperiment?.variants?.VARIANT || 'with-chatbase-bubble'
  const controlId = chatbaseExperiment?.variants?.CONTROL || 'no-chatbase-bubble'

  return (
    <NextUIProvider>
      <div className="relative mt-[-56px] bg-signoz_ink-500 ">
        <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
        <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full  flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />
        <main className="landing-section relative z-[1]">
          <Header />
          <TrustedByTeams page="homepage" />
          {/* <SigNozFeatures /> */}
          <FeaturesShowcase />
          <BuildForDevelopers />
          <WhyOpenTelemetry />
          <WhySelectSignoz />
          <SigNozStats />
          <Testimonials page="homepage" />
          <GetStarted page="homepage" />
        </main>
        {isChatbaseBubbleVariant ? (
          <ExperimentTracker experimentId={experimentId} variantId={variantId}>
            <Chatbase />
          </ExperimentTracker>
        ) : (
          <ExperimentTracker experimentId={experimentId} variantId={controlId}>
            <></>
          </ExperimentTracker>
        )}
      </div>
    </NextUIProvider>
  )
}
