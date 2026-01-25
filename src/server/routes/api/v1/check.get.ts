import { defineEventHandler, H3Event } from 'h3';
import { fb } from '../../../../firebase';

export default defineEventHandler(async (e: H3Event) => {
  return {
    appName: fb.db.type,
    user: fb.auth.settings
  }
});