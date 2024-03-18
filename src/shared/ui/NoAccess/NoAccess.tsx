import { Container, Title } from '@mantine/core';

const NoAccess = () => {
  return (
    <Container display="flex">
      <Title fs="normal" c="gray">
        У вас немає прав доступа до admin
      </Title>
    </Container>
  );
};

export default NoAccess;
