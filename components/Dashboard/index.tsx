import { useCallback, useEffect, useState } from 'react';
import {
  Text,
  Paper,
  SimpleGrid,
  Container,
  LoadingOverlay,
  Group,
  ActionIcon,
} from '@mantine/core';
import { collection, getDocs } from 'firebase/firestore';
import { IconRefresh } from '@tabler/icons';
import { firestore } from '../../utils/firebase';
import { PieChart } from '../Charts/PieChart/PieChart';
import { formatMoney } from '../../utils/formatter/money';

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    const ref = collection(firestore, 'stats');
    getDocs(ref).then((querySnapshot) => {
      const postData: any = [];
      querySnapshot.forEach((doc) => postData.push({ ...doc.data() }));
      setData(postData);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return (
      <LoadingOverlay
        loaderProps={{ size: 'sm', color: 'pink', variant: 'bars' }}
        overlayOpacity={0.3}
        overlayColor="#c5c5c5"
        visible
      />
    );
  }

  return (
    <>
      <SimpleGrid cols={2} p="xs">
        <Paper shadow="md" radius="lg" p="lg" withBorder>
          <Text fz="sm" ta="center">
            Presupuesto
          </Text>
          <Text fz="md" ta="center">
            {formatMoney(
              data.reduce((acumulador, actual) => {
                if (actual.type === 'presupuesto') {
                  return acumulador + actual.money;
                }
                return acumulador;
              }, 0)
            )}
          </Text>
        </Paper>
        <Paper shadow="md" radius="lg" p="lg" withBorder>
          <Text fz="sm" ta="center">
            Gastos
          </Text>
          <Text fz="md" ta="center">
            {formatMoney(
              data.reduce((acumulador, actual) => {
                if (actual.type === 'gasto') {
                  return acumulador + actual.money;
                }
                return acumulador;
              }, 0)
            )}
          </Text>
        </Paper>
      </SimpleGrid>
      <Container p="xs">
        <PieChart data={data} />
      </Container>
      <SimpleGrid cols={2} p="xs">
        <Paper shadow="md" radius="lg" p="lg" withBorder>
          <Text fz="sm" ta="center">
            Resto
          </Text>
          <Text fz="md" ta="center">
            {formatMoney(
              data.reduce((acumulador, actual) => {
                if (actual.type === 'ingreso') {
                  return acumulador + actual.money;
                }
                if (actual.type === 'gasto') {
                  return acumulador - actual.money;
                }
                if (actual.type === 'presupuesto') {
                  return actual.money * 0.7 - acumulador;
                }
                return acumulador;
              }, 0)
            )}
          </Text>
        </Paper>
        <Paper shadow="md" radius="lg" p="lg" withBorder>
          <Text fz="sm" ta="center">
            Ahorro
          </Text>
          <Text fz="md" ta="center">
            {formatMoney(
              data.reduce((acumulador, actual) => {
                if (actual.type === 'presupuesto') {
                  return acumulador + actual.money * 0.3;
                }
                return acumulador;
              }, 0)
            )}
          </Text>
        </Paper>
      </SimpleGrid>
      <Group position="center" mt="xl">
        <ActionIcon
          onClick={() => fetchData()}
          size="xl"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
          })}
        >
          <IconRefresh size={20} stroke={1.5} />
        </ActionIcon>
      </Group>
    </>
  );
}
