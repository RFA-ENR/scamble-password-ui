import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import GameBoard from '../game-board/game-board';
import axios from 'axios';

const SignIn = ({ list, triggerSnackbar, setIsSignIn }) => {
  const [randomList, setRandomList] = useState(list);

  const [username, setUsername] = useState('');

  const signInSubmitted = () => {
    axios
      .get(`/users?username=${username}&password=${randomList.join(',')}`)
      .then(() => {
        setIsSignIn(true);
      })
      .catch((e) => {
        triggerSnackbar(e.response.data.message);
      });
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} marginTop={3}>
        <GameBoard list={list} randomList={randomList} setRandomList={setRandomList} resetList={() => setRandomList(list)}/>
      </Grid>
      <Grid item xs={12} display={'flex'} justifyContent={'center'} marginTop={5}>
        <Button variant="contained" onClick={signInSubmitted} disabled={username === ''}>
          Sign In
        </Button>
      </Grid>
    </Grid>
  );
};

export default SignIn;
