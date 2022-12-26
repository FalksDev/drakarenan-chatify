import { PropsWithChildren, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';
import AppPage from './pages/AppPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthContext } from './utils/context/AuthContext';
import { User } from './utils/types';

type Props = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

function AppWithProviders({
  children,
  user,
  setUser
} : PropsWithChildren & Props) {
  return (
    <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

function App() {
  const [user, setUser] = useState<User>();
  return (
    <AppWithProviders user={user} setUser={setUser}>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<AuthenticatedRoute children={<AppPage />} />}>
          {user?.email} - {user?.firstName}
        </Route>
      </Routes>
    </AppWithProviders>
  )
}

export default App
