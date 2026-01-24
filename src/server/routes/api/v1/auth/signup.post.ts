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
    const creds = await createUserWithEmailAndPassword(
      fb.auth,
      body.email,
      body.password,
    );

    await fb.admin.db.collection(fb.tables.users).doc(creds.user.uid).create({
      email: body.email,
      name: body.name,
      nick: body.nick,
      pictureUrl: '',
    });

    setResponseStatus(event, 201);
    return {
      message: 'Successfully signed up!',
    };
  } catch (err) {
    const e = err as FirebaseError;

    let status = 500;
    let message = 'Unknown error!';

    if (e.code === 'auth/email-already-in-use') {
      status = 409;
      message = 'E-mail in use!';
    }

    throw createError({
      statusCode: status,
      message,
    });
  }
});
