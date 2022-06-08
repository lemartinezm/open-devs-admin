import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link as ChakraLink,
  Spacer,
  Text
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const LoginForm = ({ handleSubmit }: any) => {
  return (
    <Box as='form' onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel htmlFor='email'>
          Email
        </FormLabel>
        <Input
          id='email'
          name='email'
          type='email'
          placeholder='example@email.com'
          mb={6}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor='password'>
          Password
        </FormLabel>
        <Input
          id='password'
          name='password'
          type='password'
          placeholder='Min. 8 characters'
          mb={6}
        />
      </FormControl>

      <Flex mb={6}>
        <Checkbox>
          Keep me logged in
        </Checkbox>
        <Spacer />
        <ChakraLink as={Link} to='/forgot' color='blue'>
          Forgot password?
        </ChakraLink>
      </Flex>

      <Button
        type='submit'
        colorScheme={'purple'}
        variant='solid'
        w={'100%'}
        mb={6}
      >
        Sign in
      </Button>

      <Text>
        {'Not registered yet? '}
        <ChakraLink as={Link} to='/register' color='blue'>
          Create an Account
        </ChakraLink>
      </Text>
    </Box>
  );
};

export default LoginForm;
