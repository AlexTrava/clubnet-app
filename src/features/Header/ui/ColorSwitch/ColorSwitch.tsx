/* eslint-disable no-nested-ternary */
import { ActionIcon, Group, Menu, Tooltip, useMantineColorScheme } from '@mantine/core';
import { IconCircleHalf2, IconMoonStars, IconSunHigh } from '@tabler/icons-react';
import type { FC } from 'react';

export const ColorSwitch: FC = () => {
  const ICON_SIZE = 20;
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <Group>
      <Menu shadow="lg" width={200}>
        <Menu.Target>
          <Tooltip label="Switch color modes">
            <ActionIcon variant="light">
              {colorScheme === 'auto' ? (
                <IconCircleHalf2 size={ICON_SIZE} />
              ) : colorScheme === 'dark' ? (
                <IconMoonStars size={ICON_SIZE} />
              ) : (
                <IconSunHigh size={ICON_SIZE} />
              )}
            </ActionIcon>
          </Tooltip>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label tt="uppercase" ta="center" fw={600}>
            Select color modes
          </Menu.Label>
          <Menu.Item
            leftSection={<IconSunHigh size={16} />}
            onClick={() => setColorScheme('light')}>
            Light
          </Menu.Item>
          <Menu.Item
            leftSection={<IconMoonStars size={16} />}
            onClick={() => setColorScheme('dark')}>
            Dark
          </Menu.Item>
          <Menu.Item
            leftSection={<IconCircleHalf2 size={16} />}
            onClick={() => setColorScheme('auto')}>
            Use System Colors
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
