import {
  createError,
  defineEventHandler,
  readBody,
  setResponseStatus,
} from 'h3';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { fb } from '../../../../../firebase';
import { FirebaseError } from 'firebase/app';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    await fb.admin.auth.deleteUser(body.uid);
    await fb.admin.db.collection(fb.tables.users).doc(body.uid).delete();

    setResponseStatus(event, 200);
    return {
      message: 'Successfully deleted!',
    };
  } catch (err: any) {

    throw createError({
      statusCode: 500,
      message: err,
    });
  }
});
