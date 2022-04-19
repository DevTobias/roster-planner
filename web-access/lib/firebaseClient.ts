import toast from 'react-hot-toast';
import Router from 'next/router';
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
  index: number;
  key: string;
  email: string;
  hours: string;
  position: string;
  firstName: string;
  lastName: string;
};

export const EmptyUser = {
  index: 0,
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

  return querySnapshot.docs
    .map((d) => {
      const data = d.data();

      if (data.firstName !== 'Master') {
        return {
          key: d.id,
          ...data,
        };
      }
    })
    .filter((element) => element !== undefined);
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
  let { email } = user;
  const { hours, position, firstName, lastName } = user;

  // If no email was provided, create one from the names
  if (!email) {
    email = emailFromName(firstName, lastName);
  }

  try {
    // Register the user in firebase auth. It uses a api end point, so that
    // the register function does not override current user auth context.
    const res = await fetch('/api/createUser', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        password: passwordFromName(firstName, lastName),
      }),
    });

    const { uid } = await res.json();

    // Save the created user with its uid to firestore with the rest
    // of the data
    await setDoc(doc(firestore, 'user', uid), {
      hours,
      position,
      email,
      firstName,
      lastName,
    });

    toast.success('Mitarbeiter erfolgreich registriert.');
    return uid;
  } catch (e) {
    toast.error('Mitarbeiter konnte nicht registriert werden.');
    return '';
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
  const { key } = user;

  try {
    await updateDoc(doc(firestore, 'user', key), user);

    toast.success('Mitarbeiterdaten erfolgreich aktualisiert.');
    return key;
  } catch (e) {
    toast.error('Mitarbeiterdaten konnten nicht gespeichert werden.');
    return '';
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

/**
 * Signs in the user with given credentials. After successful sign in,
 * he gets redirected to the provided url.
 *
 * @param credentials The credentials of the user.
 * @param redirect    The url where the user should get redirected after sign in.
 */
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

export const getRosterData = async (weekId: string) => {
  const rosterData = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const users: User[] = ((await getUsers()) as any).sort(
    (a: User, b: User) => a.index - b.index
  );

  for (const user of users) {
    const { firstName, lastName, key, position, hours } = user;

    const querySnapshot = await getDocs(
      collection(firestore, `rosters/${weekId}/${user.key}`)
    );

    const details =
      firstName + ' ' + lastName + '#' + position + ', ' + hours + 'h';

    if (querySnapshot.docs.length === 0) {
      rosterData.push({
        key: key + '-times',
        details,
      });
      rosterData.push({
        key: key + '-notes',
        details,
      });
      continue;
    }

    const [meta, notes, times] = querySnapshot.docs.map((d) => {
      return d.data();
    });

    rosterData.push({
      key: key + '-times',
      details,
      balanceOld: meta.balanceOld,
      vacationOld: meta.vacationOld,
      monday: times.monday,
      tuesday: times.tuesday,
      wednesday: times.wednesday,
      thursday: times.thursday,
      friday: times.friday,
      balanceNew: meta.balance,
      vacationNew: meta.vacation,
    });

    rosterData.push({
      key: key + '-notes',
      details,
      balanceOld: '',
      vacationOld: '',
      monday: notes.monday,
      tuesday: notes.tuesday,
      wednesday: notes.wednesday,
      thursday: notes.thursday,
      friday: notes.friday,
      balanceNew: '',
      vacationNew: '',
    });
  }

  return rosterData;
};
