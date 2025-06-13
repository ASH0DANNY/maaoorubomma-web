import CategoryPage from '@/components/pages/CategoryPage'
import { getProductsByCategory } from '@/data/categoryProducts'

export default async function Page({ params }: { params: { categoryId: string } }) {
  const products = getProductsByCategory(params.categoryId)
  return <CategoryPage products={products} />
}
