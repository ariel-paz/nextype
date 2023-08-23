import { useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons-react';
import {
  Stepper,
  Button,
  Group,
  TextInput,
  Code,
  SimpleGrid,
  Select,
  Alert,
  NumberInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle } from '@tabler/icons';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { DateInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { firestore } from '../../utils/firebase';

export function InputForm() {
  const [active, setActive] = useState(0);

  const form = useForm({
    initialValues: {
      money: 0,
      area: '',
      type: '',
      date: '',
    },

    validate: (values) => {
      if (active === 0) {
        return {
          money: values.money <= 0 ? 'No sabia que podias poner plata negativa...' : null,
          tipo: ['gasto', 'ingreso', 'presupuesto'].includes(values.type)
            ? null
            : 'Completame bien este campo',
          area: values.area !== '' ? null : 'Completame bien este campo',
        };
      }

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 2 ? current + 1 : current;
    });

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const saveData = async () => {
    notifications.show({
      id: 'load-data',
      loading: true,
      title: 'Guardando',
      message: 'Dame un cachito...',
      autoClose: false,
      withCloseButton: false,
    });
    try {
      const ref = collection(firestore, 'stats');
      await addDoc(ref, {
        area: form.values.area,
        money: form.values.money,
        type: form.values.type,
        date: form.values.date,
        submitAt: Timestamp.now().toDate(),
      });
      setTimeout(() => {
        notifications.update({
          id: 'load-data',
          color: 'teal',
          title: 'Listo!',
          message: 'Ya esta guardado.',
          icon: <IconCheck size="1rem" />,
          autoClose: 2000,
        });
        form.reset();
        setActive(0);
      }, 3000);
    } catch (e) {
      notifications.update({
        id: 'load-data',
        color: 'red',
        title: 'Ups!',
        message: 'Hubo un error. Volve a intentarlo en unos minutos',
        icon: <IconX size="1rem" />,
        autoClose: 2000,
      });
      console.log('Error adding document: ', e);
      setActive(0);
    }
  };

  return (
    <SimpleGrid p="xs">
      <Stepper active={active} breakpoint="sm">
        <Stepper.Step label="Ingreso de datos" description="Carga">
          <Select
            {...form.getInputProps('type')}
            label="Tipo"
            placeholder="Gasto / Ingreso / Presupuesto"
            data={[
              { value: 'gasto', label: 'Gasto' },
              { value: 'ingreso', label: 'Ingreso' },
              { value: 'presupuesto', label: 'Presupuesto' },
            ]}
          />
          <NumberInput
            label="Plata"
            placeholder="Dinero"
            hideControls
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                : '$ '
            }
            {...form.getInputProps('money')}
          />
          <TextInput label="Rubro" placeholder="Area" {...form.getInputProps('area')} />
          <DateInput
            label="Fecha"
            placeholder="Fecha"
            maw={400}
            mx="auto"
            {...form.getInputProps('date')}
          />
        </Stepper.Step>

        <Stepper.Step label="Revisar Datos" description="Validacion">
          <Code block mt="xl">
            {JSON.stringify(form.values, null, 2)}
          </Code>
        </Stepper.Step>

        <Stepper.Completed>
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Guardando..."
            color="orange"
            radius="lg"
          >
            Veamos si tengo que avisarle a Ariel o no.
          </Alert>
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {active === 1 && (
          <>
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
            <Button
              onClick={() => {
                nextStep();
                saveData();
              }}
            >
              Finalizar
            </Button>
          </>
        )}
        {active === 0 && <Button onClick={nextStep}>Siguiente</Button>}
      </Group>
    </SimpleGrid>
  );
}
