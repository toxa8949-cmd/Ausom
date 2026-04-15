import Hero from '@/components/sections/Hero'
import CatalogTabs from '@/components/sections/CatalogTabs'
import { StatsBar, Features, Press, Newsletter } from '@/components/sections/Sections'
import Categories from '@/components/sections/Categories'
import CompareCTA from '@/components/sections/CompareCTA'
import BlogPreview from '@/components/sections/BlogPreview'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <CatalogTabs />
      <Categories />
      <Features />
      <Press />
      <CompareCTA />
      <BlogPreview />
      <Newsletter />
    </>
  )
}
