import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useMantineTheme } from '@mantine/core';
import { formatMoney } from '../../../utils/formatter/money';

ChartJS.register(ArcElement, Tooltip, Legend);

function getSumByValue(info: { type: string; money: number }[], type: string) {
  return info.reduce((a, value) => a + (value.type === type ? value.money : 0), 0);
}

function generateData(data) {
  const info = Array.from(
    data.reduce((m, { type, money }) => m.set(type, (m.get(type) || 0) + money), new Map()),
    ([type, money]) => ({
      type,
      money,
    })
  );
  const gasto = getSumByValue(info, 'gasto');
  const presupuesto = getSumByValue(info, 'presupuesto');
  const ingreso = getSumByValue(info, 'ingreso');
  const ahorro = presupuesto * 0.3;
  return {
    data: [gasto, presupuesto + ingreso - ahorro - gasto, ahorro],
    values: {
      gasto,
      presupuesto,
      ingreso,
      ahorro,
    },
  };
}

export function PieChart(props: { data }) {
  const theme = useMantineTheme();
  const { data } = props;
  const info = {
    labels: ['Gasto', 'Resto', 'Ahorro'],
    datasets: [
      {
        label: 'Saldo',
        data: generateData(data).data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const fillText = {
    id: 'centerText',
    beforeDraw(chart) {
      const { width } = chart;
      const { height } = chart;
      const { ctx } = chart;
      ctx.restore();
      const fontSize = (height / 160).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = 'top';
      const text = formatMoney(generateData(data).values.presupuesto);
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;
      ctx.fillText(text, textX, textY);
      ctx.fillStyle = theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.violet[3];
      ctx.save();
    },
  };
  return <Doughnut data={info} plugins={[fillText]} />;
}
