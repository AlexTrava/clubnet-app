import { Burger, Group } from '@mantine/core';

import classes from './Header.module.css';
import {
  ColorSwitch,
  HeaderTitle,
  LanguagePicker,
  Messages,
  Notification,
  Search,
  UserInfo
} from './ui';

export type HeaderProps = {
  navbarExpanded: boolean;
  toggleNavbar(): void;
};

export function Header() {
  return (
    <Group className={classes.root}>
      <Group gap="xs" pl={40} pb={5} pt={5}>
        <Burger aria-label="Show menu" hiddenFrom="sm" size="sm" />
        <HeaderTitle />
      </Group>
      <Group gap="xs" justify="space-between">
        <Search />
        <Messages />
        <Notification />
        <LanguagePicker type="collapsed" />
        <ColorSwitch />
        <UserInfo />
      </Group>
    </Group>
  );
}
