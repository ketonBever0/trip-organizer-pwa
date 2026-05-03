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
import { decodeRef } from '@utilities/functions/DocRefFunctions';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class OrgService {
  constructor() {}

  private readonly db = inject(Firestore);
  private readonly authService = inject(AuthService);

  orgs: Organization[] = [];
  readonly collName = 'organizations';

  async getOrgs() {
    const docs = await getDocs(collection(this.db, this.collName));
    docs.forEach(async (doc) => {
      const data = doc.data();
      const newData = {
        id: doc.id,
        ...data,
      } as Organization;
      newData.owner = await decodeRef<User>(data['ownerRef']);
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

    const docs = (
      await getDocs(query(collection(this.db, this.collName), queryConstraint))
    ).docs;

    let result = await Promise.all(
      docs.map(async (org) => {
        const data = org.data();
        return {
          id: org.id,
          ...data,
          // ownerRef: await decodeRef<User>(data['ownerRef']),
        } as Organization;
      }),
    );

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
