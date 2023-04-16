import { Box, List, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import React, { ReactNode } from "react";
import { change_selected_type } from "./configurationSlice";
import { ConfigurationTypes } from "./configurationTypes";
import { connect } from "react-redux";
import { RootState, AppDispatch } from "../../../app/store";


type Props = {
    selected_type: ConfigurationTypes,
    types: Array<ConfigurationTypes>,
    change_type: (type: ConfigurationTypes) => void,
  };
  
  type State = {
  }
  
  const mapStateToProps = (state: RootState) => {
    return { 
        selected_type: state.configuration.selected_type,
        types: new Array<ConfigurationTypes>(
            ConfigurationTypes.credentials,
            ConfigurationTypes.outlook_categories,
            ConfigurationTypes.todoist_categories,
            ConfigurationTypes.tokens,
            ConfigurationTypes.urls,
            ConfigurationTypes.periodical_tasks,
            ConfigurationTypes.sync_history,
        ),
    };
  };
  
  const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        change_type: async (type: ConfigurationTypes) => {
          dispatch(change_selected_type(type));
        },
    };
  };
  
  
  class ConfigurationsContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        title: ConfigurationTypes,
      ) => {
        if (this.props.selected_type == title) {
            return;
        }

        this.props.change_type(title);
      };

    render(): ReactNode {
        return <Box>
            <Divider />
            <List component="nav">
                {
                    this.props.types.map((source, index) => (
                        <Box key={index}>
                            <ListItemButton
                                selected={this.props.selected_type == source }
                                onClick={(event) => this.handleListItemClick(event, source)}>
                            <ListItemText primary={ConfigurationTypes[source]} />
                            </ListItemButton>
                            <Divider />
                        </Box>
                    ))
                }
            </List>
        </Box>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationsContainer);
