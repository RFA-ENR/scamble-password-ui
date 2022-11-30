import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import GameBoard from '../game-board/game-board';
import axios from 'axios';

const SignUp = ({ list, triggerSnackbar, setIsSignIn, resetList }) => {
  const [randomList, setRandomList] = useState(list);

  const [username, setUsername] = useState('');
  const signUpSubmitted = () => {
    const model = {
      username,
      password: randomList.join(','),
    };
    axios
      .post('/users', model)
      .then(() => {
        alert('You have successfully signed up');
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
        <GameBoard
          list={list}
          randomList={randomList}
          setRandomList={setRandomList}
          resetList={() => setRandomList(list)}
        />
      </Grid>
      <Grid item xs={12} display={'flex'} justifyContent={'center'} marginTop={5}>
        <Button variant="contained" onClick={signUpSubmitted} disabled={username === ''}>
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
};

export default SignUp;
