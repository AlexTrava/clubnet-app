import { Avatar, Group, rem, Stack, Text, UnstyledButton } from '@mantine/core';
import { IconChevronRight, IconCoin, IconLogin } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import styles from './UserInfo.module.css';

export const UserInfo = () => {
  const user = {
    id: 'kjdfvkjndfnk'
  };
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const user = localStorage.getItem('user');
  //   if (user) {
  //     setUser(JSON.parse(user));
  //   }
  // }, []);

  const hendlelogOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  };
  const hendlelogin = () => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: 'kjdfvkjndfnk'
      })
    );
    navigate('/admin');
  };

  return (
    <Stack justify="center" gap={0}>
      {user ? (
        <UnstyledButton className={styles.user}>
          <Group>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
              radius="xl"
              size={28}
            />
            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                Harriette
              </Text>
              <Group>
                <IconCoin color="#f1a708" />
                <Text c="dimmed" size="md">
                  410
                </Text>
              </Group>
            </div>
            <IconChevronRight
              onClick={hendlelogOut}
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      ) : (
        <IconLogin className={styles.link} onClick={hendlelogin} />
      )}
    </Stack>
  );
};
