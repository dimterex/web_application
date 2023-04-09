import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridCellEditCommitParams, GridColDef, GridRowId, GridRowSpacingParams, GridSelectionModel, MuiBaseEvent, MuiEvent } from "@mui/x-data-grid";
import React from "react";
import { connect } from "react-redux";
import { addNewMeetingCategoryAsync, getMeetingCategoriesAsync, removeMeetingCategoriesAsync, setMeetingCategoriesAsync, update_meeting_category } from "./meetingsConfigurationSlice";
import { MeetingCategoryModel } from "./meetingCategoryModel";
import { nameofFactory } from "../../../app/helper";
import { RootState, AppDispatch } from "../../../app/store";

type Props = {
  data: Array<MeetingCategoryModel>,
  status: 'loading' | 'idle',
  initialize: () => void,
  addRow: () => void,
  removeRows: (ids: GridRowId[]) => void,
  onEditCommit: (category: MeetingCategoryModel) => void,
  saveData: (categories: MeetingCategoryModel[]) => void,
};

type State = {
  selectionModel: GridSelectionModel | undefined,
}

const mapStateToProps = (state: RootState) => {
  return { 
    data: state.meetings_configration.meetings_categories,
    status: state.meetings_configration.meeting_state,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    initialize: async () => {
      dispatch(getMeetingCategoriesAsync());
    },
    addRow: async () => {
      dispatch(addNewMeetingCategoryAsync());
    },
    removeRows: async (ids: GridRowId[]) => {
      dispatch(removeMeetingCategoriesAsync(ids));
    },
    onEditCommit: async (category: MeetingCategoryModel) => {
      dispatch(update_meeting_category(category));
    },

    saveData: async (categories: MeetingCategoryModel[]) => {
      dispatch(setMeetingCategoriesAsync(categories));
    }
  };
};


class MeetingsCategorieslView extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.props.initialize();
    this.state = { selectionModel: undefined };
  }

    nameOfLogMessage = nameofFactory<MeetingCategoryModel>();
    
    onEditCommit = (params: GridCellEditCommitParams, event: MuiEvent) => {
      var category = this.props.data.find(raw => raw.id == params.id);

      if (!category)
        return

      this.props.onEditCommit({
        id: category.id,
        name: params.field === 'name' ? params.value : category.name,
        trackerId: params.field === 'trackerId' ? params.value : category.trackerId,
        link: params.field === 'link' ? params.value : category.link,
      });
    }

    columns: GridColDef[] = [
        { field: this.nameOfLogMessage('id'), headerName: 'Id' },
        { field: this.nameOfLogMessage('name'), headerName: 'Name', flex: 1, editable: true,  },
        { field: this.nameOfLogMessage('trackerId'), headerName: 'Tracker ID', editable: true, },
        { field: this.nameOfLogMessage('link'), headerName: 'Link', flex: 3, editable: true, },
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
                  ...this.state,
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

export default connect(mapStateToProps, mapDispatchToProps)(MeetingsCategorieslView);
