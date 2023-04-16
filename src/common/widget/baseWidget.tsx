import { Paper } from '@mui/material';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

export const Widget: React.FC<Props> = ({children }) => {
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
