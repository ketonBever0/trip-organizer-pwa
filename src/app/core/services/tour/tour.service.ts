import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { AuthService } from '../auth/auth.service';
import { TourType } from '@app/core/models/tour';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  Timestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { AllChatsType } from '@app/core/models/tour-chat';
import { authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  tours: TourType[] = [];

  constructor(
    private readonly fStore: StoreService,
    private readonly fAuth: AuthService
  ) {}

  async createTour(id: string, form: FormGroup, activities: string[]) {
    await addDoc(collection(this.fStore.db, 'tours'), {
      orgId: id,
      chat: [],
      applied: [],
      destination: form.get('destination')?.value,
      startDate: Timestamp.fromDate(form.get('startDate')?.value as Date),
      endDate: Timestamp.fromDate(form.get('endDate')?.value as Date),
      budget: form.get('budget')?.value,
      limit: form.get('limit')?.value,
      transportation: form.get('transportation')?.value,
      activities: activities,
    });
  }

  async updateTour(id: string, form: FormGroup, activities: string[]) {
    await updateDoc(doc(this.fStore.db, 'tours', id), {
      destination: form.get('destination')?.value,
      startDate: Timestamp.fromDate(form.get('startDate')?.value as Date),
      endDate: Timestamp.fromDate(form.get('endDate')?.value as Date),
      budget: form.get('budget')?.value,
      limit: form.get('limit')?.value,
      transportation: form.get('transportation')?.value,
      activities: activities,
    });
  }

  async deleteTour(id: string) {
    await deleteDoc(doc(this.fStore.db, 'tours', id));
  }

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

  getAllChats(): Observable<AllChatsType[]> {
    return authState(this.fAuth.fAuth).pipe(
      switchMap((user) => {
        if (!user) return of([]);

        return collectionData(
          query(
            collection(this.fStore.db, 'tours'),
            where('applied', 'array-contains', user.uid)
          ),
          { idField: 'id' }
        ).pipe(
          map((docs) => {
            // console.log(docs);
            return docs.map((doc) => ({
              id: doc['id'],
              name: doc['name'],
              lastChat:
                doc['chat'] && doc['chat'].length > 0
                  ? doc['chat'][doc['chat'].length - 1]
                  : null,
            }));
          }),
          catchError((e) => {
            // console.log(e);
            return of([]);
          })
        );
      })
    );
  }

  getTourChat(id: string): Observable<TourType> {
    return authState(this.fAuth.fAuth).pipe(
      switchMap((user) => {
        if (!user) return of(null as unknown as TourType);
        const data = docData(doc(this.fStore.db, 'tours', id), {
          idField: 'id',
        }) as Observable<TourType>;
        // console.log(data);
        return data;
      }),
      catchError(() => of(null as unknown as TourType))
    );
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
