import CategoryPage from '@/components/pages/CategoryPage'
import { getProductsByCategory } from '@/data/categoryProducts'

export default async function Page({ params }: { params: { categoryId: string; subCategoryId?: string } }) {
  const products = getProductsByCategory(params.categoryId, params.subCategoryId)
  return <CategoryPage products={products} />
}
