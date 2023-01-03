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

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { login, reset_register_success } from '../actions/auth/signin';
import AuthWrapper from '../components/AuthWrapper';

import { Formik, Form, Field } from 'formik';
import { loginSchema } from "../schemas";
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




export default function SignIn() {

  
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
      if (dispatch && dispatch !== null && dispatch !== undefined)
          dispatch(reset_register_success());
  }, [dispatch]);

  const [alertData, setAlertData] = useState("");

  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    if (dispatch && dispatch !== null && dispatch !== undefined)
    setAlertData("")
    dispatch(login(values.email, values.password))
    .then((res) => setAlertData(res.error));
  };
  


  if (typeof window !== 'undefined' && isAuthenticated)
      router.push('/');

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
              Sign in
            </Typography>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={loginSchema}
                onSubmit={onSubmit}
              >
                    {({ isSubmitting }) => (
                <Form>
                {
                  alertData &&
                  <Alert severity="error">
                    {alertData}
                  </Alert>
                  }
                <Field
                  component={TextField}
                  type="email"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
                />
                <Field
                  component={TextField}
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
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
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                </Form>
                )}
              </Formik>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </AuthWrapper>
    </ThemeProvider>
  );
}