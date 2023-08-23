import { Text, Paper, SimpleGrid, Container } from '@mantine/core';
import { BarChart } from '../BarChart/BarChart';

export function Dashboard() {
  return (
    <>
      <SimpleGrid cols={2} p="xs">
        <Paper shadow="md" radius="lg" p="lg" withBorder>
          <Text fz="sm" ta="center">
            Presupuesto
          </Text>
          <Text fz="md" ta="center">
            10.000
          </Text>
        </Paper>
        <Paper shadow="md" radius="lg" p="lg" withBorder>
          <Text fz="sm" ta="center">
            Gastos
          </Text>
          <Text fz="md" ta="center">
            10.000
          </Text>
        </Paper>
      </SimpleGrid>
      <Container p="xs">
        <BarChart />
      </Container>
      <SimpleGrid cols={2} p="xs">
        <Paper shadow="md" radius="lg" p="lg" withBorder>
          <Text fz="sm" ta="center">
            Resto
          </Text>
          <Text fz="md" ta="center">
            10.000
          </Text>
        </Paper>
        <Paper shadow="md" radius="lg" p="lg" withBorder>
          <Text fz="sm" ta="center">
            Ahorro
          </Text>
          <Text fz="md" ta="center">
            10.000
          </Text>
        </Paper>
      </SimpleGrid>
    </>
  );
}
