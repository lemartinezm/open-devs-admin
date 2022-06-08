import React, { useReducer } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import AppRoutes from './routes/AppRoutes';
import { ACTIONS } from './utils/enums';

// Provide context to the app
export const MyContext = React.createContext({});

const loginReducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        isLogged: true,
        email: action.payload.email,
        password: action.payload.password
      };
    case ACTIONS.LOGOUT:
      return {
        isLogged: false,
        email: '',
        password: ''
      };
    default:
      return state;
  }
};

const initialState = {
  isLogged: false,
  email: '',
  password: ''
};

function App () {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  return (
    <MyContext.Provider value={{
      state,
      dispatch
    }}>
      <Box maxWidth='1440px' >
        <Router>
          <AppRoutes />
        </Router>
      </Box>
    </MyContext.Provider>

  );
}

export default App;
