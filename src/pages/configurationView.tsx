import { useAppDispatch } from "../app/hooks";
import { ConfigurationFactory } from "../components/configuration/configurationFactory";
import { ConfigurationsContainer } from "../components/configuration/configurationsContainer";

export default function ConfigurationView() {
  return (
    <div  className='grid-container'>
        <ConfigurationsContainer classes='grid-child' /> 
        <ConfigurationFactory />
  </div>
  );
}

