import { Box, Button, Container, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App';
import LoginForm from '../components/LoginForm';
import { ACTIONS } from '../utils/enums';

const LoginPage = () => {
  const values: any = useContext(MyContext);
  const navigate = useNavigate();

  function handleSubmit (e: any) {
    e.preventDefault();
    const { email, password } = e.target;
    alert('Loggin data:' + JSON.stringify({
      email: email.value,
      password: password.value
    }));
    values.dispatch({
      type: ACTIONS.LOGIN,
      payload: {
        email: email.value,
        password: password.value
      }
    });
    navigate('/dashboard');
  }

  return (
    <Container mt={20}>
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
    </Container>
  );
};

export default LoginPage;
