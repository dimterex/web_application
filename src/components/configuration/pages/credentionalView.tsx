import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { getCredentialsAsync, setCredentionalsAsync } from "../configurationSlice";
import { CredentialModel } from "../interfaces/credentialModel";

type Props = {
  credential: CredentialModel | null,
  initialize: () => void,
  saveData: (credential: CredentialModel) => void,
};

type State = {
  login: string,
  password: string,
  email: string,
  domain: string,
  showPassword: boolean,
}

const mapStateToProps = (state: RootState) => {
  return { 
    credential: state.configuration.credentials 
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    initialize: async () => {
      dispatch(getCredentialsAsync());
    },
    saveData: async (credential: CredentialModel) => {
      dispatch(setCredentionalsAsync(credential));
    }
  };
};

class CredentionalView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.props.initialize();
    this.state = { 
      login: this.props.credential?.login ?? '',
      password: this.props.credential?.password ?? '',
      email: this.props.credential?.email ?? '',
      domain: this.props.credential?.domain ?? '',
      showPassword: false,
    };
  }

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
  handleListItemClick = () => {
    this.props.saveData({
      login: this.state.login,
      password: this.state.password,
      email: this.state.email,
      domain: this.state.domain,
    })
  };

  render() {
    return (
      <Stack spacing={1} className="grid-child" sx={{ bgcolor: 'background.paper' }}>
          <Divider />
          <TextField id="Login-basic" label="Login" variant="outlined" value={this.state.login} onChange={(event) => this.setState({login: event.target.value})} />

          <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                  id="outlined-adornment-password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.password}
                  onChange={(event) => this.setState({password: event.target.value}) }
                  endAdornment={
                  <InputAdornment position="end">
                      <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                      edge="end">
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                  </InputAdornment>
                  }
                  label="Password"
              />
          </FormControl>

          <TextField id="Email-basic" label="Email" variant="outlined" value={this.state.email} onChange={(event) => this.setState({email: event.target.value}) } />
          <TextField id="Domain-basic" label="Domain" variant="outlined" value={this.state.domain} onChange={(event) => this.setState({domain: event.target.value}) } />

          <Button onClick={this.handleListItemClick}>
                Save credentials
          </Button>
          
    </Stack>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CredentionalView)
