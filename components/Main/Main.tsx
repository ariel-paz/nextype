import { Tabs } from '@mantine/core';
// import useStyles from './Main.styles';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { Dashboard } from '../Dashboard';
import { InputForm } from '../InputForm';

export function Main() {
  // const { classes } = useStyles();

  return (
    <>
      <Tabs defaultValue="dashboard">
        <Tabs.List grow position="apart">
          <Tabs.Tab value="dashboard">Dashboard</Tabs.Tab>
          <Tabs.Tab value="input">Carga</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="dashboard">
          <Dashboard />
        </Tabs.Panel>
        <Tabs.Panel value="input">
          <InputForm />
        </Tabs.Panel>
      </Tabs>
      <ColorSchemeToggle />
    </>
  );
}
