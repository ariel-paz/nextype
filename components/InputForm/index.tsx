import { useState } from 'react';
import {
  Stepper,
  Button,
  Group,
  TextInput,
  Code,
  SimpleGrid,
  Select,
  Loader,
  Alert,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle } from '@tabler/icons';

export function InputForm() {
  const [active, setActive] = useState(0);

  const form = useForm({
    initialValues: {
      money: '',
      area: '',
      type: '',
    },

    validate: (values) => {
      if (active === 0) {
        return {
          money: +values.money < 0 ? 'No sabia que podias poner plata negativa...' : null,
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

  const saveData = () => {
    console.log(form.values);
    setTimeout(() => {
      console.log('hola');
    }, 10000);
    // clearTimeout(timer);
  };

  return (
    <SimpleGrid p="xs">
      <Stepper active={active} breakpoint="sm">
        <Stepper.Step label="Ingreso de datos" description="Carga">
          <Select
            {...form.getInputProps('type')}
            label="Tipo"
            placeholder="Gasto / Ingreso"
            data={[
              { value: 'gasto', label: 'Gasto' },
              { value: 'ingreso', label: 'Ingreso' },
            ]}
          />
          <TextInput label="Plata" placeholder="Money" {...form.getInputProps('money')} />
          <TextInput label="Rubro" placeholder="Area" {...form.getInputProps('area')} />
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
          <div style={{ textAlign: 'center', paddingTop: '2em' }}>
            <Loader size="lg" />
          </div>
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
