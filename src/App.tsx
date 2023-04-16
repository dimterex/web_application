
import React, { Component } from 'react'

import './App.css';
import moment from 'moment';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";

import { MainView } from './pages/mainView';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import ConfigurationView from './pages/configurationView';
import NavtigationBarView from './common/header/header';

const themeLight = createTheme({
  palette: {
    background: {
      default: "#e4f0e2"
    },    
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#000'
        },
      },
    },
  },
});

const themeDark = createTheme({
  palette: {
    background: {
      default: "#1E1E1E",
      paper: '#252526',
    },
    text:{
      primary: "#efefd8",
      secondary: '#358CD6'
    },
  }, 
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#252526"
        }
      }
    },
  }
});

moment.locale('en', {
  week: {
      dow: 1
  }
});

function App() {

  const [light, setLight] = React.useState(false);

  const pages = [{
    name: 'Dozzle logviewer',
    url: 'http://dimterex-ubuntu:60005/'
  }, {
    name: 'Configurations',
    url: '/configuration'
  }];

  return ( 
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      <ReactNotifications />
     
      <BrowserRouter>
          <NavtigationBarView pages={pages} handlerThemeChange={() => setLight(prev => !prev)}  />
          <Routes>
            <Route path='/' element={<MainView />}></Route>
            <Route path='/configuration' element={ <ConfigurationView />}></Route>
            
          </Routes>
      </BrowserRouter>


  </ThemeProvider>);
}


export default App
