import type { NextPage } from 'next';

import Title from '@Helpers/Title';
import Container from '@Layouts/Container';

const Index: NextPage = () => {
  return (
    <>
      <Title title="Master Dienstplan" />

      <Container>
        <h1 className="text-header3 text-center">Web access</h1>
      </Container>
    </>
  );
};

export default Index;
