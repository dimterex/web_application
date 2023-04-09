import { Paper, Grid, GridSize } from '@mui/material';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

const Widget: React.FC<Props> = ({children }) => {
  const style: React.CSSProperties = {
    width: `calc(100%)`,
    height: `calc(100%)`,
    padding: '8px',
    boxSizing: 'border-box',
    margin: `8px`,
  };

  return (
    <Paper style={style}>
      { children }
    </Paper>
  );
};

type WidgetGridProps = {
  children: React.ReactNode;
};

const WidgetGrid: React.FC<WidgetGridProps> = ({ children }) => {
  return (
    <Grid container spacing={1.5}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start">
      {
        React.Children.map(children, (child, index) => (
          <Grid key={index} item md={2.9}>
            { child }
          </Grid>
        ))
      }
    </Grid>
  );
};

export { Widget, WidgetGrid };