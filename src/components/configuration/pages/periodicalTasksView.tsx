import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridCellEditCommitParams, GridColDef, GridRowId, GridRowSpacingParams, GridSelectionModel, MuiEvent } from "@mui/x-data-grid";
import React from "react";
import { nameofFactory } from "../../../app/helper";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { add_new_periodical_task, getPeriodicalTasksAsync, remove_periodical_tasks, setPeriodicalTasksAsync, update_periodical_task } from "../configurationSlice";
import { PeriodicalTaskModelRow } from "../interfaces/periodicalTaskModelRow";
import { PeriodicalTaskModel } from "../interfaces/periodicalTaskModel";


type Props = {
  data: Array<PeriodicalTaskModelRow>,
  status: 'loading' | 'idle',
  initialize: () => void,
  addRow: () => void,
  removeRows: (ids: GridRowId[]) => void,
  onEditCommit: (category: PeriodicalTaskModelRow) => void,
  saveData: (categories: PeriodicalTaskModel[]) => void,
};

type State = {
  selectionModel: GridSelectionModel | undefined,
}

const mapStateToProps = (state: RootState) => {
  return { 
    data: state.configuration.periodical_tasks,
    status: state.configuration.periodical_tasks_state,
  };
};
 
const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    initialize: async () => {
      dispatch(getPeriodicalTasksAsync());
    },
    addRow: async () => {
      dispatch(add_new_periodical_task());
    },
    removeRows: async (ids: GridRowId[]) => {
      dispatch(remove_periodical_tasks(ids));
    },
    onEditCommit: async (tasks: PeriodicalTaskModelRow) => {
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

    nameOfLogMessage = nameofFactory<PeriodicalTaskModelRow>();
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
        { field: this.nameProperty, headerName: this.nameProperty, flex: 1, editable: true,  },
        { field: this.trackerIdProperty, headerName: this.trackerIdProperty, flex: 2, editable: true, },
        { field: this.durationProperty, headerName: this.durationProperty, flex: 3, editable: true, },
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
        <Button disabled={ this.props.status == 'loading' } size="small" onClick={this.props.addRow}>Add a row</Button>
        <Button disabled={ this.props.status == 'loading' } size="small" onClick={() => this.props.removeRows(this.state.selectionModel ?? [])}>Remove a row</Button>
        <Button disabled={ this.props.status == 'loading' } size="small" onClick={this.save}>Save credentials</Button>
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
