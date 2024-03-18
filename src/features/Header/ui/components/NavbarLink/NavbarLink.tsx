import { rem, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import type { IconHome2 } from '@tabler/icons-react';
import { IconLogin, IconLogout } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import classes from './Navbar.module.css';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

const NavbarLink = ({ icon: Icon, label, active, onClick }: NavbarLinkProps) => {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
};

export const Navbar = () => {
  const navigate = useNavigate();
  const isAuth = true;

  const hendlelogOut = () => {
    navigate('/');
  };
  const hendlelogin = () => {
    navigate('/auth');
  };

  return (
    <Stack justify="center" gap={0}>
      {isAuth ? (
        <NavbarLink icon={IconLogout} label="Logout" onClick={hendlelogOut} />
      ) : (
        <NavbarLink icon={IconLogin} label="Logout" onClick={hendlelogin} />
      )}
    </Stack>
  );
};
