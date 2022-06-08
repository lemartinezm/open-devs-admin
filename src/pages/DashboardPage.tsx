import { Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { MyContext } from '../App';
import { ACTIONS } from '../utils/enums';

const DashboardPage = () => {
  const { state, dispatch }: any = useContext(MyContext);
  console.log(state);
  return (
    <div>
      <h1>
        Dashboard Page
      </h1>
      <ul>
        <li>
          isLogged: {state.isLogged.toString()}
        </li>
        <li>
          email: {state.email}
        </li>
        <li>
          password: {state.email}
        </li>
      </ul>
      <Button onClick={() => dispatch({ type: ACTIONS.LOGOUT })}>
        Logout
      </Button>
    </div>
  );
};

export default DashboardPage;
