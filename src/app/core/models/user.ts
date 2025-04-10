export type UserType = {
  id: string;
  email: string;
  fullname: string;
  mobile: string;
  createdAt: string;
  updatedAt: string;
  role: 'user' | 'moderator' | 'admin';
};
