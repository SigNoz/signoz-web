'use client'

import React, { useState } from 'react'
import Blogs from '../blog/Blogs'
import Comparisons from '../comparisons/Comparisons'
import Guides from './Guides'
import OpenTelemetry from '../opentelemetry/OpenTelemetry'
import Tabs from '../Shared/Tabs'

export default function GuidesHome() {
  const [activeTab, setActiveTab] = useState('guides-tab')

  return (
    <div className="container mx-auto py-4">
      <Tabs activeTab={activeTab} />

      <div className="tab-content">
        {activeTab === 'blog-tab' && <Blogs />}

        {activeTab === 'comparisons-tab' && <Comparisons />}

        {activeTab === 'guides-tab' && <Guides />}

        {activeTab === 'openTelemetry-tab' && <OpenTelemetry />}
      </div>
    </div>
  )
}
