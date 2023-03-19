import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridCellEditCommitParams, GridColDef, GridRowId, GridRowSpacingParams, GridSelectionModel, MuiBaseEvent, MuiEvent } from "@mui/x-data-grid";
import React from "react";
import { connect } from "react-redux";
import { nameofFactory } from "../../app/helper";
import { RootState, AppDispatch } from "../../app/store";
import { TokenModel } from "./tokenModel";
import { getTokensAsync, update_token, setTokensAsync, addNewTokenAsync, removeTokensAsync } from "./tokensConfigurationSlice";


type Props = {
  data: Array<TokenModel>,
  status: 'loading' | 'idle',
  initialize: () => void,
  addRow: () => void,
  removeRows: (ids: GridRowId[]) => void,
  onEditCommit: (category: TokenModel) => void,
  saveData: (categories: TokenModel[]) => void,
};

type State = {
  selectionModel: GridSelectionModel | undefined,
}

const mapStateToProps = (state: RootState) => {
  return { 
    data: state.tokens_configuration.tokens,
    status: state.tokens_configuration.token_state,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    initialize: async () => {
      dispatch(getTokensAsync());
    },
    addRow: async () => {
      dispatch(addNewTokenAsync());
    },
    removeRows: async (ids: GridRowId[]) => {
      dispatch(removeTokensAsync(ids));
    },
    onEditCommit: async (category: TokenModel) => {
      dispatch(update_token(category));
    },

    saveData: async (tokens: TokenModel[]) => {
      dispatch(setTokensAsync(tokens));
    }
  };
};


class TokenslView extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.props.initialize();
    this.state = { selectionModel: undefined };
  }

    nameOfLogMessage = nameofFactory<TokenModel>();
    
    onEditCommit = (params: GridCellEditCommitParams, event: MuiEvent) => {
      var category = this.props.data.find(raw => raw.id == params.id);

      if (!category)
        return

      this.props.onEditCommit({
        id: category.id,
        name: params.field === 'name' ? params.value : category.name,
        key: params.field === 'key' ? params.value : category.key,
      });
    }

    columns: GridColDef[] = [
        { field: this.nameOfLogMessage('id'), headerName: 'Id' },
        { field: this.nameOfLogMessage('name'), headerName: 'Name', flex: 1, editable: true, },
        { field: this.nameOfLogMessage('key'), headerName: 'Token', flex: 2, editable: true, },
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

export default connect(mapStateToProps, mapDispatchToProps)(TokenslView);

