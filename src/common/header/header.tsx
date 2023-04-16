import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

import React from "react";
import { connect } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { PageInfo } from "./interface/pageInfo";


type Props = {
  handlerThemeChange: () => void,
  pages: PageInfo[],
};

type State = {
  anchorElNav: null | HTMLElement,
}

const mapStateToProps = (state: RootState) => {
  return { 
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
   
  };
};


class NavtigationBarView extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      anchorElNav: null,
    };
  }

  handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      anchorElNav: event.currentTarget
    });
  };

  handleCloseNavMenu = () => {
    this.setState({
      anchorElNav: null
    });
  };

  
  render() {
    return <AppBar position="static" sx={{zIndex: 99999}}>
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href={window.location.origin}
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Main 
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={this.handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={this.state.anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(this.state.anchorElNav)}
            onClose={this.handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {
              this.props.pages.map((page, index) => (
                <MenuItem key={index} onClick={this.handleCloseNavMenu}>
                  <Typography 
                      noWrap
                      component="a"
                      textAlign="center"
                      href={page.url}>
                          {page.name}
                      </Typography>
                </MenuItem>
              ))
            }
          </Menu>
        </Box>
        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href={window.location.origin}
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Main
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {
            this.props.pages.map((page, index) => (
              <Button
                key={index}
                onClick={this.handleCloseNavMenu}
                href={page.url}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))
          }
        </Box>

        <Button onClick={this.props.handlerThemeChange} sx={{ my: 2, color: 'white', display: 'block' }}>Toggle Theme</Button>
        
      </Toolbar>
    </Container>
  </AppBar>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavtigationBarView);
