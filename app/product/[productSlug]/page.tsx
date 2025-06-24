import ProductDisplayPage from '@/app/components/pages/ProductDisplayPage';
import { getProductsByCategory } from '@/app/data/categoryProducts';
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { productSlug: string } }) {
  const allProducts = getProductsByCategory('');
  const product = allProducts.find((p) => p.slug === params.productSlug);

  if (!product) {
    notFound()
  }

  return <ProductDisplayPage product={product} />
}
