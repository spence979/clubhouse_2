import { Injectable, inject } from "@angular/core";
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  private firestore: Firestore = inject(Firestore);

  // Get all items from a collection
  getEvents(collectionName: string): Observable<any[]> {
    const collectionRef = collection(
      this.firestore,
      collectionName,
      "companyId",
      "eventId"
    );
    return collectionData(collectionRef);
  }

  // Get a single item by ID
  getItem(collectionName: string, id: string): Observable<any> {
    const documentRef = doc(this.firestore, `${collectionName}/${id}`);
    return docData(documentRef);
  }

  // Add a new item
  addEvent(collectionName: string, data: any) {
    const utcNow = new Date();
    data.createdDate = utcNow.toISOString();

    const collectionRef = collection(
      this.firestore,
      collectionName,
      "companyId",
      "eventId"
    );
    return addDoc(collectionRef, data);
  }

  addEventAction(collectionName: string, eventId: string, data: any) {
    const collectionRef = collection(
      this.firestore,
      collectionName,
      "companyId",
      "eventId"
    );
    return addDoc(collectionRef, data);
  }

  // Update an item
  updateItem(collectionName: string, id: string, data: any) {
    const documentRef = doc(this.firestore, `${collectionName}/${id}`);
    return updateDoc(documentRef, data);
  }

  // Delete an item
  deleteItem(collectionName: string, id: string) {
    const documentRef = doc(this.firestore, `${collectionName}/${id}`);
    return deleteDoc(documentRef);
  }
}
