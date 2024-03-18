import { Center, Text, Title } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';

import styles from './UserPage.module.css';

function UserPage() {
  const { id } = useParams();
  return (
    <>
      <Center className={styles.wrapper}>
        <Title>UserPage</Title>
        <Text>{id}</Text>
      </Center>
      <Center>
        <Link to="/">Back to main</Link>
      </Center>
    </>
  );
}

export default UserPage;
