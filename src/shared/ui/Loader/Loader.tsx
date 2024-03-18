import { Flex, Loader } from '@mantine/core';

export const Spiner = () => {
  return (
    <Flex justify="center" align="center">
      <Loader
        styles={{ root: { color: 'black', margin: 'auto' } }}
        type="oval"
        color="blue"
        size="xl"
      />
    </Flex>
  );
};
