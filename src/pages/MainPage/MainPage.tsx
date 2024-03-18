import '@mantine/core/styles.css';

import { Center, Container } from '@mantine/core';
import { type FC, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { RoutersPaths } from '@/shared/types/enums';

import styles from './Main.module.css';

const MainPage: FC = () => {
  const user = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(RoutersPaths.LOGIN);
    }
  }, [navigate, user]);

  return (
    <Container>
      <Center className={styles.wrapper}>
        <h1>MainPage</h1>
      </Center>
    </Container>
  );
};

export default MainPage;
