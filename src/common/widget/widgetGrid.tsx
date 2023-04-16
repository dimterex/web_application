import { Grid } from "@mui/material";
import React from "react";

type WidgetGridProps = {
    children: React.ReactNode;
  };
  
export const WidgetGrid: React.FC<WidgetGridProps> = ({ children }) => {
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
  