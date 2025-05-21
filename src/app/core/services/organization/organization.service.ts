import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { AuthService } from '../auth/auth.service';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FirestoreError,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { OrgUnitType } from '@app/core/models/organization';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  orgUnits: OrgUnitType[] = [];
  myOrgUnits: OrgUnitType[] = [];

  constructor(
    private readonly fStore: StoreService,
    private readonly fAuth: AuthService
  ) {}

  async getOrganizationsWhereMe() {
    this.myOrgUnits = [];
    await getDocs(
      query(
        collection(this.fStore.db, 'organizations'),
        where('members', 'array-contains', this.fAuth.userData()!.id)
      )
    ).then((res) => {
      res.forEach((doc) => {
        this.myOrgUnits.push({
          id: doc.id,
          ...doc.data(),
        } as OrgUnitType);
      });
    });
  }

  async getPublicOrganizations() {
    this.orgUnits = [];
    await getDocs(
      query(
        collection(this.fStore.db, 'organizations'),
        where('isPrivate', '==', false)
      )
    ).then((res) => {
      res.forEach((doc) => {
        this.orgUnits.push({
          id: doc.id,
          ...doc.data(),
        } as OrgUnitType);
      });
    });
  }

  async getOneOrganization(id: string) {
    return getDoc(doc(this.fStore.db, 'organizations', id)).then((res) => {
      return {
        ...res.data(),
        id: id,
      } as OrgUnitType;
    });
  }

  async addOrganization(form: FormGroup) {
    return await addDoc(collection(this.fStore.db, 'organizations'), {
      ...form.value,
      members: [this.fAuth.userData()!.id],
    })
      .then(() => null)
      .catch((e: FirestoreError) => {
        console.error(e.code);
        return 'Error!';
      });
  }

  async updateVisibility(id: string, value: boolean) {
    await updateDoc(doc(this.fStore.db, 'organizations', id), {
      isPrivate: value,
    });
  }

  async deleteOrgUnit(id: string) {
    await deleteDoc(doc(this.fStore.db, 'organizations', id));
  }
}
