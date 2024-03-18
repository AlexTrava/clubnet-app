import { Group, rem, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import {
  IconBuildingStore,
  IconCalendarClock,
  IconDeviceGamepad2,
  IconHome2,
  IconLogout,
  IconSettings,
  IconUser,
  IconUsers
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { RoutersPaths } from '@/shared/types/enums';

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

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className={classes.navbar}>
      <Stack justify="space-between" h={550} gap={20}>
        <Group>
          <NavbarLink path={RoutersPaths.ADMIN} icon={IconHome2} label={t('navBar.home')} />
          <NavbarLink
            path={RoutersPaths.ADMIN}
            icon={IconDeviceGamepad2}
            label={t('navBar.game')}
          />
          <NavbarLink
            path={RoutersPaths.LOGIN}
            icon={IconCalendarClock}
            label={t('navBar.schedule')}
          />
          <NavbarLink
            path={RoutersPaths.ADMIN}
            icon={IconBuildingStore}
            label={t('navBar.store')}
          />
          <NavbarLink path={RoutersPaths.MAIN} icon={IconUser} label={t('navBar.user')} />
          <NavbarLink path={RoutersPaths.ADMIN} icon={IconUsers} label={t('navBar.users')} />
        </Group>
        <Group>
          <NavbarLink path={RoutersPaths.ADMIN} icon={IconSettings} label={t('navBar.settings')} />
          <NavbarLink path={RoutersPaths.ADMIN} icon={IconLogout} label={t('navBar.logout')} />
        </Group>
      </Stack>
    </nav>
  );
};
