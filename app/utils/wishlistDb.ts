import type { Product } from "../types/product";
import { db } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

const getWishlistCollectionRef = (userId: string) =>
  collection(db, "users", userId, "wishlist");

export async function addToWishlist(userId: string, product: Product) {
  const wishlistColRef = getWishlistCollectionRef(userId);
  // Use product.id as the document ID
  const productDocRef = doc(wishlistColRef, product.id);
  // Store only necessary product details for wishlist display
  await setDoc(productDocRef, {
    id: product.id,
    name: product.name,
    slug: product.slug,
    images: product.images,
    price: product.priceing.price,
    currency: product.priceing.currency,
    // Add more fields as needed
  });
}

export async function removeFromWishlist(userId: string, productId: string) {
  const wishlistColRef = getWishlistCollectionRef(userId);
  const productDocRef = doc(wishlistColRef, productId);
  await deleteDoc(productDocRef);
}

export async function getWishlistFromDb(userId: string): Promise<Product[]> {
  const wishlistColRef = getWishlistCollectionRef(userId);
  const snap = await getDocs(wishlistColRef);
  return snap.docs.map((doc) => doc.data() as Product);
}

// Optionally, a function to clear the wishlist
export async function clearWishlistDb(userId: string) {
  const wishlistColRef = getWishlistCollectionRef(userId);
  const snap = await getDocs(wishlistColRef);
  const deletions = snap.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deletions);
}
