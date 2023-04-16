import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridCellEditCommitParams, GridColDef, GridRowId, GridRowSpacingParams, GridSelectionModel, MuiBaseEvent, MuiEvent } from "@mui/x-data-grid";
import React from "react";
import { connect } from "react-redux";
import { nameofFactory } from "../../../app/helper";
import { RootState, AppDispatch } from "../../../app/store";
import { UrlModel } from "./urlModel";
import { addNewUrlAsync, getUrlsAsync, removeUrlsAsync, setUrlsAsync, update_url } from "./urlsConfigurationSlice";


type Props = {
  data: Array<UrlModel>,
  status: 'loading' | 'idle',
  initialize: () => void,
  addRow: () => void,
  removeRows: (ids: GridRowId[]) => void,
  onEditCommit: (category: UrlModel) => void,
  saveData: (categories: UrlModel[]) => void,
};

type State = {
  selectionModel: GridSelectionModel | undefined,
}

const mapStateToProps = (state: RootState) => {
  return { 
    data: state.urls_configuration.urls,
    status: state.urls_configuration.url_state,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    initialize: async () => {
      dispatch(getUrlsAsync());
    },
    addRow: async () => {
      dispatch(addNewUrlAsync());
    },
    removeRows: async (ids: GridRowId[]) => {
      dispatch(removeUrlsAsync(ids));
    },
    onEditCommit: async (category: UrlModel) => {
      dispatch(update_url(category));
    },

    saveData: async (urls: UrlModel[]) => {
      dispatch(setUrlsAsync(urls));
    }
  };
};


class UrlslView extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.props.initialize();
    this.state = { selectionModel: undefined };
  }

    nameOfLogMessage = nameofFactory<UrlModel>();
    
    onEditCommit = (params: GridCellEditCommitParams, event: MuiEvent) => {
      var category = this.props.data.find(raw => raw.id == params.id);

      if (!category)
        return

      this.props.onEditCommit({
        id: category.id,
        name: params.field === 'name' ? params.value : category.name,
        value: params.field === 'url' ? params.value : category.value,
      });
    }


    columns: GridColDef[] = [
        { field: this.nameOfLogMessage('id'), headerName: "Id" },
        { field: this.nameOfLogMessage('name'), headerName: "Name",  flex: 1, editable: true,  },
        { field: this.nameOfLogMessage('value'), headerName: "Link", flex: 2, editable: true, },
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

export default connect(mapStateToProps, mapDispatchToProps)(UrlslView);
