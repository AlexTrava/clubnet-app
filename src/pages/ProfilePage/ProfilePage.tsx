import { Center, Text, Title } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';

import styles from './ProfilePage.module.css';

function ProfilePage() {
  const { id } = useParams();
  return (
    <>
      <Center className={styles.wrapper}>
        <Title>ProfilePage</Title>
        <Text>{id}</Text>
      </Center>
      <Center>
        <Link to="/admin">Back to admin</Link>
      </Center>
    </>
  );
}

export default ProfilePage;
