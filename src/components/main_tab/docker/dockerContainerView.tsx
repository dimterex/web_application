import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Link, List, ListItemButton, ListItemText, Tooltip, Typography } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { RootState, AppDispatch } from "../../../app/store";
import { DockerModel } from "./dockerModel";
import { getContainerWithPortsAsync } from "./dockerSlice";

type Props = {
    initialize: () => void,
    data: DockerModel[],
  };
  
  type State = {
    selected: DockerModel | null,
  }
  
  const mapStateToProps = (state: RootState) => {
   
    return { 
      data: state.dockerSlice.containers,
    };
  };
  
  const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
      initialize: async () => {
        dispatch(getContainerWithPortsAsync());
      },
    };
  };
  
  class DockerContainerView extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.props.initialize();
      this.state = { 
        selected: null,
      };
    }

    render() {
      return (
        <Box className="grid-child">
            <Accordion disableGutters>
                <AccordionSummary>
                    Docker urls
                </AccordionSummary>
            </Accordion>
            
            {
                this.props.data.map((container, index) => {
                    return <Box>
                        {
                            container.ports.map((port, port_index) => {
                                let link = `${window.location.protocol}//${window.location.hostname}:${port}`;
                                return <Accordion>
                                        <Link target="_blank" rel="noopener noreferrer" href={link}> {container.name}:{port}</Link>
                                    </Accordion>
                            })
                        }
                        </Box>
                })
            }
        </Box>
      );
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(DockerContainerView)