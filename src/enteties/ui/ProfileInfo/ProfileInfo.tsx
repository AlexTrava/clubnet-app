import { Avatar, Button, Flex, Group, Stack, Tabs, Text } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconPhoneCall, IconTrash, IconUpload } from '@tabler/icons-react';
import { type FC } from 'react';

import { getUser } from '@/enteties/session/User/model/selectors';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';

import { ModalSettings } from '../ModalSettings';
import styles from './styles.module.css';

export const ProfileInfo: FC = () => {
  const { hovered, ref } = useHover();
  const user = useAppSelector(getUser);
  console.log(user, 'user');

  return (
    <Stack>
      <Group gap="xl" align="center">
        <Flex ref={ref} pos={'relative'}>
          <Avatar src={user.photoURL} size={128} />
          {hovered && (
            <Flex
              pos={'absolute'}
              display={'flex'}
              bg={'rgba(0, 0, 0, 0.6)'}
              w={'100%'}
              h={'100%'}
              align={'center'}
              justify={'center'}
              bgr={'100%'}
              className={styles.flexContainer}>
              <Flex gap="8px" align={'center'} justify={'center'}>
                <Button size="xs">
                  <IconUpload width="16" height="16" />
                </Button>
                <Button size="xs">
                  <IconTrash width="16" height="16" />
                </Button>
              </Flex>
            </Flex>
          )}
        </Flex>
        <Stack gap="xs">
          <Text>{user.displayName}</Text>
          <Text size="32px" fw={700}>
            {user.nickName ? user.nickName : ''}
          </Text>
          <Text>{user.email ? user.email : ''}</Text>
          {user.phoneNumber ? (
            <Group>
              <IconPhoneCall color="#868E96" width="20" height="20" />
              <Text c="gray.6">{user.phoneNumber ? user.phoneNumber : ''}</Text>
            </Group>
          ) : (
            ''
          )}
        </Stack>
        <ModalSettings />
      </Group>
      <Tabs radius="xs" defaultValue="commands">
        <Tabs.List>
          <Tabs.Tab value="commands">Команды</Tabs.Tab>
          <Tabs.Tab value="friends">Друзья</Tabs.Tab>
          <Tabs.Tab value="statistics">Статистика</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="commands">Команды</Tabs.Panel>

        <Tabs.Panel value="friends">Друзья</Tabs.Panel>

        <Tabs.Panel value="statistics">Статистика</Tabs.Panel>
      </Tabs>
    </Stack>
  );
};
