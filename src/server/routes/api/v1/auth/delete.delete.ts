import {
  createError,
  defineEventHandler,
  readBody,
  setResponseStatus,
} from 'h3';
import { fb } from '../../../../../firebase';
import { fbAdmin } from '../../../../firebase-admin';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    await fbAdmin.admin.auth.deleteUser(body.uid);
    await fbAdmin.admin.db.collection(fb.tables.users).doc(body.uid).delete();

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
