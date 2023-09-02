import { Tabs, TabsProps, useMantineColorScheme, useMantineTheme } from '@mantine/core';
// import useStyles from './Main.styles';
import { IconSun, IconMoonStars } from '@tabler/icons';
import { useState } from 'react';
import { Dashboard } from '../Dashboard';
import { InputForm } from '../InputForm';

function StyledTabs(props: TabsProps) {
  return (
    <Tabs
      // unstyled
      styles={(theme) => ({
        //   tab: {
        //     mask: 'var(radial-gradient(5.38em at calc(100% - 7.60em) 50%,#000 99%,#0000 101%) 0 calc(50% - 8em)/100% 16em, radial-gradient(5.38em at calc(100% + 3.60em) 50%,#0000 99%,#000 101%) calc(100% - 4em) 50%/100% 16em repeat-y;)',
        //     WebkitMask:
        //       'var(radial-gradient(5.38em at calc(100% - 7.60em) 50%,#000 99%,#0000 101%) 0 calc(50% - 8em)/100% 16em, radial-gradient(5.38em at calc(100% + 3.60em) 50%,#0000 99%,#000 101%) calc(100% - 4em) 50%/100% 16em repeat-y;)',
        //     //     ...theme.fn.focusStyles(),
        //     //     backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        //     //     color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
        //     //     border: `${rem(1)} solid ${
        //     //       theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[4]
        //     //     }`,
        //     //     padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        //     //     cursor: 'pointer',
        //     //     fontSize: theme.fontSizes.sm,
        //     //     display: 'flex',
        //     //     alignItems: 'center',
        //     //     '&:not(:first-of-type)': {
        //     //       borderLeft: 0,
        //     //     },
        //     //     '&:first-of-type': {
        //     //       borderTopLeftRadius: theme.radius.md,
        //     //       borderBottomLeftRadius: theme.radius.md,
        //     //     },
        //     //     '&:last-of-type': {
        //     //       borderTopRightRadius: theme.radius.md,
        //     //       borderBottomRightRadius: theme.radius.md,
        //     //     },
        //     //     '&[data-active]': {
        //     //       backgroundColor: theme.colors.blue[7],
        //     //       borderColor: theme.colors.blue[7],
        //     //       color: theme.white,
        //     //     },
        //   },

        //   //   tabIcon: {
        //   //     marginRight: theme.spacing.xs,
        //   //     display: 'flex',
        //   //     alignItems: 'center',
        //   //   },

        //   //   tabsList: {
        //   //     display: 'flex',
        //   //   },
        panel: {
          height: 'calc(100vh - 40px)',
        },
      })}
      {...props}
    />
  );
}

export function Main() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  // const { classes } = useStyles();

  return (
    <>
      <StyledTabs defaultValue="dashboard" inverted onTabChange={(value) => setActiveTab(value)}>
        <Tabs.Panel value="dashboard">
          <Dashboard />
        </Tabs.Panel>
        <Tabs.Panel value="input">
          <InputForm />
        </Tabs.Panel>

        <Tabs.List position="apart">
          <Tabs.Tab value="dashboard">Dashboard</Tabs.Tab>
          <Tabs.Tab value="input">Carga</Tabs.Tab>
          <Tabs.Tab
            value={activeTab}
            icon={
              colorScheme === 'dark' ? (
                <IconSun size={20} stroke={1.5} />
              ) : (
                <IconMoonStars size={20} stroke={1.5} />
              )
            }
            ml="auto"
            onClick={() => toggleColorScheme()}
            style={{
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
            }}
          />
        </Tabs.List>
      </StyledTabs>
    </>
  );
}
