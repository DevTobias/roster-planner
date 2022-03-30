import { auth } from '@Lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  // Register the user in firebase auth
  const { user: created } = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  res.status(200).json({ uid: created.uid });
}
