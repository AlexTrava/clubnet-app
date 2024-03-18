import { Avatar, Box, Group, rem, Stack, Text, UnstyledButton } from '@mantine/core';
import { IconChevronRight, IconCoin, IconLogin } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import styles from './UserInfo.module.css';

export const UserInfo = () => {
  const { t } = useTranslation();

  const user = {
    id: '12'
  };
  const navigate = useNavigate();

  const hendlelogOut = () => {
    navigate('/');
  };
  const hendlelogin = () => {
    navigate('/admin');
  };
  const userDetail = () => {
    navigate(`profile/${user.id}`);
  };

  return (
    <Stack justify="center" gap={0}>
      {user ? (
        <UnstyledButton onClick={userDetail} className={styles.user}>
          <Group>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
              radius="xl"
              size={28}
            />
            <Box style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {t('header.name')}
              </Text>
              <Group>
                <IconCoin color="#f1a708" />
                <Text c="dimmed" size="md">
                  410
                </Text>
              </Group>
            </Box>
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
