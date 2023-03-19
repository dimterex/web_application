import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridCellEditCommitParams, GridColDef, GridRowId, GridRowSpacingParams, GridSelectionModel, MuiEvent } from "@mui/x-data-grid";
import React from "react";
import { connect } from "react-redux";
import { nameofFactory } from "../../../app/helper";
import { RootState, AppDispatch } from "../../../app/store";
import { PeriodicalTaskModel } from "./periodicalTaskModel";
import { getPeriodicalTasksAsync, addNewPeriodicalTaskAsync, removePeriodicalTasksAsync, update_periodical_task, setPeriodicalTasksAsync } from "./periodicalTasksConfigurationSlice";


type Props = {
  data: Array<PeriodicalTaskModel>,
  status: 'loading' | 'idle',
  initialize: () => void,
  addRow: () => void,
  removeRows: (ids: GridRowId[]) => void,
  onEditCommit: (category: PeriodicalTaskModel) => void,
  saveData: (categories: PeriodicalTaskModel[]) => void,
};

type State = {
  selectionModel: GridSelectionModel | undefined,
}

const mapStateToProps = (state: RootState) => {
  return { 
    data: state.periodical_tasks_configuration.items,
    status: state.periodical_tasks_configuration.state,
  };
};
 
const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    initialize: async () => {
      dispatch(getPeriodicalTasksAsync());
    },
    addRow: async () => {
      dispatch(addNewPeriodicalTaskAsync());
    },
    removeRows: async (ids: GridRowId[]) => {
      dispatch(removePeriodicalTasksAsync(ids));
    },
    onEditCommit: async (tasks: PeriodicalTaskModel) => {
      dispatch(update_periodical_task(tasks));
    },

    saveData: async (tasks: PeriodicalTaskModel[]) => {
      dispatch(setPeriodicalTasksAsync(tasks));
    }
  };
};


class PeriodicalTasksView extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.props.initialize();
    this.state = { selectionModel: undefined };
  }

    nameOfLogMessage = nameofFactory<PeriodicalTaskModel>();
    nameProperty = this.nameOfLogMessage('name');
    trackerIdProperty = this.nameOfLogMessage('trackerId');
    durationProperty = this.nameOfLogMessage('duration');
    
    onEditCommit = (params: GridCellEditCommitParams, event: MuiEvent) => {
      var category = this.props.data.find(raw => raw.id == params.id);

      if (!category)
        return
    
      this.props.onEditCommit({
        id: category.id,
        name: params.field === this.nameProperty ? params.value : category.name,
        trackerId: params.field === this.trackerIdProperty ? params.value : category.trackerId,
        duration: params.field === this.durationProperty ? params.value : category.duration,
      });
    }

    columns: GridColDef[] = [
        { field: this.nameOfLogMessage("id"), headerName: "Id" },
        { field: this.nameProperty, headerName: "Name", flex: 1, editable: true, },
        { field: this.trackerIdProperty, headerName: "Tracker ID", flex: 2, editable: true, },
        { field: this.durationProperty, headerName: "Duration", flex: 3, editable: true, },
      ];

    getRowSpacing =(params: GridRowSpacingParams) => {
      return {
        top: params.isFirstVisible ? 0 : 5,
        bottom: params.isLastVisible ? 0 : 5,
      };
    };

    save = () => {
      this.props.saveData(this.props.data)
    }

    render() {
      return <Box>
       <Stack  direction="row" spacing={1} sx={{ mb: 1 }}>
        <Button disabled={ this.props.status == 'loading' } size="small" onClick={this.props.addRow}>Add</Button>
        <Button disabled={ this.props.status == 'loading' } size="small" onClick={() => this.props.removeRows(this.state.selectionModel ?? [])}>Remove</Button>
        <Button disabled={ this.props.status == 'loading' } size="small" onClick={this.save}>Save</Button>
      </Stack>
      <DataGrid
            autoHeight
            hideFooter
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(newSelectionModel) => {
              this.setState({
                  selectionModel: newSelectionModel
                })
            }}
            onCellEditCommit={this.onEditCommit}
            selectionModel={this.state.selectionModel}
            getRowHeight={() => 'auto'}
            rows={this.props.data}
            columns={this.columns}
            getRowSpacing={this.getRowSpacing}
        />
      </Box>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeriodicalTasksView);
