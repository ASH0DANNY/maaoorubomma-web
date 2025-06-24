import CategoryPage from "@/app/components/pages/CategoryPage"
import { getProductsByCategory } from "@/app/data/categoryProducts"

export default async function Page({ params }: { params: { categoryId: string } }) {
  const products = getProductsByCategory(params.categoryId)
  return <CategoryPage products={products} />
}
