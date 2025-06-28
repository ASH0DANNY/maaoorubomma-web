import { db } from "../firebase";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

const WISHLIST_COLLECTION = "wishlists";

export async function saveWishlistToDb(userId: string, ids: string[]) {
  const ref = doc(collection(db, WISHLIST_COLLECTION), userId);
  await setDoc(ref, { ids });
}

export async function getWishlistFromDb(userId: string): Promise<string[]> {
  const ref = doc(collection(db, WISHLIST_COLLECTION), userId);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return (snap.data().ids || []) as string[];
  }
  return [];
}
