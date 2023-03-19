import { ConfigurationFactory } from "../components/configuration_tab/configuration/configurationFactory";
import { ConfigurationsContainer } from "../components/configuration_tab/configuration/configurationsContainer";

export default function ConfigurationView() {
  return (
    <div  className='grid-container'>
        <ConfigurationsContainer classes='grid-child' /> 
        <ConfigurationFactory />
  </div>
  );
}

