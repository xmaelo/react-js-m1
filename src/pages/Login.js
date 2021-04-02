import React, { useState, useEffect }from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box, 
  Button, 
  Avatar,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import { auth } from './firebase';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({})
  const [email, setEmail] = useState("")
  const [password, setPass] = useState("")
  const [error, setError] = useState(false)

  useEffect(() => { 
    (async()  =>{
        console.log('async run asyn run', auth.currentUser)
       if(auth.currentUser){
          console.log('before user admin', auth.currentUser)
          auth.currentUser.getIdTokenResult().then((idTokenResult) => {
            console.log('idTokenResult idTokenResult', idTokenResult)
             if (!!idTokenResult.claims.admin) {
                navigate('/', { replace: true });
             }else {
              setError(true);
             }
          }).catch((error) => {
            console.log(error);
          });
       }
      })()
    }, []);

  async function onLogin(e){
    e.preventDefault();
    try{
      console.log('confirm', email, password)
      let confirm = await auth.signInWithEmailAndPassword(email, password)
      console.log('confirm confirm', confirm)
      auth.currentUser.getIdTokenResult().then((idTokenResult) => {
        console.log('idTokenResult idTokenResult', idTokenResult)
         if (!!idTokenResult.claims.admin) {
            navigate('/', { replace: true });
         }else {
          setError(true);
         }
      }).catch((error) => {
        console.log(error);
      });
    }catch(e){
      console.log('error logins', e)
    }
  }
  return (
    <>
      <Helmet>
        <title>Login | maMED</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Box display="flex" justifyContent="center" m={1} p={1} >
          <Box p={1}>
          </Box>
          <Box p={1}>
            <img
              src={"/static/images/logo.png"}
              height={150}
              width={150}
              alt="logo"
            />
          </Box>
          <Box p={1}>
          </Box>
        </Box>  
        <Container maxWidth="sm" style={{ marginTop: "-60px" }}>
          <Formik
            initialValues={values}
            // validationSchema={Yup.object().shape({
            //   email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            //   password: Yup.string().max(255).required('Password is required')
            // })}
            onSubmit={() => {
              console.log('email', values)
              //onLogin();
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={onLogin}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Hi there! nice to see you again
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      //onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      //onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
                  {error&&
                    <p
                      style={{textALign: "center", color: "red"}}
                    >
                      Vous n'etes pas autoriser a voir ce contenu
                    </p>
                  }
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={(e)=>setEmail(e.target.value)}
                  type="email"
                  value={email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e)=>setPass(e.target.value)}
                  type="password"
                  value={password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                {/*
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Don&apos;t have an account?
                    {' '}
                    <Link
                      component={RouterLink}
                      to="/register"
                      variant="h6"
                    >
                      Sign up
                    </Link>
                  </Typography>
                */}
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
