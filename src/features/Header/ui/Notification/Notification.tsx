import { ActionIcon, Indicator, Menu, Tooltip } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';

import { NOTIFICATIONS } from './data';

export const Notification = () => {
  return (
    <Menu shadow="lg" width={320}>
      <Menu.Target>
        <Indicator processing size={10} offset={6}>
          <Tooltip label="Notifications">
            <ActionIcon size="lg" radius={6} bg="transparent" title="Notifications">
              <IconBell size={25} color={'black'} />
            </ActionIcon>
          </Tooltip>
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label tt="uppercase" ta="center" fw={600}>
          {NOTIFICATIONS.length} new notifications
        </Menu.Label>
        <Menu.Item tt="uppercase" ta="center" fw={600}>
          Show all notifications
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
