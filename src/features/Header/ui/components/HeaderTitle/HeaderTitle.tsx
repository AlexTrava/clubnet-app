import { Image } from '@mantine/core';
import { Link } from 'react-router-dom';

import icon from '@/App/access/test.svg';

import classes from './HeaderTitle.module.css';

export function HeaderTitle() {
  return (
    <Link className={classes.root} to="/">
      <Image src={icon} />
    </Link>
  );
}
