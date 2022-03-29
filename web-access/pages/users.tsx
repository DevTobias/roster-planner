import type { NextPage } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

import { firestore } from '@Lib/firebase';
import Title from '@Helpers/Title';
import Container from '@Layouts/Container';
import EditableTable from '@Modules/Table/Table';
import RegisterForm from '@Modules/RegisterForm';

export async function getServerSideProps() {
  const querySnapshot = await getDocs(collection(firestore, 'user'));
  const users = querySnapshot.docs.map((d) => ({
    key: d.id,
    ...d.data(),
  }));

  return {
    props: {
      users,
    },
  };
}

type User = {
  key: string;
  email: string;
  hours: string;
  position: string;
};

type IndexProps = {
  users: User[];
};

const Index: NextPage<IndexProps> = ({ users }) => {
  const cols = [
    {
      title: 'UID',
      dataIndex: 'key',
      width: '20%',
      editable: false,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '20%',
      editable: true,
    },
    {
      title: 'Stunden',
      dataIndex: 'hours',
      width: '20%',
      editable: true,
    },
    {
      title: 'Position',
      dataIndex: 'position',
      width: '20%',
      editable: true,
    },
  ];

  const updateUser = async (user: User) => {
    const { key, email, hours, position } = user;

    try {
      await updateDoc(doc(firestore, 'user', key), {
        email,
        position,
        hours,
      });
      toast.error('Mitarbeiterdaten konnten nicht gespeichert werden.');
    } catch (e) {
      toast.success('Mitarbeiterdaten erfolgreich aktualisiert.');
    }
  };

  return (
    <>
      <Title title="Nutzerverwaltung" />

      <Container>
        <main className="px-5 py-20 min-h-screenInner w-full space-y-7">
          <div>
            <h2 className="text-neutral-800 font-semibold text-header3m">
              Neuen Mitarbeiter hinzufügen
            </h2>
            <RegisterForm />
          </div>
          <div>
            <h2 className="text-neutral-800 font-semibold text-header3m">
              Mitarbeiterübersicht
            </h2>
            <EditableTable
              originData={users}
              columns={cols}
              updateCallback={updateUser}
            />
          </div>
        </main>
      </Container>
    </>
  );
};

export default Index;
