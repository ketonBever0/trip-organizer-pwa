import { defineEventHandler, H3Event, readBody } from 'h3';
import fb from '@src/firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';


export default defineEventHandler(async (e: H3Event) => {
  const body = await readBody(e);
  
  signInWithEmailAndPassword(fb.auth, body.email, body.password)
    .then(creds => {
      const user = creds.user;
    })

});