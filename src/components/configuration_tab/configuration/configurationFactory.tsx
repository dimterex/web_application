import { Box } from "@mui/material";
import { ConfigurationTypes } from "./configurationTypes";
import UrlslView from "../urls/urlslView";
import TokenslView from "../tokens/tokenslView";

import TaskCategorieslView from "../task_categories/taskCategoriesView"
import MeetingsCategorieslView from "../meeting_categories/meetingsCategoriesView"
import SyncHistorylView from "../syncHistory/syncHistorylView";
import CredentionalView from "../credentials/credentionalView";
import PeriodicalTasksView from "../periodical_tasks/periodicalTasksView";
import { ReactNode } from "react";
import React from "react";
import { connect } from "react-redux";
import { RootState, AppDispatch } from "../../../app/store";

type Props = {
    selected_type: ConfigurationTypes,
  };
  
  type State = {
  }
  
  const mapStateToProps = (state: RootState) => {
    return { 
        selected_type: state.configuration.selected_type,
    };
  };
  
  const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
     
    };
  };
  
  
  class ConfigurationFactoryView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
      }

      renderSwitch = () => {
        switch(this.props.selected_type) {
            case ConfigurationTypes.credentials:
                return <CredentionalView />;
            case ConfigurationTypes.outlook_categories:
                return <MeetingsCategorieslView />
            case ConfigurationTypes.todoist_categories:
                return <TaskCategorieslView />
            case ConfigurationTypes.tokens:
                return <TokenslView />
            case ConfigurationTypes.urls: 
                return <UrlslView />
            case ConfigurationTypes.periodical_tasks:
                return <PeriodicalTasksView />
            case ConfigurationTypes.sync_history:
                return  <SyncHistorylView />
            default:
                return <Box />
        }
    }


      render(): ReactNode {
        return <Box>
                {   
                    this.renderSwitch()
                }
        </Box>
      }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationFactoryView);
