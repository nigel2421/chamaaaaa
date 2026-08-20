import { 
  collection, doc, setDoc, getDocs, onSnapshot, writeBatch, getDoc 
} from "firebase/firestore";
import { db, testFirebaseConnection } from "./firebase";
import { 
  ChamaTenant, Member, Contribution, Loan, Agenda, 
  AttendanceMeeting, Expenditure, ChatMessage, Candidate, Penalty 
} from "../types";

export { testFirebaseConnection };

// Collection references helper
export const collections = {
  tenants: "tenants",
  members: "members",
  contributions: "contributions",
  loans: "loans",
  penalties: "penalties",
  agendas: "agendas",
  meetings: "meetings",
  expenditures: "expenditures",
  chats: "chats",
  candidates: "candidates"
};

// Generic single document save
export async function saveDocument(collectionName: string, id: string, data: any) {
  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, data, { merge: true });
  } catch (err) {
    console.warn(`Error saving ${collectionName}/${id} to Firebase:`, err);
  }
}

// Bulk seed initial data to Firestore if collection is empty
export async function seedInitialDataIfEmpty(
  collectionName: string, 
  initialItems: any[], 
  idField: string = "id"
) {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    if (snapshot.empty && initialItems.length > 0) {
      console.log(`Seeding ${initialItems.length} records to Firestore collection: ${collectionName}`);
      const batch = writeBatch(db);
      initialItems.forEach(item => {
        const id = item[idField] || String(Date.now());
        const ref = doc(db, collectionName, id);
        batch.set(ref, item);
      });
      await batch.commit();
    }
  } catch (err) {
    console.warn(`Firestore seeding error for ${collectionName}:`, err);
  }
}

// Fetch all documents in a collection
export async function fetchCollection<T>(collectionName: string): Promise<T[]> {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map(d => ({ ...d.data() } as T));
  } catch (err) {
    console.warn(`Firestore fetch error for ${collectionName}:`, err);
    return [];
  }
}
