import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const data = [
  { value: 700, label: 'Rental' },
  { value: 300, label: 'Food' },
  { value: 150, label: 'Entertaimnent' },
  { value: 130, label: 'Transport' },
  { value: 1500, label: 'Travel' },
  { value: 15, label: 'Gifts' },
  { value: 50, label: 'Other' },
];

const size = {
  width: 500,
  height: 300,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

function PieChartWithCenterLabel() {
  return (
    <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
      <PieCenterLabel>$1,200</PieCenterLabel>
    </PieChart>
  );
}

export default PieChartWithCenterLabel