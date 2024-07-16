import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export const SignozDatalog = () => {
  return (
    <section>
      <div className='section-container flex h-auto border border-signoz_slate-400 border-dashed !border-b-0 !border-r-0 px-10 py-10'>
        <div className="flex flex-col w-full">
          <div>
            <p className='text-2xl font-semibold text-signoz_vanilla-100'>SigNoz provides up to 9X ROI than DataDog</p>
            <p className='text-signoz_vanilla-400 text-base font-normal leading-9'>You can also set data ingestion limits so you never get a surprise bill.
              <Link href={"https://signoz.io/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"}>
              <span className='text-signoz_robin-400 font-medium'> Learn more<ArrowUpRight className='inline' size={16} />
              </span>
              </Link>
            </p>
          </div>
          <img src="/img/graphics/homepage/feature-graphic-data-protection-2.webp" alt="" />
          <div className='flex flex-row gap-3 mt-[18px]'>
          </div>

        </div>
      </div>
    </section>
  )
}