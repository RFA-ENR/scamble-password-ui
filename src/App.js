import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, AppBar, Box, Button, Grid, Snackbar, Tab, Tabs } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import SignUp from './components/signup/signup';
import SignIn from './components/signin/signin';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function App() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isSignIn, setIsSignIn] = useState(false);

  axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '';
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const triggerSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  return !isSignIn ? (
    <Box sx={{ bgcolor: 'background.paper', width: '50%', marginTop: '100px', marginX: 'auto' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Sign In" {...a11yProps(0)} />
          <Tab label="Sign Up" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <SignIn list={list} triggerSnackbar={triggerSnackbar} setIsSignIn={setIsSignIn} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <SignUp list={list} triggerSnackbar={triggerSnackbar} setIsSignIn={setIsSignIn} />
        </TabPanel>
      </SwipeableViews>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        autoHideDuration={5000}
        key={'topcenter'}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  ) : (
    <Grid container>
      <Grid item xs={12}>
        You have signed in
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={() => {
            setIsSignIn(false);
            setValue(0);
          }}
        >
          Sign Out
        </Button>
      </Grid>
    </Grid>
  );
}

export default App;
