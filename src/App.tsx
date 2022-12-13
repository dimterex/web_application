
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Calendar from './components/calendar/calendar';

import './App.css';
import { Meetengs } from './components/meeting/meetings';
import { useAppDispatch } from './app/hooks';
import { getMeetingsByDateAsync } from './components/meeting/meetingsSlice';
import moment from 'moment';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";

import { getMonthStatisticsAsync } from './components/worklog/worklogSlice';
import Navbar from './components/header/header';
import { MainPage } from './pages/main';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

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
      default: "#4A4A4A",
      paper: '#516c6ccc',
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

moment.locale('en', {
  week: {
      dow: 1
  }
});

function App() {

  const [light, setLight] = React.useState(false);
  const dispatch = useAppDispatch();
  const now = moment();
  dispatch(getMeetingsByDateAsync(now));
  dispatch(getMonthStatisticsAsync({
    day: now,
    force: false
  }));

  return ( 
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      <ReactNotifications />
     
      <BrowserRouter>
          <Navbar handlerThemeChange={() => setLight(prev => !prev)}  />
          <Routes>
            <Route path='/' element={<MainPage />}></Route>
            <Route path='/logger' element={ <Meetengs />}></Route>
          </Routes>
      </BrowserRouter>


  </ThemeProvider>);
}


export default App
