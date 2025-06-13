// import { SearchPage } from '@/components/pages/SearchPage'
// import { getProductsByCategory } from '@/data/categoryProducts'

import SearchPage from "../components/pages/SearchPage"

export default async function Page({
  searchParams,
}: {
  searchParams?: { q: string }
}) {
  const query = searchParams?.q || ''
  const products = getProductsByCategory('') // Get all products for search
  return <SearchPage query={query} products={products} />
}
