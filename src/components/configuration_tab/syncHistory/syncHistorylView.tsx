import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridRowSpacingParams, GridSelectionModel, GridSortModel } from "@mui/x-data-grid";
import React from "react";
import { connect } from "react-redux";
import { SyncHistoryItem } from "../../../api/sync/syncHistoryItem";
import { nameofFactory } from "../../../app/helper";
import { RootState, AppDispatch } from "../../../app/store";
import { getHistoryRequestAsync } from "./syncHistorySlice";


type Props = {
  data: Array<SyncHistoryItem>,
  status: 'loading' | 'idle',
  initialize: () => void,
};

type State = {
  selectionModel: GridSelectionModel | undefined,
}

const mapStateToProps = (state: RootState) => {
  return { 
    data: state.syncHistory.events,
    status: state.syncHistory.state,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    initialize: async () => {
      dispatch(getHistoryRequestAsync());
    },
  };
};


class SyncHistoryView extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.props.initialize();
    this.state = { selectionModel: undefined };
  }

    nameOfLogMessage = nameofFactory<SyncHistoryItem>();

    columns: GridColDef[] = [
        { field: this.nameOfLogMessage('id'), headerName: "Id", },
        { field: this.nameOfLogMessage('login'), headerName: "User", },
        { field: this.nameOfLogMessage('timestamp'), headerName: "Timestamp", },
        { field: this.nameOfLogMessage('action'), headerName: "Action", },
        { field: this.nameOfLogMessage('file'), headerName: "File name", flex: 4, },
      ];

    getRowSpacing =(params: GridRowSpacingParams) => {
      return {
        top: params.isFirstVisible ? 0 : 5,
        bottom: params.isLastVisible ? 0 : 5,
      };
    };


    render() {
      return <Box>
        <DataGrid
              autoHeight
              disableSelectionOnClick
              pagination pageSize={50}
              getRowHeight={() => 'auto'}
              
              rows={this.props.data}
              columns={this.columns}
              getRowSpacing={this.getRowSpacing}
          />
      </Box>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SyncHistoryView);

