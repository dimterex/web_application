import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridCellEditCommitParams, GridColDef, GridRowId, GridRowSpacingParams, GridSelectionModel, MuiBaseEvent, MuiEvent } from "@mui/x-data-grid";
import React from "react";
import { nameofFactory } from "../../../app/helper";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { add_new_url, getUrlsAsync, remove_urls, setUrlsAsync, update_url } from "../configurationSlice";
import { UrlModelRow } from "../interfaces/urlModelRow";
import { UrlModel } from "../interfaces/urlModel";


type Props = {
  data: Array<UrlModelRow>,
  status: 'loading' | 'idle',
  initialize: () => void,
  addRow: () => void,
  removeRows: (ids: GridRowId[]) => void,
  onEditCommit: (category: UrlModelRow) => void,
  saveData: (categories: UrlModel[]) => void,
};

type State = {
  selectionModel: GridSelectionModel | undefined,
}

const mapStateToProps = (state: RootState) => {
  return { 
    data: state.configuration.urls,
    status: state.configuration.url_state,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    initialize: async () => {
      dispatch(getUrlsAsync());
    },
    addRow: async () => {
      dispatch(add_new_url());
    },
    removeRows: async (ids: GridRowId[]) => {
      dispatch(remove_urls(ids));
    },
    onEditCommit: async (category: UrlModelRow) => {
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

    nameOfLogMessage = nameofFactory<UrlModelRow>();
    
    onEditCommit = (params: GridCellEditCommitParams, event: MuiEvent) => {
      var category = this.props.data.find(raw => raw.id == params.id);

      if (!category)
        return

      this.props.onEditCommit({
        id: category.id,
        name: params.field === 'name' ? params.value : category.name,
        url: params.field === 'url' ? params.value : category.url,
      });
    }


    columns: GridColDef[] = [
        { field: this.nameOfLogMessage('name'), headerName: this.nameOfLogMessage('name'), flex: 1, editable: true,  },
        { field: this.nameOfLogMessage('url'), headerName: this.nameOfLogMessage('url'), flex: 2, editable: true, },
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

export default connect(mapStateToProps, mapDispatchToProps)(UrlslView);

