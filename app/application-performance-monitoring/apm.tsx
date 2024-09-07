'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import Button from '@/components/Button/Button'
import Card from '@/components/Card/card'
import FeatureCard from '@/components/FeatureCard/FeatureCard'
import ProductNav from '@/components/ProductNav/ProductNav'


function Apm() {
  return (
    <main className='mb-auto !mt-[-10px]'>
      <ProductNav/>
      <div className='relative bg-signoz_ink-500'>
        <div className="absolute left-0 right-0 top-0 h-screen bg-[url('/img/background_blur/Perlin_noise.png')] bg-[length:55%] bg-[center_top_4rem] sm:bg-no-repeat " />
        <div className="absolute left-0 right-0 top-0 h-screen bg-[url('/img/background_blur/Circle.png')] bg-[length:110%] bg-no-repeat sm:bg-[center_top_-50rem]" />
        <Header />
        <TrustedByTeams page="apm" />
        <SigNozFeatures />
        <SigNozUsage />
        <UsageBasedPricing />
        {/* <ExploreDocs /> */}
        <SigNozStats />
        <GetStarted page="apm" />
      </div>
    </main>
  )
}

export default Apm

const PlatformCard = ({ title, description }) => {
  return (
    <div className="p-4 bg-signoz_ink-400 border border-signoz_slate-500 rounded-md">
      <h3 className="text-base font-medium text-signoz_vanilla-100 mb-2">{title}</h3>
      <p className="text-sm font-normal text-signoz_vanilla-400 mb-0">{description}</p>
    </div>
  );
};

