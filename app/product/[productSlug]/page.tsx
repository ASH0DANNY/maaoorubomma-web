import ProductDisplayPage from '@/components/pages/ProductDisplayPage'
import { getProductsByCategory } from '@/data/categoryProducts'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { productSlug: string } }) {
  const allProducts = getProductsByCategory('');
  const product = allProducts.find((p) => p.slug === params.productSlug);
  
  if (!product) {
    notFound()
  }

  return <ProductDisplayPage product={product} />
}
