import React from 'react'
import styles from './styles.module.css'
import Heading from '../../components/ui/Heading'
import { Button } from '@headlessui/react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

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

export const TrustedByTeams = ({page}) => {
  const customerStoriesId = `btn-customer-stories-${page}-hero`
  return (
    <section
      className={`${styles.used_by} !m-0 !mx-auto !w-[100vw]  border !border-b-0 border-dashed border-signoz_slate-400 md:!w-[80vw]`}
    >
      <div className="section-container">
        <div className="mb-2 flex flex-col items-center text-center md:mb-12">
          <div className="text-sm font-semibold uppercase leading-5 tracking-[0.05em] text-signoz_vanilla-400">
            Trusted by the <span className="text-signoz_vanilla-100">best platform teams</span>
          </div>
        </div>
        <div className="mb-8 mt-8 grid grid-cols-2 place-content-center gap-8 pl-0 sm:grid-cols-4 md:mt-0 md:grid-cols-6 ">
          {COMPANIES.map((company, idx) => (
            <div key={`${idx}-${company.image}`} className="flex items-center justify-center">
              <img
                className="h-[20px] w-[60px] md:h-[40px] md:w-[120px]"
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
          <div className="mb-5 flex flex-col items-center text-center">
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
