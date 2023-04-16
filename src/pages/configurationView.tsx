import { Box, useTheme } from "@mui/material";
import ConfigurationFactoryView from "../components/configuration_tab/configuration/configurationFactory";
import ConfigurationsContainer from "../components/configuration_tab/configuration/configurationsContainer";

export default function ConfigurationView() {

  const theme = useTheme();
  
  return (
  <Box style={{ display: 'flex',
                height: '100vh',
                padding: '8px',
                boxSizing: 'border-box',
                marginLeft: '4px',
                marginRight: '4px'
                }}>
    <Box style={{ flex: '0 0 auto', width: 'auto' }} bgcolor={theme.palette.background.paper}>
      <ConfigurationsContainer  />
    </Box>
    <Box style={{ flex: '1 1 auto',
               padding: '8px',

                marginLeft: '8px',
                marginRight: '4px',

                boxSizing: 'border-box',
                }}  bgcolor={theme.palette.background.paper}>
      <ConfigurationFactoryView />
    </Box>
  </Box>
  );
}

