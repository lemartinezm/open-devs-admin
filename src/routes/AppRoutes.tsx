import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import NewOfferPage from '../pages/NewOfferPage';
import OfferSheet from '../pages/OfferSheet';
import RegisterPage from '../pages/RegisterPage';
import { KanbanPage } from '../pages/KanbanPage';
import { useContext } from 'react';

// Context
import { MyContext } from '../App';

const AppRoutes = () => {
  const { state }: any = useContext(MyContext);
  return (
    <Routes>
      {
        state.isLogged
          ? <>
            <Route path='dashboard' element={<DashboardPage />} />
            <Route path='newoffer' element={<NewOfferPage />} />
            <Route path='offersheet' element={<OfferSheet />} />
          </>
          : <>
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path='*' element={<Navigate to='login' />} />
          </>
      }
      <Route path='kanban/*' element={<KanbanPage />} />
    </Routes>
  );
};

export default AppRoutes;
