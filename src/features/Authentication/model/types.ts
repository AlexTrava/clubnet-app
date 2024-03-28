export type { UserInfo } from 'firebase/auth';
export type { ConfirmationResult } from 'firebase/auth';
export type { DocumentData } from 'firebase/firestore';
export type { ChangeEvent, FC } from 'react';

export type FormFields = {
  phoneNumber: string;
  smsCode: string;
  nickName: string;
};

export type UserForDB = {
  email?: Nullable<string>;
  displayName?: Nullable<string>;
  photoURL?: Nullable<string>;
  dateOfRegistration?: Nullable<string>;
  nickName?: Nullable<string>;
  phoneNumber?: Nullable<string>;
  id?: Nullable<string>;
};
