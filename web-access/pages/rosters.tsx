import type { NextPage } from 'next';
import moment from 'moment';

import Title from '@Helpers/Title';
import Container from '@Layouts/Container';
import RosterTemplate, { RosterEntry } from '@Templates/RosterTemplate';
import { getRosterData } from '@Lib/firebaseClient';

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
  const rosterData = await getRosterData(
    `kw${moment().week()}_${moment().year()}`
  );

  return {
    props: { rosterData },
  };
}

export default Roster;
