import { Link } from 'react-router-dom';

// Chakra UI
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Spacer,
  Text,
  useColorMode
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const LoginForm = ({ handleSubmit }: any) => {
  const [viewPassword, setViewPassword] = useState(false);
  const { colorMode } = useColorMode();

  function handleClick () {
    setViewPassword(!viewPassword);
  }

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
        <InputGroup>
          <Input
            id='password'
            name='password'
            type={viewPassword ? 'text' : 'password'}
            placeholder='Min. 8 characters'
            mb={6}
          />
          <InputRightElement>
            {
              viewPassword
                ? <ViewOffIcon onClick={handleClick} cursor='pointer' />
                : <ViewIcon onClick={handleClick} cursor='pointer' />
            }
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Flex mb={6}>
        <Checkbox>
          Keep me logged in
        </Checkbox>
        <Spacer />
        <ChakraLink as={Link} to='/forgot' color={colorMode === 'light' ? 'blue' : 'white'}>
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
        <ChakraLink as={Link} to='/register' color={colorMode === 'light' ? 'blue' : 'white'}>
          Create an Account
        </ChakraLink>
      </Text>
    </Box>
  );
};

export default LoginForm;
