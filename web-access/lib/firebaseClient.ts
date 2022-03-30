import toast from 'react-hot-toast';
import Router from 'next/router';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import {
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  getDocs,
  collection,
} from 'firebase/firestore';

import { auth, firestore } from '@Lib/firebase';
import { emailFromName, passwordFromName } from '@Utils/strings';

export type Credentials = {
  username: string;
  password: string;
};

export type User = {
  key: string;
  email: string;
  hours: string;
  position: string;
  firstName: string;
  lastName: string;
};

export const EmptyUser = {
  key: '-1',
  email: '',
  hours: '',
  position: '',
  firstName: '',
  lastName: '',
};

/**
 * Get all the users from the user table.
 *
 * @returns An array of users.
 */
export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(firestore, 'user'));

  return querySnapshot.docs.map((d) => ({
    key: d.id,
    ...d.data(),
  }));
};

/**
 * Deletes the user with the corresponding uid from firestore. It also
 * runs a serverless function, which deletes the users auth profile.
 *
 * @param uid The uid of the user.
 * @returns   True if the user got deled, false instead.
 */
export const deleteUser = async (uid: string) => {
  try {
    await deleteDoc(doc(firestore, 'user', uid));
    toast.success('Mitarbeiter erfolgreich entfernt.');
    return true;
  } catch (e) {
    toast.error('Mitarbeiter konnte nicht entfernt werden.');
    return false;
  }
};

/**
 * Creates an auth user and saves all its data corresponding
 * to firestore.
 *
 * @param user The user which should get persisted.
 * @returns     True if the user got created, false instead.
 */
export const createUser = async (user: User) => {
  const { email, hours, position, firstName, lastName } = user;

  try {
    // Register the user in firebase auth
    const { user: created } = await createUserWithEmailAndPassword(
      auth,
      email,
      passwordFromName(firstName, lastName)
    );

    // Save the created user with its uid to firestore with the rest
    // of the data
    await setDoc(doc(firestore, 'user', created.uid), {
      hours,
      position,
      email,
      firstName,
      lastName,
    });

    toast.success('Mitarbeiter erfolgreich registriert.');
    return true;
  } catch (e) {
    toast.error('Mitarbeiter konnte nicht registriert werden.');
    return false;
  }
};

/**
 * Updates the user data of an already persisted user in
 * firestore.
 *
 * @param user The user which should get updated.
 * @returns    True if the user got updated, false instead.
 */
export const updateUser = async (user: User) => {
  const { key, email, hours, position } = user;

  try {
    await updateDoc(doc(firestore, 'user', key), {
      email,
      position,
      hours,
    });

    toast.success('Mitarbeiterdaten erfolgreich aktualisiert.');
    return true;
  } catch (e) {
    toast.error('Mitarbeiterdaten konnten nicht gespeichert werden.');
    return false;
  }
};

/**
 * If the user key is -1, it creates a new user. If the key is an already
 * created uid, it updates the user data.
 *
 * @param user The user which should get updated or created.
 * @returns    True if the user got updated or created, false instead.
 */
export const persistUser = async (user: User) => {
  if (user.key === '-1') {
    return createUser(user);
  }

  return updateUser(user);
};

export const signIn = async (
  { username, password }: Credentials,
  redirect: string
) => {
  try {
    const [firstName, lastName] = username.split(' ');
    await signInWithEmailAndPassword(
      auth,
      emailFromName(firstName, lastName),
      password
    );
    Router.push(redirect);
  } catch (e) {
    toast.error('Kein Nutzer mit diesen Daten gefunden.');
  }
};
