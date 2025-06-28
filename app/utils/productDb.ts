import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import type { Product } from "../types/product";

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (!ids.length) return [];
  // Firestore 'in' queries are limited to 10 items per query
  const chunks = [];
  for (let i = 0; i < ids.length; i += 10) {
    chunks.push(ids.slice(i, i + 10));
  }
  let products: Product[] = [];
  for (const chunk of chunks) {
    const q = query(collection(db, "products"), where("id", "in", chunk));
    const snap = await getDocs(q);
    products = products.concat(
      snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product))
    );
  }
  return products;
}
