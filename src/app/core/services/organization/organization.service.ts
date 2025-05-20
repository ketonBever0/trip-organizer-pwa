import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { AuthService } from '../auth/auth.service';
import {
  addDoc,
  collection,
  FirestoreError,
  getDoc,
  getDocs,
  query,
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
}
