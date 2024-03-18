import { Button, Center, Flex } from '@mantine/core';

import { FormAddClient, TableSelection } from './ui';
import { data } from './ui/mocData';

export default function AdminPage() {
  return (
    <Flex pt={50} direction="column">
      <FormAddClient userData={data} />
      <TableSelection />
      <Center mt={20}>
        <Button>Показать еще</Button>
      </Center>
    </Flex>
  );
}
