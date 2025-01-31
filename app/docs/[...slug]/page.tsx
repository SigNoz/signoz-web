import 'css/prism.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { allDocs } from 'contentlayer/generated'
import type { Doc } from 'contentlayer/generated'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import React from 'react'
import DocsPrevNext from '../../../components/DocsPrevNext/DocsPrevNext'
import PageFeedback from '../../../components/PageFeedback/PageFeedback'
import { notFound } from 'next/navigation'
import TrySigNozFloatingCard from '@/components/TrySigNozFloatingCard/TrySigNozFloatingCard'
import TableOfContents from '../../../components/DocsTOC/DocsTOC'

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const post = allDocs.find((p) => p.slug === slug)

  return {
    title: post?.title,
    description: post?.description,
    openGraph: {
      title: post?.title,
      description: post?.description,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      url: './',
    },
    twitter: {
      card: 'summary_large_image',
      title: post?.title,
    },
  }
}

export const generateStaticParams = async () => {
  const paths = allDocs.map((p) => ({ slug: p.slug?.split('/') }))

  return paths
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  const post = allDocs.find((p) => p.slug === slug) as Doc

  if (!post) {
    notFound()
  }

  const mainContent = coreContent(post)
  const toc = post?.toc || []
  const { title, hide_table_of_contents } = mainContent

  return (
    <>
      <div className="doc">
        <div className="doc-content">
          <h2 className="mt-2 text-3xl">{title}</h2>
          <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc || []} />
          <PageFeedback />
          <DocsPrevNext />
        </div>

        <TableOfContents toc={toc} hideTableOfContents={hide_table_of_contents || false} />
        <TrySigNozFloatingCard />
      </div>
    </>
  )
}
