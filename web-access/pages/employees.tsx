import type { NextPage } from 'next';

import Title from '@Helpers/Title';
import Container from '@Layouts/Container';
import { User, getUsers } from '@Lib/firebaseClient';
import EmployeeOverviewTemplate from '@Templates/EmployeeOverviewTemplate';

type IndexProps = {
  users: User[];
};

const Employees: NextPage<IndexProps> = ({ users }) => {
  return (
    <>
      <Title title="Mitarbeiterübersicht" />

      <Container>
        <EmployeeOverviewTemplate users={users} />
      </Container>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      users: await getUsers(),
    },
  };
}

export default Employees;
