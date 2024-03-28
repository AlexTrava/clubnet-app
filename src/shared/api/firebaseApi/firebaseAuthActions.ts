import { RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup } from 'firebase/auth';

import { auth, db, githubProvider, googleProvider } from '@/shared/config/firebase/firebase';

export const setupRecaptcha = (phoneNumber: string) => {
  const recapthca = new RecaptchaVerifier(auth, 'sign-in-button', {
    size: 'invisible'
  });
  return signInWithPhoneNumber(auth, phoneNumber, recapthca);
};

export const getAuth = () => {
  const authRes = auth;
  return authRes;
};

export const getDb = () => {
  const dbRes = db;
  return dbRes;
};

export const convertUserField = (displayName: string) => {
  const currentUser = getAuth().currentUser;
  const currentUserInfo = {
    displayName: displayName,
    email: currentUser?.email,
    phoneNumber: currentUser?.phoneNumber,
    photoURL: currentUser?.photoURL,
    providerId: currentUser?.providerId,
    uid: currentUser?.uid
  };
  return currentUserInfo;
};

export const getGoogleAuth = () => {
  const auth = getAuth();
  return signInWithPopup(auth, googleProvider);
};

export const getGithubAuth = () => {
  const auth = getAuth();
  return signInWithPopup(auth, githubProvider);
};
