import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
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

type DataProps = {
  value: number;
  label: string;
};

type SizeProps = {
  width: number;
  height: number;
};

type PieChartWithCenterLabelProps = {
  title: string,
  data: DataProps[],
  size: SizeProps,
}

const PieChartWithCenterLabel: React.FC<PieChartWithCenterLabelProps> = ( {title, data, size}) => {

  const incomeTotal = Math.round(100 * data.reduce((acc, cur) => acc + cur.value,0)) / 100;
  data.forEach(item => item.value = Math.abs(item.value));

  return (
    <Box sx={{border: "1px dashed gray", padding: 1}}>
      <Typography variant="h6" align="center">{title}</Typography>
      <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
        <PieCenterLabel>{incomeTotal}</PieCenterLabel>
      </PieChart>
    </Box>
  );
}

export default PieChartWithCenterLabel;
