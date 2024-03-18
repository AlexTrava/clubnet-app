import type { ConfirmationResult } from 'firebase/auth';

import type { Status } from './enums';

export type StateAuth = {
  status: Status;
  captchaFetch: ConfirmationResult;
};

export type User = {
  phoneNumber: string;
  verificationId: string;
};

export type LanguagePickerProps = {
  label: string;
  image: string;
};
export type MessagesData = {
  id: string;
  first_name?: string;
  last_name?: string;
  message: string;
  title?: string;
  icon?: string;
};

export type Users = {
  id: string;
  nickName: string;
  avatar: string;
  name: string;
  balans: string;
  phone: string;
  rule: string;
  email: string;
};