const FeatureList = () => {
  const features = [
    { title: 'Real-Time Monitoring', description: ' Get real-time insights and alerts on application performance issues, enabling rapid response and resolution.' },
    { title: 'End-point monitoring/Transaction monitoring', description: 'Monitor top API end-points of your services for latency, number of calls, and error rate.' },
    { title: 'Database Monitoring', description: 'Monitor the performance of database queries and transactions made from your application.' },
    { title: 'External API monitoring', description: 'Track the performance and reliability of third-party APIs. Monitor the latency, error rates, and response times of external API calls.' },
    { title: 'Root Cause Analysis', description: 'Quickly identify and diagnose the root causes of performance issues and errors in applications with the ability to view traces around high latencies.' },
    { title: 'Service Dependency Mapping', description: 'Visualize service dependencies and understand how different services interact within the application architecture.' },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      {features.map((feature, index) => (
        <PlatformCard
          key={index}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

const UsageList = () => {
  const Usage = [
    { title: 'Pay only for data you send', description: 'We don’t have any SKU-based pricing. Get access to all features in the plan selected and only pay for the data you send. Pay only $0.3 per GB of ingested traces.' },
    { title: 'Add unlimited team members', description: 'Observability should be available to every developer at your company. After all, anyone can need debugging. That’s why we don’t charge for user seats, and you can add as many team members as you want.' },
    { title: 'No Host (container or node) based pricing', description: 'For modern cloud-based applications it doesn’t make sense to charge on the basis of number of hosts or containers. You don’t need to worry about auto-scaling during peak hours. Only pay for the amount of data sent no matter the number of hosts.' },
  ]

  return (
    <div className="w-full flex flex-col gap-4">
      {Usage.map((feature, index) => (
        <PlatformCard
          key={index}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );

}

const DocsList = () => {
  const Docs = [
    { title: 'Node.js instrumentation', description: 'Instrument your Node.js application and monitor with SigNoz' },
    { title: 'Python instrumentation', description: 'Instrument your Python application and monitor with SigNoz' },
    { title: 'Java instrumentation', description: 'Instrument your Java application and monitor with SigNoz' },
    { title: 'Get started with SigNoz APM', description: 'Instrument your Java application and monitor with SigNoz' },
  ]

  return (
    <div className="w-full flex flex-col gap-4">
      {Docs.map((feature, index) => (
        <PlatformCard
          key={index}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
}

const Header = () => {

  return (
    <header className="relative !mx-auto mt-16 !w-[100vw] md:!w-[80vw]">
      <div className="absolute bottom-0 left-[12px] right-[12px] top-0 z-[0] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:left-[24px] md:right-[24px]" />
      <div className="relative !mx-auto flex !w-[100vw] flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 px-2 pb-4 pt-12 text-center md:!w-[80vw] md:px-5 md:pt-[8.5rem]">

        <div className="absolute left-0 top-[101px] z-0 h-9 sm:h-14 !w-[100vw] border !border-l-0 !border-r-0 border-dashed border-signoz_slate-400 md:top-[225px] md:!w-[80vw]" />

        <h1 className="my-4 text-2xl !p-3 sm:my-2 sm:text-3xl font-semibold tracking-tight dark:text-white sm:my-5 md:leading-[3.5rem] lg:text-[44px] text-gradient z-[1]">
          Application Performance Monitoring <br />Powered by OpenTelemetry
        </h1>

        <p className="m-0 p-3 text-lg leading-8 font-normal sm:p-0 text-signoz_vanilla-400">
          SigNoz APM comes with out-of-box charts for key application metrics powered by OpenTelemetry.
          <br className="hidden lg:inline" />
          Get latency, requests per second, error percentage, apdex & other key metrics
          <br className="hidden lg:inline" />
          to understand your application performance.
        </p>
      </div>
      <div className="relative z-[1] !mx-auto mx-2 flex !w-[100vw] flex-col items-center justify-center gap-3 border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 pb-12 pt-4 md:mx-5 md:!w-[80vw] md:flex-row">
        <Button id="btn-get-started-homepage-hero">
          <Link href="/teams/" className="flex-center">
            Start your free trial
            <ArrowRight size={14} />
          </Link>
        </Button>

        <Button type={Button.TYPES.SECONDARY} id="btn-read-documentation-homepage-hero">
          <Link href="/docs/introduction/" className="flex-center">
            <BookOpen size={14} />
            Read Documentation
          </Link>
        </Button>
      </div>
      <div className="section-container !mx-auto !mt-0 !w-[90vw] border !border-b-0 !border-t-0 border-none border-signoz_slate-400 md:!w-[80vw] md:border-dashed max-sm:-mb-[3rem] -mb-[9rem]">
        <div className="w-100 mx-[-28px]">
          <div className="product-explainer-video hero-figure rounded-lg p-3">
            <div className="embed-container">
              <div className="absolute">
                <img
                  src="/img/features/apm/apm-cover.webp"
                  alt="Custom Thumbnail"
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

const COMPANIES = [
  { image: '/img/users/netapp.svg', imageDesc: 'netapp logo' },
  { image: '/img/users/samsung.svg', imageDesc: 'samsung logo' },
  { image: '/img/users/comcast.svg', imageDesc: 'comcast logo' },
  { image: '/img/users/freo.svg', imageDesc: 'freo logo' },
  { image: '/img/users/hyperface.svg', imageDesc: 'hyperface logo' },
  { image: '/img/users/salesforce.svg', imageDesc: 'salesforce logo' },
  { image: '/img/users/rattle.svg', imageDesc: 'rattle logo' },
  { image: '/img/users/webstaurantstore.svg', imageDesc: 'webstaurant logo' },
  { image: '/img/users/gokiwi.svg', imageDesc: 'GoKiwi logo' },
  { image: '/img/users/outplay.svg', imageDesc: 'outplay logo' },
  { image: '/img/users/tuneai.svg', imageDesc: 'tune logo' },
  { image: '/img/users/wombo.svg', imageDesc: 'wombo logo' },
]

const TrustedByTeams = ({ page }) => {
  const customerStoriesId = `btn-customer-stories-${page}-hero`
  return (
    <section
      className={`relative pt-10 !m-0 !mx-auto !w-[100vw]  border !border-b-0 border-dashed border-signoz_slate-400 md:!w-[80vw] z-[1] bg-signoz_ink-500`}
    >
      <div className="section-container">
        <div className="mb-2 flex flex-col items-center text-center md:mb-12">
          <div className="text-sm font-semibold uppercase leading-5 tracking-[0.05em] text-signoz_vanilla-400">
            Trusted by the <span className="text-signoz_vanilla-100">best platform teams</span>
          </div>
        </div>
        <div className="mb-12 mt-12 grid grid-cols-2 place-content-center gap-y-8 sm:gap-x-8 sm:gap-y-14 px-2  sm:grid-cols-4 md:mt-0 md:grid-cols-6 ">
          {COMPANIES.map((company, idx) => (
            <div key={`${idx}-${company.image}`} className="flex items-center justify-center">
              <img
                className="h-[40px] w-[100px] md:h-[40px] md:w-[120px]"
                src={company.image}
                alt={company.imageDesc}
              />
            </div>
          ))}
        </div>
        <div
          className={`wavy-line relative mx-[-1rem]
          after:absolute after:top-[50%] after:h-0 after:w-full after:bg-transparent after:content-['']
        `}
        >
          <div className="flex flex-col items-center text-center">
            <Button
              id={customerStoriesId}
              className=" button-background relative z-[1] flex h-8 items-center justify-center gap-1.5 truncate rounded-full py-2 pl-4 pr-3 text-center text-sm font-medium not-italic leading-5 text-white no-underline outline-none hover:text-white"
            >
              <Link href="/case-study/" className="z-[1] mx-2 flex-center">
                Read customer stories <ArrowRight size={14} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}


const SigNozFeatures = () => {

  const sections = [
    {
      title: 'Faster Analytics powered by ClickHouse',
      desc: ['We use ClickHouse as our datastore. ClickHouse is a very fast and resource-efficient database for real-time analytics. Big companies like Uber and Cloudflare power their observability with ClickHouse as the database. It provides best-in-class ingestion rates and great compression ratios for efficient storage.',
      ],
      figure: '/img/landing/property-ease-of-use.webp',
      logo: '/img/log-management/fast.svg',
    },
    {
      title: 'Correlation with other signals',
      desc: 'We provide traces, metrics, and logs under a single pane of glass powered by OpenTelemetry SDKs. You can correlate your signals for a much richer context while debugging. Generate metrics from trace data, jump from traces to logs and vice-versa.',
      figure: '/img/landing/property-covers-all-use-cases.webp',
      logo: '/img/log-management/signals.svg',
    },
    {
      title: 'Out-of-box charts for key application metrics',
      desc: 'Get key application metrics charts like p99, p90, p50 latency, request rate, error rates, Apdex and others with minimal code changes. Use auto-instrumentation libraries provided by OpenTelemetry to get started with observability quickly.',
      figure: '/img/landing/property-covers-all-use-cases.webp',
      logo: '/img/features/apm/chart-column-big.svg',
      buttonText: 'Instrument your application',
      buttonLink: 'https://signoz.io/docs/instrumentation/'
    },
    {
      title: '',
    },
  ]


  const scrollsections = [
    {
      title: 'Support for all popular languages',
      desc: "SigNoz supports a wide range of popular languages for application monitoring. Instrument your application code with OpenTelemetry, and start sending data to SigNoz.",
      image: "/img/features/apm/apm-language-supported.webp",
      buttonText: 'Learn More',
      buttonLink: 'https://signoz.io/docs/instrumentation/',
    },
    {
      title: 'Monitor all your services',
      desc: "Be on top of your application performance with out-of-box charts for latency, error rate, operations per second, and other critical metrics of all your services.",
      image: "/img/features/apm/apm-services.webp",
    },
    {
      title: 'Out-of-box APM Charts',
      desc: "For each of your services, monitor p99, p90, p50 latencies, rate (ops/s), and error rate with out-of-the-box application metrics charts.",
      image: "/img/features/apm/apm-charts.webp",
    },
    {
      title: 'Apdex',
      desc: "Apdex score indicates the end user’s level of satisfaction from 0(least satisfied) to 1(most satisfied) with application performance. It helps developers gauge their application's performance from the user's perspective.",
      image: "/img/features/apm/apdex.webp",
      buttonText: 'Learn More',
      buttonLink: 'https://signoz.io/docs/userguide/metrics/#what-are-application-metrics',
    },
    {
      title: 'Database Call Metrics',
      desc: "If your application makes any database calls, you can monitor them under DB Call Metrics. Monitor the number of database calls per second and their average duration.",
      image: "/img/features/apm/database-call-metrics.webp",
      buttonText: 'Learn More',
      buttonLink: 'https://signoz.io/docs/userguide/metrics/#database-calls-in-signoz',
    },
    {
      title: 'Monitor the Top Endpoints of your service',
      desc: "Get a list of key endpoints and important metrics about them. It helps you quickly identify slow endpoints of your application.",
      image: "/img/features/apm/top-endpoints.webp",
      buttonText: 'Learn More',
      buttonLink: 'https://signoz.io/docs/application-monitoring/api-monitoring/#key-operations-section-in-service-page',
    },
    {
      title: 'External Call Metrics',
      desc: "External call metrics allow you to track the external services on which your application depends. Monitor things like the percentage of external calls that resulted in errors.",
      image: "/img/features/apm/external-call-metrics.webp",
      buttonText: 'Learn More',
      buttonLink: 'https://signoz.io/docs/userguide/metrics/#external-calls-in-signoz',
    },
    {
      title: 'Application Metrics to Traces',
      desc: "SigNoz APM allows you to view your application's traces from APM charts at any time stamp. You can click on data points with high latencies to view traces around those timestamps.",
      image: "/img/features/apm/apm-view-traces.webp"
    },

  ]
  return (
    <>
      <div className="bg-[url('/img/background_blur/Frame_1862.png')] bg-[length:65%] bg-[center_top_5rem] sm:bg-no-repeat">
        <section className="mx-auto w-[100vw] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw] ">
          <div className={`container pb-16`}>
            <div className="flex flex-col gap-6 pb-44 pt-28 ">
              <div className="mx-auto mt-[50px] flex max-w-4xl flex-col items-center text-center">
                <div className="text-[44px] font-semibold leading-[3.25rem] text-signoz_sienna-100">
                  Why use SigNoz for <br /> Application Performance Monitoring?
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="!mx-auto grid !w-[100vw] grid-cols-1 border !border-l-0 !border-t-0 border-dashed border-signoz_slate-400 sm:grid-cols-2 md:!w-[80vw]">
        <div className="!mx-auto grid !w-[100vw] grid-cols-1 border !border-b-0 !border-l-0 !border-t-0 border-dashed border-signoz_slate-400 sm:grid-cols-2 md:!w-[80vw]">
          {sections.map((section, index) => (
            <Card
              key={index}
              logo={section.logo}
              subTitle={section.title}
              description={section.desc}
              buttonText={section.buttonText}
              buttonLink={section.buttonLink}
              logoSize={24}
              subTitleSize={2}
            />
          ))}
        </div>
      </div>

      <div className="bg-[url('/img/background_blur/Frame_1862.png')] bg-[length:65%] bg-[center_top_5rem] sm:bg-no-repeat">
        <section className="mx-auto w-[100vw] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw] ">
          <div className={`container pb-16`}>
            <div className="flex flex-col gap-6 pb-44 pt-28 ">
              <div className="mx-auto mt-[50px] flex max-w-4xl flex-col items-center text-center">
                <div className="text-[44px] font-semibold leading-[3.25rem] text-signoz_sienna-100">
                  SigNoz Application Performance <br /> Monitoring Overview
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>


      <div className="!mx-auto grid !w-[100vw] grid-cols-1 border !border-l-0 !border-t-0 border-dashed border-signoz_slate-400 sm:grid-cols-2 md:!w-[80vw]">
        {scrollsections.map((scrollsections, index) => (
          <FeatureCard
            key={index}
            title={scrollsections.title}
            description={scrollsections.desc}
            buttonText={scrollsections.buttonText}
            buttonLink={scrollsections.buttonLink}
            img={scrollsections.image}
          />
        ))}
      </div>
    </>
  )
}



const SigNozUsage = () => {
  return (
    <div className="section-container !mx-auto !w-[100vw] border !border-b-0 border-dashed border-signoz_slate-400 !px-0 md:!w-[80vw]">
      <div className="flex flex-col sm:flex-row">
        <div className="!w-[100%]  flex-1 md:!w-[300px]">
          <p className="sticky top-[100px] px-10 pl-0 pt-10 text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px] md:px-0 md:pl-12">
            Use SigNoz<br /> APM for...
          </p>
        </div>
        <div className="flex-[2_2_0%]">
          <div className="ml-0 justify-between gap-8 border !border-b-0 !border-r-0 !border-t-0 border-dashed border-signoz_slate-400 py-10 sm:flex-row px-10">
            <FeatureList />
          </div>
        </div>
      </div>
    </div>
  )
}

const UsageBasedPricing = () => {
  return (
    <div className="section-container !mx-auto !w-[100vw] border !border-b-0 border-dashed border-signoz_slate-400 !px-0 md:!w-[80vw]">
      <div className="flex flex-col sm:flex-row">
        <div className="!w-[100%]  flex-1 md:!w-[300px]">
          <p className="sticky top-[100px] px-10 pl-0 pt-10 text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px] md:px-0 md:pl-12">
            Simple<br /> usage-based <br /> pricing
          </p>
        </div>
        <div className="flex-[2_2_0%]">
          <div className="ml-0 justify-between gap-8 border !border-b-0 !border-r-0 !border-t-0 border-dashed border-signoz_slate-400 py-10 sm:flex-row px-10">
            <div className='text-signoz_vanilla-100 text-2xl font-semibold mb-2'>
              Pricing you can trust
            </div>
            <p className='text-signoz_vanilla-400 text-base font-normal'>Tired of Datadog’s unpredictable bills or New Relic’s user-based pricing?<br />We’re here for you.</p>
            <UsageList />
            <Button id="btn-get-started-homepage-hero" className="mt-5">
              <Link href="/pricing/" className="flex-center">
                Check Pricing
                <ArrowRight size={14} />
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}

const ExploreDocs = () => {
  return (
    <div className="section-container !mx-auto !w-[100vw] border !border-b-0 border-dashed border-signoz_slate-400 !px-0 md:!w-[80vw]">
      <div className="flex flex-col sm:flex-row">
        <div className="!w-[100%]  flex-1 md:!w-[300px]">
          <p className="sticky top-[100px] px-10 pl-0 pt-10 text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px] md:px-0 md:pl-12">
            Explore Docs
          </p>
        </div>
        <div className="flex-[2_2_0%]">
          <div className="ml-0 justify-between gap-8 border !border-b-0 !border-r-0 !border-t-0 border-dashed border-signoz_slate-400 py-10 sm:flex-row px-10">
            <DocsList />
          </div>
        </div>
      </div>
    </div>
  )
}

const SigNozStats = () => {
  const STATS_LIST = [
    {
      id: 1,
      logo: '/img/index_features/download.svg',
      name: 'OSS Downloads',
      value: '10 million+',
    },
    { id: 2, logo: '/img/index_features/github.svg', name: 'GitHub Stars', value: '18k+' },
    { id: 3, logo: '/img/index_features/contributions.svg', name: 'Contributors', value: '140+' },
    { id: 4, logo: '/img/index_features/community.svg', name: 'Community Members', value: '4.5k+' },
  ]
  return (
    <section>
      <div className="">
        <div className="section-container !mx-auto flex !w-[100vw] flex-col border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 !px-0 sm:flex-row md:!w-[80vw]">
          <div className="!w-[300px] flex-1 border !border-b-0 !border-l-0 !border-r-0 border-dashed border-signoz_slate-400">
            <p className="pl-12 pt-10 text-left text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px]">
              Developers <br />
              Love
              <br />
              SigNoz
            </p>
          </div>

          <div className="flex flex-[2_2_0%] flex-col">
            <div className="grid grid-cols-1 text-left sm:grid-cols-2">
              {STATS_LIST.map((stat, index) => (
                <Card logo={stat.logo} stats={stat.value} description={stat.name} logoSize={24} key={index} />
              ))}
            </div>
            <div className="flex flex-col items-center gap-3 border !border-b-0 !border-r-0 border-dashed border-signoz_slate-400 py-6 sm:flex-row sm:py-6 sm:pl-10">
              <Button className="text-xs sm:text-sm" id="btn-join-community-homepage">
                <Link href="https://signoz.io/slack/" className='flex-center'>
                  <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Join the community
                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </Link>
              </Button>
              <Button type={Button.TYPES.SECONDARY} className="text-xs sm:text-sm" id="btn-github-repo-homepage">
                <Link href="https://github.com/SigNoz/signoz/" className='flex-center'>
                  <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  GitHub Repository
                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const GetStarted = ({ page }) => {
  const getStartedId = `btn-get-started-${page}-bottom`;
  const readDocumentationId = `btn-read-documentation-${page}-bottom`;

  return (
    <div className="bg-[url('/img/background_blur/Rectangle_959.png')] bg-[length:68%] bg-[center_top_-20rem] sm:bg-no-repeat">
      <div className="bg-[url('/img/background_blur/Frame_2185.png')] bg-[length:68%] bg-[center_top_-20rem] sm:bg-no-repeat">
        <section className='!mx-auto !w-[100vw] border !border-b-0 border-dashed border-signoz_slate-400 md:!w-[80vw]'>
          <div className="bg-[url('/img/background_blur/Ellipse_206.png')] bg-[center_top_calc(-250px)] bg-no-repeat">
            <div className='flex flex-col gap-16'>
              <div className='flex flex-col gap-12'>
                <p className='text-4xl font-bold text-center mb-0 mt-20'>
                  Get started with <br /> SigNoz Cloud today
                </p>
                <div className="flex items-center justify-center gap-3 pt-4 max-sm:flex-col">
                  <Button id={getStartedId}>
                    <Link href="/teams/" className="flex-center">
                      Try SigNoz Cloud
                      <ArrowRight size={14} />
                    </Link>
                  </Button>

                  <Button type={Button.TYPES.SECONDARY} id={readDocumentationId}>
                    <Link href="/docs/introduction/" className="flex-center">
                      <BookOpen size={14} />
                      Read Documentation
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative flex justify-center items-center">
                <img
                  src="/img/landing/landing_thumbnail.png"
                  alt="Custom Thumbnail"
                  className="w-3/5 rounded-lg max-sm:-mb-8 -mb-36 z-[0]"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}