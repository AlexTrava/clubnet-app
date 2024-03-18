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
import { IconBell } from '@tabler/icons-react';

import { ICON_SIZE, NOTIFICATIONS } from './data';

export default function Notification() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const notifications = NOTIFICATIONS.slice(0, 3).map((n) => (
    <Menu.Item
      key={n.id}
      style={{
        borderBottom: `1px solid ${
          colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[3]
        }`
      }}>
      <Flex gap="sm" align="center">
        <Avatar src={n.icon} alt={n.title} variant="filled" size="sm" />
        <Stack gap={1}>
          <Text fz="sm" fw={600}>
            {n.title}
          </Text>
          <Text lineClamp={2} fz="xs" c="dimmed">
            {n.message}
          </Text>
        </Stack>
      </Flex>
    </Menu.Item>
  ));
  return (
    <Menu shadow="lg" width={320}>
      <Menu.Target>
        <Indicator processing size={10} offset={6}>
          <Tooltip label="Notifications">
            <ActionIcon size="lg" title="Notifications">
              <IconBell size={ICON_SIZE} />
            </ActionIcon>
          </Tooltip>
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label tt="uppercase" ta="center" fw={600}>
          {NOTIFICATIONS.length} new notifications
        </Menu.Label>
        {notifications}
        <Menu.Item tt="uppercase" ta="center" fw={600}>
          Show all notifications
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
