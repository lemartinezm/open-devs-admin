import { Box, Button, Center, Divider, Flex, Grid, GridItem, Heading, Hide, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// Context
import { MyContext } from '../App';
// Components
import LoginForm from '../components/LoginForm';
// Misc
import { ACTIONS } from '../utils/enums';
import office from '../assets/images/office.jpg';

const LoginPage = () => {
  const { dispatch }: any = useContext(MyContext);
  const navigate = useNavigate();

  function handleSubmit (e: any) {
    e.preventDefault();
    const { email, password } = e.target;
    alert('Loggin data:' + JSON.stringify({
      email: email.value,
      password: password.value
    }));
    dispatch({
      type: ACTIONS.LOGIN,
      payload: {
        email: email.value,
        password: password.value
      }
    });
    navigate('/dashboard');
  }

  return (
    <Grid templateColumns={['1fr', '1fr', '1fr', '1fr 1fr']} alignItems='center' >
      <GridItem mx={[5, 10, 20]} >
        <Center>
          <Box w={['100%', '100%', '400px']}>
            <Box>
              <Heading fontSize='4xl'>
                Sign In
              </Heading>
              <Text mt={2}>
                Enter your email and password to sign in!
              </Text>
            </Box>

            <Button mt={6} w={'100%'}>
              Sign in with Google
            </Button>

            <Flex align='center' my={6}>
              <Divider />
              <Text mx={2}>or</Text>
              <Divider />
            </Flex>

            <Box id='form'>
              <LoginForm handleSubmit={handleSubmit} />
            </Box>
          </Box>
        </Center>
      </GridItem>

      <Hide below='991px'>
        <GridItem>
          <Box
            backgroundImage={office}
            bgPos={'75% 0%'}
            bgRepeat='no-repeat'
            borderRadius='0 0 0 200px'
            w='100%'
            minH={'100vh'}
          />
        </GridItem>
      </Hide>

    </Grid>

  );
};

export default LoginPage;
