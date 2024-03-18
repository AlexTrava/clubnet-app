import { Autocomplete, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import classes from './Search.module.css';

function Search() {
  return (
    <>
      <Autocomplete
        className={classes.search}
        placeholder="Search"
        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        visibleFrom="xs"
      />
    </>
  );
}

export default Search;
