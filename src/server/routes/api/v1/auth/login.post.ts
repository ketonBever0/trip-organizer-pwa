import { createError, defineEventHandler, H3Event, readBody } from 'h3';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { fb } from '../../../../../firebase';
import { FirebaseError } from 'firebase/app';
import { doc, getDoc } from 'firebase/firestore';

export default defineEventHandler(async (e: H3Event) => {
  const body = await readBody(e);
  let res = {
    token: '',
    user: {},
  };

  const error = await signInWithEmailAndPassword(
    fb.auth,
    body.email,
    body.password,
  )
    .then(async (creds) => {
      res.token = await creds.user.getIdToken();
      res.user = await fb.admin.db
        .collection(fb.tables.users)
        .doc(creds.user.uid)
        .get().then(data => data.data() as {});
    })
    .catch((e: FirebaseError) => {
      return e.code;
    });

  if (error) {
    let errMsg;
    let status;

    switch (error) {
      case 'auth/invalid-email':
        errMsg = 'Invalid e-mail!';
        status = 400;
        break;
      case 'auth/wrong-password':
        errMsg = 'Wrong password!';
        status = 400;
        break;
      case 'auth/invalid-credential':
        errMsg = 'Wrong e-mail or password!';
        status = 400;
        break;
      default:
        errMsg = 'Unknown error!';
        status = 500;
        break;
    }
    throw createError({
      statusCode: status,
      message: errMsg,
    });
  }

  return res;
});
