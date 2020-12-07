import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../assets/images/logo.jpeg';

import {useEffect, useState} from 'react';
import axios from 'axios';
import  { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import Alert from '@material-ui/lab/Alert';




function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    //backgroundImage: 'url(https://amp.thenationalnews.com/image/policy:1.1035470:1592477175/LF18-June-All-Stars.jpg?f=16x9&w=1200&$p$f$w=0ee8951)',
    backgroundImage: `url(${Logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function SignInSide() {
  const classes = useStyles();
  const [email, setEmail] = useState(1);
  const [password, setPassword] = useState(1);
  const [formEmail, setFormEmail] = useState(1);
  const history = useHistory();
  const [hiddenVal, setHiddenVal] = useState('none');

  const [datos, setDatos] = useState({
    frmEmail: '',
    frmPasswd: ''
   })

   const handleInputChange = (event) => {
    // console.log(event.target.name)
    // console.log(event.target.value)
    setDatos({
        ...datos,
        [event.target.name] : event.target.value
    })
  }


  const sendFrmData = async (event) => {
    event.preventDefault()
    let res = await axios.get("http://localhost:7000/login/"+datos.frmEmail)
    //this.setState({ products: res.data })
   // console.log(this.state.products)
    //console.log('enviando datos...' + datos.frmEmail + ' ' + datos.frmPasswd)
    //console.log("recibido " + res.data.email)

    if (res.data.email == datos.frmEmail && res.data.password == datos.frmPasswd){
      history.push('/')
    } else{
      history.push('/login');
      setHiddenVal('');
      
    }

  }



  useEffect(() => {   
    fetch(`http://localhost:7000/login`)
      .then(results => results.json())
      .then(data => {
        setEmail(data[0].email);
        setPassword(data[0].password);
      });
     
  }, []);






  return (
    
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h2" variant="h5" color ='error' hidden={hiddenVal}>
            <b>Acceso denegado</b>: Revise su usuario y contraseña!
          </Typography>

          <Typography component="h1" variant="h5">
            Sign in 
          </Typography>
          <form className={classes.form} noValidate onSubmit={sendFrmData}>
            <TextField onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="frmEmail"
              autoComplete="email"
              autoFocus 
            />
            
            <TextField onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="frmPasswd"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
  }