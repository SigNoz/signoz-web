'use client'

import React, { useState } from 'react'

import FAQBody from '../../components/FAQPricing'
import styles from './styles.module.css'
import { TrustedByTeams } from '@/components/trusted-by'
import { CostComparison } from '@/components/cost-comparison'
import { DataProtection } from '@/components/data-protection'
import { TalkToExpert } from '@/components/talk-to-expert'
import { CommunityEdition } from '@/components/community-edition'
import { UserReview } from '@/components/user-review'
import { TrySigNozCTA } from '@/components/try-signoz-cta'
import Link from 'next/link'
import Divider from '@/components/ui/Divider'
import Heading from '@/components/ui/Heading'
import SubHeading from '@/components/ui/SubHeading'
import { Chevron, RightSVG } from '@/components/svgs/common'

function Pricing() {
  return (
    <div title="SigNoz Plans">
      {/* Plans */}
      <PricingPlans />
      {/* All Features */}
      <ExploreAllFeature />
      {/* Companies Logo */}
      <TrustedByTeams />
      {/* Cost Comparison Graph */}
      <CostComparison />
      {/* Data protection */}
      <DataProtection />
      {/* Talk To Expert */}
      <TalkToExpert />
      {/* More Options */}
      <CommunityEdition />
      {/* FAQ section */}
      {<FAQ />}
      {/* User Review */}
      <UserReview />
      {/* Give a Try CTA */}
      <TrySigNozCTA />
    </div>
  )
}

export default Pricing

