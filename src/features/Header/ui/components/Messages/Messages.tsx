import {
  ActionIcon,
  Avatar,
  Flex,
  Indicator,
  Menu,
  Stack,
  Text,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core';
import { IconMessageCircle } from '@tabler/icons-react';

import { ICON_SIZE, MESSAGES } from './data';

export default function Messages() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const messages = MESSAGES.map((m) => (
    <Menu.Item
      key={m.id}
      style={{
        borderBottom: `1px solid ${
          colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[3]
        }`
      }}>
      <Flex gap="sm" align="center">
        <Avatar
          src={null}
          alt={`${m.first_name} ${m.last_name}`}
          variant="filled"
          size="sm"
          color={theme.colors[theme.primaryColor][7]}>
          {Array.from(m.first_name)[0]}
          {Array.from(m.last_name)[0]}
        </Avatar>
        <Stack gap={1}>
          <Text fz="sm" fw={600}>
            {m.first_name} {m.last_name}
          </Text>
          <Text lineClamp={2} fz="xs" c="dimmed">
            {m.message}
          </Text>
        </Stack>
      </Flex>
    </Menu.Item>
  ));
  return (
    <Menu shadow="lg" width={320}>
      <Menu.Target>
        <Indicator processing size={10} offset={6}>
          <Tooltip label="Messages">
            <ActionIcon size="lg" title="Nessages">
              <IconMessageCircle size={ICON_SIZE} />
            </ActionIcon>
          </Tooltip>
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label tt="uppercase" ta="center" fw={600}>
          {MESSAGES.length} new notifications
        </Menu.Label>
        {messages}
        <Menu.Item tt="uppercase" ta="center" fw={600}>
          Show all messages
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
