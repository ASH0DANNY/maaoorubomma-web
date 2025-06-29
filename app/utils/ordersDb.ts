import { db } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  addDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { UserOrder } from "../types/user";

export async function saveOrderToDb(userId: string, order: UserOrder) {
  const ordersCollectionRef = collection(db, "users", userId, "orders");
  // Add a timestamp if not present
  const orderWithTimestamp = {
    ...order,
    createdAt: order.createdAt || Timestamp.now(),
  };
  const docRef = await addDoc(ordersCollectionRef, orderWithTimestamp);
  return { ...orderWithTimestamp, id: docRef.id };
}

export async function getOrdersFromDb(userId: string): Promise<UserOrder[]> {
  const ordersCollectionRef = collection(db, "users", userId, "orders");
  const q = query(ordersCollectionRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      ...(data as UserOrder),
      id: docSnap.id,
    };
  });
}
