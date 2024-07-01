import { allOpentelemetries } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import BlogPostCard from '../Shared/BlogPostCard'
import SearchInput from '../Shared/Search'
import React from 'react'
import { filterData } from 'app/utils/common'
import { Frown } from 'lucide-react'

interface OpenTelemetryPageHeaderProps {
  onSearch: (e) => void
}

const OpenTelemetryPageHeader: React.FC<OpenTelemetryPageHeaderProps> = ({ onSearch }) => {
  return (
    <section className="flex max-w-[697px] flex-col leading-[143%] mb-[72px]">
      <h2 className="self-start text-sm font-medium uppercase tracking-wider text-signoz_sakura-500 dark:text-signoz_sakura-400 mb-0">
        resources
      </h2>
      <h1 className="mt-3 my-0 self-start text-3xl font-semibold text-indigo-500 dark:text-indigo-200">
        OpenTelemetry
      </h1>
      <p className="my-4 w-full text-lg leading-8 tracking-normal text-gray-700 dark:text-stone-300 max-md:max-w-full">
        Articles on OpenTelemetry concepts, implementation, and its use cases.
      </p>

      <SearchInput placeholder={'Search for a blog...'} onSearch={onSearch} />
    </section>
  )
}

export default function OpenTelemetry() {
  const posts = allCoreContent(sortPosts(allOpentelemetries))
  const primaryFeaturedBlogs = posts.slice(0, 2)
  const secondaryFeaturedBlogs = posts.slice(0)

  const [blogs, setBlogs] = React.useState(secondaryFeaturedBlogs)
  const [searchValue, setSearchValue] = React.useState('')

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    const filteredPosts = filterData(posts, e.target.value)
    setBlogs(filteredPosts)
  }

  return (
    <div className="comparisons">
      <OpenTelemetryPageHeader onSearch={handleSearch} />

      {searchValue && searchValue.length == 0 && (
        <div className="mt-5 w-full max-md:max-w-full">
          <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {primaryFeaturedBlogs.map((featuredBlog) => {
              return <BlogPostCard blog={featuredBlog} />
            })}
          </div>
        </div>
      )}

      {blogs && Array.isArray(blogs) && blogs.length <= 0 && (
        <div className="no-blogs my-8 flex items-center gap-4 font-mono font-bold">
          <Frown size={16} /> No Articles found
        </div>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((post) => {
          return <BlogPostCard blog={post} />
        })}
      </div>
    </div>
  )
}
