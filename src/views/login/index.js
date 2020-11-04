import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { user } from 'redux/reducers/user';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './styles';

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(user.logIn({ email, password }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            autoComplete="email"
            autoFocus
            fullWidth
            id="email"
            label="Email Address"
            margin="normal"
            name="email"
            onChange={({ target }) => setEmail(target.value)}
            required
            value={email}
            variant="outlined"
          />
          <TextField
            autoComplete="current-password"
            fullWidth
            id="password"
            label="Password"
            margin="normal"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            required
            type="password"
            value={password}
            variant="outlined"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            className={classes.submit}
            color="primary"
            fullWidth
            type="submit"
            variant="contained"
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
