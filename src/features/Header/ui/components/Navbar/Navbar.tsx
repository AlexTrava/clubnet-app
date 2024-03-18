import { Group, rem, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import {
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconLogin,
  IconLogout,
  IconSettings
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import classes from './Navbar.module.css';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  path: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick, path }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Link to={path}>
          <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
        </Link>
      </UnstyledButton>
    </Tooltip>
  );
}

export function Navbar() {
  return (
    <nav className={classes.navbar}>
      <Stack justify="space-between" h={550} gap={20}>
        <Group>
          <NavbarLink path="/login" icon={IconLogin} label="IconLogin" />
          <NavbarLink path="/" icon={IconHome2} label="Home" />
          <NavbarLink path="/admin" icon={IconDeviceDesktopAnalytics} label="Admin" />
          <NavbarLink path="/admin/1" icon={IconFingerprint} label="Profile" />
          <NavbarLink path="/" icon={IconGauge} label="Home" />
        </Group>
        <Group>
          <NavbarLink path="/" icon={IconSettings} label="Settings" />
          <NavbarLink path="/" icon={IconLogout} label="Logout" />
        </Group>
      </Stack>
    </nav>
  );
}
