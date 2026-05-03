import { DocumentReference, getDoc } from '@angular/fire/firestore';

export async function decodeRef<T>(docRef: DocumentReference): Promise<T> {
  return (await getDoc(docRef)).data() as T;
}

export async function decodeRefs<T>(
  docRefs: DocumentReference[],
): Promise<T[]> {
  let result: T[] = [];
  docRefs.map(async (docRef) => {
    result.push((await getDoc(docRef)).data() as T);
  });
  return result;
}
