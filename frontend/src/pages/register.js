import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { register } from '../actions/auth/register';
import { useSelector, useDispatch } from 'react-redux';
import AuthWrapper from '../components/AuthWrapper';



import { Formik, Form, Field } from 'formik';
import { registerSchema } from "../schemas";
import { LinearProgress } from '@mui/material';
import { TextField } from 'formik-mui';
import Alert from '@mui/material/Alert';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

  const dispatch = useDispatch();
  const router = useRouter();
  const register_success = useSelector(state => state.auth.register_success);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const loading = useSelector(state => state.auth.loading);


  const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    password1: '',
    password2: '',
    detail: '',
  };

  const [alertData, setAlertData] = useState(initialState);
      
  const {
      first_name,
      last_name,
      email,
      password1,
      password2,
      detail,
  } = alertData;


  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();    
    
    setAlertData({...initialState})
    
    if (dispatch && dispatch !== null && dispatch !== undefined)
    dispatch(register(values.email, values.first_name, values.last_name, values.password1, values.password2))
    .then((res) => setAlertData(alertData =>({...alertData,...res,})
    ));
  }

  if (typeof window !== 'undefined' && isAuthenticated)
  router.push('/home');
  if (register_success)
    router.push('/login');
  return (
    <ThemeProvider theme={theme}>
      <AuthWrapper>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Formik
                initialValues={{ 
                  first_name: "",
                  last_name: "",
                  email: "",
                  password1: "",
                  password2: "",
                  }}
                validationSchema={registerSchema}
                onSubmit={onSubmit}
              >
                    {({ isSubmitting }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      autoComplete="given-name"
                      name="first_name"
                      required
                      fullWidth
                      id="first_name"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField} 
                      required
                      fullWidth
                      id="last_name"
                      label="Last Name"
                      name="last_name"
                      autoComplete="family-name"

                    />
                  </Grid>
                  {
                  first_name &&
                  <Grid item xs={12}>
                  <Alert severity="error">
                    {first_name}
                  </Alert>
                  </Grid>
                  }
                  {
                    last_name &&
                  <Grid item xs={12}>
                  <Alert severity="error">
                    {last_name}
                  </Alert>
                  </Grid>
                  }
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  {
                    email &&
                  <Grid item xs={12}>
                  <Alert severity="error">
                    {email}
                  </Alert>
                  </Grid>
                  }
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      required
                      fullWidth
                      name="password1"
                      label="Password"
                      type="password"
                      id="password1"
                      autoComplete="new-password"
                    />
                  </Grid>
                  {
                    password1 &&
                  <Grid item xs={12}>
                  <Alert severity="error">
                    {password1}
                  </Alert>
                  </Grid>
                  }
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      required
                      fullWidth
                      name="password2"
                      label="Re-enter Password"
                      type="password"
                      id="password2"
                      autoComplete="re-password"
                    />
                  </Grid>
                  {
                    password2 &&
                  <Grid item xs={12}>
                  <Alert severity="error">
                    {password2}
                  </Alert>
                  </Grid>
                  }
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
                {
                detail && 
                <Alert severity="success" color="info">
                  {detail}
                </Alert>
                }
              </Form>
                )}
              </Formik>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </AuthWrapper>
    </ThemeProvider>
  );
}