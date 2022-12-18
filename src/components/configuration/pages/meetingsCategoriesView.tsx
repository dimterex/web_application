import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridCellEditCommitParams, GridColDef, GridRowId, GridRowSpacingParams, GridSelectionModel, MuiBaseEvent, MuiEvent } from "@mui/x-data-grid";
import React from "react";
import { nameofFactory } from "../../../app/helper";
import { MeetingCategory } from "../interfaces/meetingCategory";
import { add_new_meeting_category, getMeetingCategoriesAsync, remove_meeting_category, setMeetingCategoriesAsync, update_meeting_category } from "../configurationSlice";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";

export type MeetingCategoryRow = {
  name: string,
  trackerId: string,
  link: string | null,
  id: string,
}


type Props = {
  data: Array<MeetingCategoryRow>,
  status: 'loading' | 'idle',
  initialize: () => void,
  addRow: () => void,
  removeRows: (ids: GridRowId[]) => void,
  onEditCommit: (category: MeetingCategoryRow) => void,
  saveData: (categories: MeetingCategory[]) => void,
};

type State = {
  selectionModel: GridSelectionModel | undefined,
}

const mapStateToProps = (state: RootState) => {
  return { 
    data: state.configuration.meetings_categories,
    status: state.configuration.meeting_state,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    initialize: async () => {
      dispatch(getMeetingCategoriesAsync());
    },
    addRow: async () => {
      dispatch(add_new_meeting_category());
    },
    removeRows: async (ids: GridRowId[]) => {
      dispatch(remove_meeting_category(ids));
    },
    onEditCommit: async (category: MeetingCategoryRow) => {
      dispatch(update_meeting_category(category));
    },

    saveData: async (categories: MeetingCategory[]) => {
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

    nameOfLogMessage = nameofFactory<MeetingCategory>();
    
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
        { field: this.nameOfLogMessage('name'), headerName: this.nameOfLogMessage('name'), flex: 1, editable: true,  },
        { field: this.nameOfLogMessage('trackerId'), headerName: this.nameOfLogMessage('trackerId'), editable: true, },
        { field: 'id', headerName: 'id', },
        { field: this.nameOfLogMessage('link'), headerName: this.nameOfLogMessage('link'), flex: 3, editable: true, },
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
