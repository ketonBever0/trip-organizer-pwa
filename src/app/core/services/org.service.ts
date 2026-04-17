import { inject, Injectable } from '@angular/core';
import { Organization } from '@models/organization.model';
import { AuthService } from './auth.service';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  or,
  query,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class OrgService {
  constructor(private readonly db: Firestore) {}

  private readonly authService = inject(AuthService);

  orgs: Organization[] = [];
  readonly collName = 'organizations';

  async getOrgs() {
    const docs = await getDocs(collection(this.db, this.collName));
    docs.forEach((doc) => {
      this.orgs.push({ id: doc.id, ...doc.data() } as Organization);
    });
  }

  async getWhereIamMember(role: 'guest' | 'member' | 'admin' | 'any' = 'any') {
    const userRef = this.authService.getUserRef();

    const queryConstraint = (() => {
      switch (role) {
        case 'guest': {
          return or(where('guestRefs', 'array-contains', userRef));
        }
        case 'member': {
          return or(where('memberRefs', 'array-contains', userRef));
        }
        case 'admin': {
          return or(where('adminRefs', 'array-contains', userRef));
        }
        default: {
          return or(
            where('ownerRef', '==', userRef),
            where('adminRefs', 'array-contains', userRef),
            where('memberRefs', 'array-contains', userRef),
            where('guestRefs', 'array-contains', userRef),
          );
        }
      }
    })();

    const docs = await getDocs(
      query(collection(this.db, this.collName), queryConstraint),
    );

    let result: Organization[] = [];
    docs.forEach((org) => {
      result.push({ id: org.id, ...org.data() } as Organization);
    });

    return result;
  }

  async createOrg(
    name: string,
    type: string,
    description: string,
  ): Promise<Organization> {
    try {
      const orgDoc = {
        name,
        type,
        description,
        ownerRef: this.authService.getUserRef(),
        adminRefs: [],
        memberRefs: [],
        guestRefs: [],
      };

      const created = await addDoc(collection(this.db, this.collName), orgDoc);

      const newDoc = await getDoc(doc(this.db, this.collName, created.id));

      return {
        id: newDoc.id,
        ...newDoc.data(),
      } as Organization;
    } catch (_) {
      throw 'Error';
    }
  }

  updateOrg() {}

  deleteOrg() {}
}
