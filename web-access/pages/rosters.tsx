import type { NextPage } from 'next';

import Title from '@Helpers/Title';
import Container from '@Layouts/Container';
import RosterTemplate, { RosterEntry } from '@Templates/RosterTemplate';
import { firestore } from '@Lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getUsers, User } from '@Lib/firebaseClient';

type IndexProps = {
  rosterData: RosterEntry[];
};

const Roster: NextPage<IndexProps> = ({ rosterData }) => {
  return (
    <>
      <Title title="Dienstplan" />

      <Container>
        <RosterTemplate rosterData={rosterData} />
      </Container>
    </>
  );
};

export async function getServerSideProps() {
  const rosterData = [];

  const users: User[] = (await getUsers()) as any;

  for (const user of users) {
    const { firstName, lastName, key, position, hours } = user;

    const querySnapshot = await getDocs(
      collection(firestore, `rosters/kw11_22/${user.key}`)
    );

    if (querySnapshot.docs.length === 0) {
      rosterData.push({
        key: key + 'times',
        details: firstName + ' ' + lastName,
      });
      rosterData.push({
        key: key + 'notes',
        details: position + ', ' + hours + 'h',
      });
      continue;
    }

    const [meta, notes, times] = querySnapshot.docs.map((d) => {
      return d.data();
    });

    rosterData.push({
      key: key + 'times',
      details: firstName + ' ' + lastName,
      balanceOld: '-0.3',
      vacationOld: '30',
      monday: times.monday,
      tuesday: times.tuesday,
      wednesday: times.wednesday,
      thursday: times.thursday,
      friday: times.friday,
      balanceNew: meta.balance,
      vacationNew: meta.vacation,
    });

    rosterData.push({
      key: key + 'notes',
      details: position + ', ' + hours + 'h',
      balanceOld: '-0.3',
      vacationOld: '30',
      monday: notes.monday,
      tuesday: notes.tuesday,
      wednesday: notes.wednesday,
      thursday: notes.thursday,
      friday: notes.friday,
      balanceNew: meta.balance,
      vacationNew: meta.vacation,
    });
  }

  return {
    props: { rosterData },
  };
}

export default Roster;