function FAQ() {
  return (
    <section className={styles.faq}>
      <div className={`container ${styles.faqContainer}`}>
        <div className="row">
          <div className="col col--8 col--offset-2">
            <p className={`hero__subtitle margin--md ${styles.title}`}>FAQs</p>
            <div className="card-demo margin--md">
              <FAQBody />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const RightIcon = () => (
  <svg
    className="h-6 w-6 text-green-500"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    ></path>
  </svg>
)

const CrossIcon = () => {
  return (
    <svg
      className="h-5 w-5"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 8C0.5 12.1423 3.85775 15.5 8 15.5C12.1423 15.5 15.5 12.1423 15.5 8C15.5 3.85775 12.1423 0.5 8 0.5C3.85775 0.5 0.5 3.85775 0.5 8ZM10.4484 11.5L8 9.05156L5.55157 11.5L4.50002 10.4485L6.94846 8.00001L4.5 5.55155L5.55154 4.5L8 6.94846L10.4485 4.5L11.5 5.55155L9.05154 8.00001L11.5 10.4485L10.4484 11.5Z"
        fill="#FF5E7B"
      />
    </svg>
  )
}

const LoadingIcon = () => {
  return (
    <svg
      className="h-6 w-6 "
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="20"
      height="20"
      viewBox="0 0 100 100"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="#fff"
        strokeWidth="10"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
      ></circle>
    </svg>
  )
}

const PricingPlans = () => {
  const TRACES_AND_LOGS_PRICES = {
    15: 0.3,
    30: 0.4,
    90: 0.6,
    180: 0.8,
  }
  const METRICS_PRICES = {
    1: 0.1,
    3: 0.12,
    6: 0.15,
    13: 0.18,
  }
  const RETENTION_PERIOD = {
    TRACES_AND_LOGS: [
      { days: 15, price: 0.3 },
      { days: 30, price: 0.4 },
      { days: 90, price: 0.6 },
      { days: 180, price: 0.8 },
    ],
    METRICS: [
      { months: 1, price: 0.1 },
      { months: 3, price: 0.12 },
      { months: 6, price: 0.15 },
      { months: 13, price: 0.18 },
    ],
  }

  // Period
  const [tracesRetentionPeriod, setTracesRetentionPeriod] = useState(
    RETENTION_PERIOD.TRACES_AND_LOGS[0].days
  )
  const [logsRetentionPeriod, setLogsRetentionPeriod] = useState(
    RETENTION_PERIOD.TRACES_AND_LOGS[0].days
  )
  const [metricsRetentionPeriod, setMetricsRetentionPeriod] = useState(
    RETENTION_PERIOD.METRICS[0].months
  )

  const [tab, setTab] = useState('cloud')

  return (
    <section className={styles.pricing}>
      <div className={`container ${styles.pricingContainer}`}>
        <div className="my-5 flex justify-center">
          <div className="flex rounded-3xl">
            <nav
              className={`flex items-center space-x-2 rounded-3xl ${styles.pricingTabContainer}`}
            >
              <button
                type="button"
                className={`cursor-pointer rounded-3xl border-none px-4 py-2 text-xs text-white ${
                  tab === 'cloud'
                    ? "relative z-[2] bg-primary-400 before:absolute before:left-[0%] before:top-[0%] before:z-[-1] before:h-full before:w-full before:rounded-full before:bg-primary-400 before:opacity-50 before:blur-xl before:content-['']"
                    : 'bg-transparent'
                }`}
                onClick={() => setTab('cloud')}
              >
                SigNoz Cloud
              </button>
              <button
                type="button"
                className={`cursor-pointer rounded-3xl border-none px-4 py-2 text-xs text-white ${
                  tab === 'self-managed'
                    ? "relative z-[2] bg-primary-400 before:absolute before:left-[0%] before:top-[0%] before:z-[-1] before:h-full before:w-full before:rounded-full before:bg-primary-400 before:opacity-50 before:blur-xl before:content-['']"
                    : 'bg-transparent'
                }`}
                onClick={() => setTab('self-managed')}
              >
                Hosted in your infra
              </button>
            </nav>
          </div>
        </div>
        {tab === 'cloud' ? (
          <>
            {/* Cloud Plan */}
            <div className="mx-auto mb-5 flex max-w-4xl flex-col items-center text-center">
              <Heading type={1}>
                Transparent & Predictable Pricing for {tab === 'cloud' ? 'Cloud' : 'Self Managed'}
              </Heading>
              <SubHeading>
                Tired of unpredictable pricing and complex billing structure? Save up to{' '}
                <Link href="/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/">
                  <u className="mx-0 rounded px-0 py-0.5 text-primary-400">
                    80% on your Datadog bill
                  </u>
                </Link>{' '}
                with SigNoz. No user-based and host-based pricing.
              </SubHeading>
            </div>
            <div className="pricing-plans mx-auto grid grid-cols-1 justify-center gap-x-8 gap-y-10 md:max-w-md lg:max-w-6xl lg:grid-cols-2">
              <div className="pricing-card rounded-lg bg-white bg-opacity-5 px-4 py-5 md:px-8">
                <div>
                  <h3 className="font-heading text-2xl font-bold ">Teams</h3>
                  <p className="mb-4 text-base leading-relaxed text-gray-400">
                    For teams that need high-performing applications.
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="m-0">
                      Starts at just
                      <br />
                      <span className="text-xl text-primary-400">$199/Month*</span>
                    </p>
                    <div>
                      <Link
                        id="btn-pricing-signoz-cloud-1"
                        className={`button button--primary ${styles.pricingCtaBtn}`}
                        href={'/teams/'}
                      >
                        Get started - free
                      </Link>
                    </div>
                  </div>
                </div>
                <Divider isDashed />
                <div className="__card__body">
                  <div className={`${styles.pricingDetails} ${styles.packageDetailBlock}`}>
                    <h4 className={styles.packageDetailTitle}>Pricing</h4>
                    <div>
                      <span>Logs</span>
                      <span className="item-center flex flex-nowrap justify-center">
                        <span className="flex items-center justify-center gap-1">
                          <span className="text-primary-500">
                            ${TRACES_AND_LOGS_PRICES[logsRetentionPeriod]}
                          </span>{' '}
                          per GB ingested &mdash;&nbsp;
                        </span>
                        <select
                          className="t block w-[100px]  rounded-lg border p-0.5 text-xs text-signoz_ink-300 placeholder-gray-400 accent-primary-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
                          value={logsRetentionPeriod}
                          onChange={(e) => setLogsRetentionPeriod(Number(e.target.value))}
                        >
                          {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                            <option
                              key={`${option.days}-${idx}`}
                              value={option.days}
                              className="text-signoz_slate-300"
                            >{`${option.days} days`}</option>
                          ))}
                        </select>
                      </span>
                    </div>
                    <div>
                      <span>Traces</span>
                      <span className="item-center flex flex-nowrap justify-center">
                        <span className="flex items-center justify-center gap-1">
                          <span className="text-primary-500">
                            ${TRACES_AND_LOGS_PRICES[tracesRetentionPeriod]}
                          </span>{' '}
                          per GB ingested &mdash;&nbsp;
                        </span>
                        <select
                          className="block w-[100px] rounded-lg border p-0.5 text-xs text-signoz_ink-300 placeholder-gray-400 accent-primary-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
                          value={tracesRetentionPeriod}
                          onChange={(e) => setTracesRetentionPeriod(Number(e.target.value))}
                        >
                          {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                            <option
                              key={`${option.days}-${idx}`}
                              value={option.days}
                            >{`${option.days} days`}</option>
                          ))}
                        </select>
                      </span>
                    </div>
                    <div>
                      <span>Metrics</span>
                      <span className="item-center flex flex-nowrap justify-center">
                        <span className="flex items-center justify-center gap-1">
                          <span className="text-primary-500">
                            ${METRICS_PRICES[metricsRetentionPeriod]}
                          </span>{' '}
                          per mn samples &mdash;&nbsp;
                        </span>
                        <select
                          className="block w-[100px] rounded-lg border p-0.5 text-xs text-signoz_ink-300 placeholder-gray-400 accent-primary-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
                          value={metricsRetentionPeriod}
                          onChange={(e) => setMetricsRetentionPeriod(Number(e.target.value))}
                        >
                          {RETENTION_PERIOD.METRICS.map((option, idx) => (
                            <option
                              key={`${option.months}-${idx}`}
                              value={option.months}
                            >{`${option.months} ${
                              option.months === 1 ? 'month' : 'months'
                            }`}</option>
                          ))}
                        </select>
                      </span>
                    </div>
                    <br />
                    <div>
                      <span>
                        <li>Add as many users as you want. No user-based pricing</li>
                      </span>
                    </div>
                    <div>
                      <span>
                        {' '}
                        <li>No host-based pricing</li>
                      </span>
                    </div>
                    <br />

                    <div>
                      <span>
                        *$199 includes data usage. Monthly bill will be $199 till you ingest data
                        higher than what's covered in $199.
                      </span>
                    </div>
                  </div>
                  <Divider isDashed />
                  <p className={styles.retention}>
                    Default Retention: 15 days for Traces & Logs, 30 days for Metrics
                    <br />
                    <br />
                    <i>Reach out to us for higher retention period</i>
                  </p>
                  <Divider isDashed />
                  <div className={`${styles.support} ${styles.packageDetailBlock}`}>
                    <h4 className={styles.packageDetailTitle}>Support</h4>
                    <div>
                      <span>Community Slack</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Email</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Dedicated Slack Channel</span>
                      <span className="text-right">On spends above $999</span>
                    </div>
                  </div>
                  <Divider isDashed />
                  <div className={styles.packageDetailBlock}>
                    <h4 className={styles.packageDetailTitle}>Features</h4>
                    <ul className="list-icon-right">
                      <li>APM & Distributed Tracing</li>
                      <li>Log Management</li>
                      <li>Infrastructure Monitoring</li>
                      <li>Exceptions Monitoring</li>
                      <li>Alerts Management</li>
                      <li>SSO and SAML Support</li>
                      <li>Service Dependency Visualization</li>
                      <li>Run aggregates on ingested spans</li>
                      <li>Live Tail Logging</li>
                      <li>Unlimited Logs & Traces based Dashboards</li>
                      <li>Dashboard locking</li>
                      <li>Visualize very large traces (&gt;10K spans)</li>
                      <li>Data centers available in the US, EU & India</li>
                      <li>SOC2 Type 1 Compliant</li>
                    </ul>
                  </div>
                  {/* <Divider isDashed />
                  <div className={styles.packageDetailBlock}>
                    <h4 className={styles.packageDetailTitle}>Upcoming</h4>
                    <ul className="list-icon-right">
                      <li>AWS Cloudwatch Integration</li>
                    </ul>
                  </div> */}
                </div>
                <Divider isDashed />
                <div className={`__card__footer ${styles.card__footer}`}>
                  <Link
                    id="btn-pricing-signoz-cloud-2"
                    className={`button button--primary ${styles.pricingCtaBtn}`}
                    href={'/teams/'}
                  >
                    Get started - free
                  </Link>
                  <div>
                    <br></br>
                  </div>
                </div>
              </div>
              <div className="pricing-card rounded-lg bg-white bg-opacity-5 px-4 py-5 md:px-8">
                <div>
                  <h3 className="font-heading text-2xl font-bold ">Enterprise Cloud</h3>
                  <p className="mb-4 text-base leading-relaxed text-gray-400">
                    For at-scale orgs with advanced security, compliance and support needs.
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="m-0">Flexible Pricing for scale and long term commitments</p>

                    <div>
                      <Link
                        id="btn-pricing-signoz-enterprise-1"
                        className={`button button--primary ${styles.pricingCtaBtn}`}
                        href={'/enterprise-cloud/'}
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
                <Divider isDashed />
                <div className="__card__body">
                  <div className={`${styles.pricingDetails} ${styles.packageDetailBlock}`}>
                    <h4 className={styles.packageDetailTitle}>Pricing</h4>
                    <div></div>
                    <div>
                      <span>Custom Pricing</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Custom Retention</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                  </div>
                  <Divider isDashed />
                  {/* <div
                    className={`${styles.deploymentOptions} ${styles.packageDetailBlock}`}
                  >
                    <h4 className={styles.packageDetailTitle}>
                      Deployment Options
                    </h4>
                    <div>
                      <span>SaaS</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Managed by SigNoz in your cloud</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                  </div>
                  <Divider isDashed /> */}
                  <div className={`${styles.support} ${styles.packageDetailBlock}`}>
                    <h4 className={styles.packageDetailTitle}>Support</h4>
                    <div>
                      <span>Email</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Dedicated Slack Channel</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Team Training</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Dashboard Configuration Support</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Instrumentation Support</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>SLA w/ downtime developer pairing</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                  </div>
                  <Divider isDashed />
                  <div className={styles.packageDetailBlock}>
                    <h4 className={styles.packageDetailTitle}>Features</h4>
                    {/* <p className={styles.featureBlur}>
                      Includes all features in Team
                    </p> */}
                    <ul className="list-icon-right">
                      <li>Includes all features in Teams plan</li>
                      <li>Custom integration for metrics and logs</li>
                      <li>AWS Private Link</li>
                      <li>VPC Peering</li>
                      {/* <li>Security tightening for on-prem installation</li>
                  <li>Monitor Health of SigNoz</li> */}
                      <li>Query API Keys (access data from anywhere)</li>
                    </ul>
                  </div>
                  <Divider isDashed />
                  <div className={styles.packageDetailBlock}>
                    <h4 className={styles.packageDetailTitle}>Upcoming</h4>
                    <ul className="list-icon-right">
                      <li>Finer RBAC with custom roles</li>
                      <li>Audit Logs</li>
                      <li>Custom retention for different sources of logs</li>
                      <li>Multi-tenancy</li>
                    </ul>
                  </div>
                </div>
                <Divider isDashed />
                <div className={`__card__footer ${styles.card__footer}`}>
                  <Link
                    id="btn-pricing-signoz-enterprise-2"
                    className={`button button--primary ${styles.pricingCtaBtn}`}
                    href={'/enterprise-cloud/'}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Self Managed Plan */}

            <div className="mx-auto mb-5 flex max-w-4xl flex-col items-center text-center">
              <Heading type={1}>Run SigNoz within your infrastructure</Heading>
              <SubHeading>
                Get started with Community Edition and upgrade for enterprise-ready features or get
                it managed by SigNoz in your cloud (BYOC)
              </SubHeading>
            </div>

            <div className="pricing-plans mx-auto grid grid-cols-1 justify-center gap-x-8 gap-y-10 md:max-w-md lg:max-w-6xl lg:grid-cols-2">
              <div className="pricing-card rounded-lg bg-white bg-opacity-5 px-4 py-5 md:px-8">
                <div>
                  <h3 className="font-heading text-2xl font-bold ">Community Edition</h3>
                  <p className="mb-4 text-base leading-relaxed text-gray-400">Free to Self Host</p>
                  <div className="flex items-center justify-between">
                    <p className="m-0">Install in your infra</p>
                    <div>
                      <Link
                        id="btn-pricing-signoz-cloud-1"
                        className={`button button--primary ${styles.pricingCtaBtn}`}
                        href={'/docs/install/'}
                      >
                        Documentation
                      </Link>
                    </div>
                  </div>
                </div>
                <Divider isDashed />
                <div className="__card__body">
                  <div className={`${styles.support} ${styles.packageDetailBlock}`}>
                    <h4 className={styles.packageDetailTitle}>Support</h4>
                    <div>
                      <span>Community Slack</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                  </div>
                  <Divider isDashed />
                  <div className={styles.packageDetailBlock}>
                    <h4 className={styles.packageDetailTitle}>Features</h4>
                    <ul className="list-icon-right">
                      <li>APM & Distributed Tracing</li>
                      <li>Log Management</li>
                      <li>Infrastructure Monitoring</li>
                      <li>Exceptions Monitoring</li>
                      <li>Alerts Management</li>
                      <li>Service Dependency Visualization</li>
                    </ul>
                  </div>
                </div>
                <Divider isDashed />
                <div className={`__card__footer ${styles.card__footer}`}>
                  <Link
                    id="btn-pricing-signoz-cloud-2"
                    className={`button button--primary ${styles.pricingCtaBtn}`}
                    href={'/docs/install/'}
                  >
                    Documentation
                  </Link>
                </div>
              </div>
              <div className="pricing-card rounded-lg bg-white bg-opacity-5 px-4 py-5 md:px-8">
                <div>
                  <h3 className="font-heading text-2xl font-bold ">Enterprise Edition</h3>
                  <p className="mb-4 text-base leading-relaxed text-gray-400">
                    For at-scale orgs who want to host SigNoz in their own infra.
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="m-0">
                      Custom Pricing for scale
                      <br />
                      <span>(starts at $2500/month)</span>
                    </p>

                    <div>
                      <Link
                        id="btn-pricing-signoz-enterprise-1"
                        className={`button button--primary ${styles.pricingCtaBtn}`}
                        href={'/enterprise/'}
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                  <p className="mb-4 text-base leading-relaxed text-gray-400"></p>
                </div>
                <Divider isDashed />
                <div className="__card__body">
                  {/* <div
                    className={`${styles.pricingDetails} ${styles.packageDetailBlock}`}
                  >
                    <h4 className={styles.packageDetailTitle}>Pricing</h4>
                    <div></div>
                    <div>
                      <span>Custom Pricing</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                  </div>
                  <Divider isDashed /> */}
                  <div className={`${styles.deploymentOptions} ${styles.packageDetailBlock}`}>
                    <h4 className={styles.packageDetailTitle}>Deployment Options</h4>
                    <div>
                      <span>Self Host with support contract by SigNoz team </span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Managed by SigNoz in your cloud</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                  </div>
                  <Divider isDashed />
                  <div className={`${styles.support} ${styles.packageDetailBlock}`}>
                    <h4 className={styles.packageDetailTitle}>Support</h4>
                    <div>
                      <span>Email</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Dedicated Slack Channel</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Team Training</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Dashboard Configuration Support</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Instrumentation Support</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>SLA w/ downtime developer pairing</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                  </div>
                  <Divider isDashed />
                  <div className={styles.packageDetailBlock}>
                    <h4 className={styles.packageDetailTitle}>Features</h4>
                    <p className={styles.featureBlur}>Includes all features in community edition</p>
                    <ul className="list-icon-right">
                      <li>SSO and SAML Support</li>
                      <li>Dashboard locking</li>
                      <li>Visualize very large traces (&gt;10K spans)</li>
                      <li>Run aggregates on ingested spans</li>
                      <li>Security tightening for on-prem installation</li>
                      <li>Monitor Health of SigNoz</li>
                      <li>Query API Keys (access data from anywhere)</li>
                    </ul>
                  </div>
                  <Divider isDashed />
                  <div className={styles.packageDetailBlock}>
                    <h4 className={styles.packageDetailTitle}>Upcoming</h4>
                    <ul className="list-icon-right">
                      <li>Finer RBAC with custom roles</li>
                      <li>Audit Logs</li>
                      <li>Custom retention for different sources of logs</li>
                      <li>Multi-tenancy</li>
                    </ul>
                  </div>
                </div>
                <Divider isDashed />
                <div className={`__card__footer ${styles.card__footer}`}>
                  <Link
                    id="btn-pricing-signoz-enterprise-2"
                    className={`button button--primary ${styles.pricingCtaBtn}`}
                    href={'/enterprise/'}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

const ExploreAllFeature = () => {
  const [isOpened, setIsOpened] = useState(false)

  const ALL_FEATURES_DATA = {
    HEADER: [
      { heading: '', desc: '' },
      { heading: 'Community Edition', desc: '' },
      { heading: 'Teams', desc: 'Cloud Only' },
      {
        heading: 'Enterprise',
        desc: 'Cloud or Self Hosted or Managed by SigNoz in your Cloud',
      },
    ],
    ROWS: [
      {
        section: 'APM & Distributed Tracing',
        features: [
          {
            feature: 'Out of Box APM metrics',
            inCommunity: <RightIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'Filtering and creating dashboards based on traces data',
            inCommunity: <RightIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'Creating alerts based on traces data',
            inCommunity: <RightIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'Unlimited dashboards & alerts based on traces',
            inCommunity: <RightIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'Advanced visualization for very large traces (>10K spans)',
            inCommunity: (
              <div className="flex flex-col items-center justify-center">
                <CrossIcon />
                {/* <small>(Limited to 5 dashboard panels & alerts)</small> */}
              </div>
            ),
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
        ],
      },
      {
        section: 'Log Management',
        features: [
          {
            feature: 'Parsing logs via pipeline',
            inCommunity: <RightIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'Create direct filters from JSON logs',
            inCommunity: <RightIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'Saved Views for logs',
            inCommunity: <RightIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'Live tail Logging',
            inCommunity: <RightIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'Unlimited dashboards & alerts based on logs',
            inCommunity: <RightIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
        ],
      },
      {
        section: 'Infrastructure Monitoring',
        features: [
          {
            feature: 'Out of the box dashboards for hostmetrics',
            inCommunity: <RightIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'Kubernetes Monitoring',
            inCommunity: <RightIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'Container Monitoring',
            inCommunity: <RightIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'Unlimited dashboards & alerts based on metrics',
            inCommunity: <RightIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
        ],
      },
      {
        section: 'Exceptions Monitoring',
        features: [
          {
            feature: 'Separate view of exceptions based on Trace data',
            inCommunity: <RightIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
        ],
      },
      {
        section: 'Alerts Management',
        features: [
          {
            feature: 'Create alerts directly from dashboards',
            inCommunity: <RightIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'Support for Slack, Pagerduty, OpsGenie & webhooks as alert channel',
            inCommunity: <RightIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'MS Teams as alert channel',
            inCommunity: <CrossIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
        ],
      },
      {
        section: 'Data Pipelines',
        sectionNote:
          '* Reach out to us on our support email for pricing details and getting access. ',
        features: [
          {
            feature: 'Support for Cold Storage for long term data archival',
            inCommunity: <RightIcon />,
            inTeams: (
              <div className="flex flex-col items-center justify-center">
                <LoadingIcon />
                <small>Early Access*</small>
              </div>
            ),
            inEnterprise: (
              <div className="flex flex-col items-center justify-center">
                <LoadingIcon />
                <small>Early Access*</small>
              </div>
            ),
          },
        ],
      },

      {
        section: 'Service Dependency Visualization',
        features: [
          {
            feature: 'Overview of your application graph with health indication',
            inCommunity: <RightIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
        ],
      },
      {
        section: 'Configuration',
        features: [
          {
            feature: 'SSO/SAML support',
            inCommunity: <CrossIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'Dashboard Locking & Access control',
            inCommunity: <CrossIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'Security tightening for on-premise installation',
            inCommunity: <CrossIcon />,
            inTeams: <CrossIcon />,
            inEnterprise: <div>Only in Enterprise Self Managed</div>,
          },
          {
            feature: 'Monitor Health of SigNoz',
            inCommunity: <CrossIcon />,
            inTeams: <CrossIcon />,
            inEnterprise: <div>Only in Enterprise Self Managed</div>,
          },
          {
            feature: 'Finer RBAC with custom roles',
            inCommunity: <CrossIcon />,
            inTeams: <CrossIcon />,
            inEnterprise: (
              <div className="flex flex-col items-center justify-center">
                <LoadingIcon />
                <small>Coming soon</small>
              </div>
            ),
          },
          {
            feature: 'AWS Private link',
            inCommunity: <CrossIcon />,
            inTeams: <CrossIcon />,
            inEnterprise: <div>Only in Enterprise Cloud</div>,
          },
          {
            feature: 'Alert as code',
            inCommunity: <CrossIcon />,
            inTeams: <CrossIcon />,
            inEnterprise: (
              <div className="flex flex-col items-center justify-center">
                <LoadingIcon />
                <small>Coming soon</small>
              </div>
            ),
          },
          {
            feature: 'Audit Logs',
            inCommunity: <CrossIcon />,
            inTeams: <CrossIcon />,
            inEnterprise: (
              <div className="flex flex-col items-center justify-center">
                <LoadingIcon />
                <small>Coming soon</small>
              </div>
            ),
          },
          {
            feature: 'Custom retention for different sources of logs',
            inCommunity: <CrossIcon />,
            inTeams: <CrossIcon />,
            inEnterprise: (
              <div className="flex flex-col items-center justify-center">
                <LoadingIcon />
                <small>Coming soon</small>
              </div>
            ),
          },
          {
            feature: 'Access Data in SigNoz from Anywhere (via API keys)',
            inCommunity: <CrossIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'Multi-tenancy',
            inCommunity: <CrossIcon />,
            inTeams: <CrossIcon />,
            inEnterprise: (
              <div className="flex flex-col items-center justify-center">
                <LoadingIcon />
                <small>Coming soon</small>
              </div>
            ),
          },
        ],
      },
      {
        section: 'Support',
        features: [
          {
            feature: 'Community Support on Slack',
            inCommunity: <RightIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'Email Support',
            inCommunity: <CrossIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'In product chat support',
            inCommunity: <CrossIcon />,
            inTeams: <RightIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'Dedicated Slack Channel',
            inCommunity: <CrossIcon />,
            inTeams: <CrossIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'Team Training',
            inCommunity: <CrossIcon />,
            inTeams: <CrossIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'Dashboard Configuration Support',
            inCommunity: <CrossIcon />,
            inTeams: <CrossIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'Instrumentation Support',
            inCommunity: <CrossIcon />,
            inTeams: <CrossIcon />,
            inEnterprise: <RightIcon />,
          },
          {
            feature: 'SLA w/ downtime developer pairing',
            inCommunity: <CrossIcon />,
            inTeams: <CrossIcon />,
            inEnterprise: <RightIcon />,
          },
        ],
      },
    ],
  }

  const Opacity = {
    1: 'bg-opacity-10',
    2: 'bg-opacity-20',
    3: 'bg-opacity-30',
  }

  return (
    <div className="relative mx-5 md:mx-0">
      <div className="mx-auto overflow-hidden md:max-w-md lg:max-w-6xl">
        <div className="mt-10">
          <div className="ovc-table_top-wrapper grid grid-cols-3 gap-1 md:grid-cols-4">
            {ALL_FEATURES_DATA.HEADER.map((h, idx) => {
              return (
                <div
                  key={idx}
                  className={`${
                    idx !== 0 ? `rounded-lg bg-primary-400 p-2 ${Opacity[idx]}` : 'hidden md:block'
                  }`}
                >
                  <h2 className="m-0 text-lg md:text-2xl">{h.heading}</h2>
                  <p className="text-base md:text-lg">{h.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {!isOpened ? (
        <div
          className={`wavy-line relative mb-16
        after:absolute after:top-[50%] after:h-0 after:w-full after:bg-transparent after:content-['']
      `}
        >
          <div
            className={`relative my-5 flex justify-center
            before:absolute before:left-0 before:top-[0] before:h-20 before:w-full before:bg-[#1b1b1d] before:opacity-100 before:blur-xl before:backdrop-blur-xl before:content-['']  
            after:absolute after:bottom-[0] after:left-0 after:h-20 after:w-full after:bg-[#1b1b1d] after:opacity-100 after:blur-xl after:backdrop-blur-xl after:content-['']
          `}
          >
            <div className="z-[1] flex rounded-3xl">
              <nav className={`flex space-x-2 rounded-3xl ${styles.pricingTabContainer}`}>
                <button
                  type="button"
                  className={`button button--primary text-md flex flex-nowrap items-center gap-2 font-bold`}
                  onClick={() => setIsOpened(!isOpened)}
                >
                  <span>Explore all Features</span>
                  <span className={isOpened ? 'rotate-180' : ''}>
                    <Chevron />
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      ) : null}
      {isOpened ? (
        <div className="mx-auto md:max-w-md lg:max-w-6xl">
          <div className="mb-10">
            <div className="container-medium">
              <div className="table-body">
                {ALL_FEATURES_DATA.ROWS.map((row, i) => {
                  return (
                    <div
                      key={i}
                      className={`${false ? `rounded-lg bg-primary-400 bg-opacity-[${i}]` : ''}`}
                    >
                      <Divider />
                      <h3 className="m-0 my-1 p-2 text-center md:text-left">{row.section}</h3>
                      <Divider />
                      <div className=" grid grid-cols-1 gap-1">
                        {row.features.map((r, idx) => {
                          return (
                            <div key={idx}>
                              <div className="grid grid-cols-3 gap-1 md:grid-cols-4">
                                <h4 className="col-span-3 m-0 p-2 text-center font-medium md:col-span-1 md:text-left">
                                  {r.feature}
                                </h4>
                                <div
                                  className={`flex items-center justify-center rounded-lg bg-primary-400 bg-opacity-10 p-2 text-center`}
                                >
                                  {r.inCommunity}
                                </div>
                                <div
                                  className={`flex items-center justify-center rounded-lg bg-primary-400 bg-opacity-20 p-2 text-center`}
                                >
                                  {r.inTeams}
                                </div>
                                <div
                                  className={`flex items-center justify-center rounded-lg bg-primary-400 bg-opacity-30 p-2 text-center`}
                                >
                                  {r.inEnterprise}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                        {row?.sectionNote ? (
                          <div className="m-0 my-2 text-sm italic">{row.sectionNote}</div>
                        ) : null}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="mx-auto overflow-hidden md:max-w-md lg:max-w-6xl">
        {isOpened ? (
          <div
            className={`relative my-5 flex justify-center
            before:absolute before:left-0 before:top-[0] before:h-40 before:w-screen before:rounded-full before:bg-[#1b1b1d] before:opacity-50 before:blur-3xl before:backdrop-blur-xl before:content-['']  
            after:absolute after:bottom-[0] after:left-0 after:h-40 after:w-screen after:rounded-full after:bg-[#1b1b1d] after:opacity-50 after:blur-3xl after:backdrop-blur-xl after:content-['']
          `}
          >
            <div className="z-[1] flex rounded-3xl">
              <nav className={`flex space-x-2 rounded-3xl ${styles.pricingTabContainer}`}>
                <button
                  type="button"
                  className={`button button--primary text-md flex flex-nowrap items-center gap-2 font-bold`}
                  onClick={() => setIsOpened(!isOpened)}
                >
                  <span>Explore all Features</span>
                  <span className={isOpened ? 'rotate-180' : ''}>
                    <Chevron />
                  </span>
                </button>
              </nav>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
