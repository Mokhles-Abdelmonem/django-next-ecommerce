import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Copyright from '../components/general/Copyright';
import { useSelector } from 'react-redux';



export default function Index() {

  const user = useSelector(state => state.auth.user);

  return (
      <Container maxWidth="sm">
        <Box sx={{ my: 6 , mx: 10}}>
        <Typography variant="h4" component="h1" gutterBottom>
            Next.js Django Boilerplate
          </Typography>
        <Typography variant="h4" component="h1" gutterBottom>
        Welcome {user !== null && user.first_name} to your Site!
        </Typography>

          <Copyright />
        </Box>
      </Container>

  );
}
