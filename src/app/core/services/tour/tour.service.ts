import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { AuthService } from '../auth/auth.service';
import { TourType } from '@app/core/models/tour';
import {
  addDoc,
  collection,
  doc,
  docData,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  tours: TourType[] = [];

  constructor(
    private readonly fStore: StoreService,
    private readonly fAuth: AuthService
  ) {}

  getOneTour(id: string): Observable<TourType> {
    // return await getDoc(doc(this.fStore.db, 'tours', id)).then((res) => {
    //   return { id: id, ...res.data() } as TourType;
    // });

    return docData(doc(this.fStore.db, 'tours', id), {
      idField: 'id',
    }) as Observable<TourType>;
  }

  async getTours() {
    return (await getDocs(query(collection(this.fStore.db, 'tours'))).then(
      (res) => {
        const t: TourType[] = [];
        res.docs.forEach((doc) => {
          t.push({ id: doc.id, ...doc.data() } as TourType);
        });
        return t;
      }
    )) as TourType[];
  }

  async getToursFromOrg(id: string) {
    return (await getDocs(
      query(collection(this.fStore.db, 'tours'), where('orgId', '==', id))
    ).then((res) => {
      const t: TourType[] = [];
      res.docs.forEach((doc) => {
        t.push({ id: doc.id, ...doc.data() } as TourType);
      });
      return t;
    })) as TourType[];
  }

  async getMyTours() {
    return (await getDocs(
      query(
        collection(this.fStore.db, 'tours'),
        where('applied', 'array-contains', this.fAuth.userData()!.id)
      )
    ).then((res) => {
      const t: TourType[] = [];
      res.docs.forEach((doc) => {
        t.push({ id: doc.id, ...doc.data() } as TourType);
      });
      return t;
    })) as TourType[];
  }

  async applyTour(tour: TourType) {
    const applied = [...tour.applied, this.fAuth.userData()!.id];
    await updateDoc(doc(this.fStore.db, 'tours', tour.id), {
      applied,
    });
  }

  async sendMessage(tour: TourType, text: string) {
    const chat = [
      ...tour.chat,
      {
        senderId: this.fAuth.userData()!.id,
        senderName: this.fAuth.userData()!.fullname,
        when: Timestamp.fromDate(new Date()),
        text: text,
      },
    ];
    await updateDoc(doc(this.fStore.db, 'tours', tour.id), { chat });
  }
}
