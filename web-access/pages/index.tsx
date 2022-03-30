import type { NextPage } from 'next';

import Title from '@Helpers/Title';
import Container from '@Layouts/Container';
import HomeTemplate from '@Templates/HomeTemplate';

const Index: NextPage = () => {
  return (
    <>
      <Title title="Dienstplan" />

      <Container>
        <HomeTemplate />
      </Container>
    </>
  );
};

export default Index;
