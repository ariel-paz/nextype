import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  tabPanelRoot: {
    padding: 0,
  },
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 100,
    fontWeight: 900,
    letterSpacing: -2,

    [theme.fn.smallerThan('md')]: {
      fontSize: 50,
    },
  },
}));
