import { PropsWithChildren, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';
import AppPage from './pages/AppPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthContext } from './utils/context/AuthContext';
import { User } from './utils/types';
import ConversationPage from './pages/conversations/ConversationPage';
import ConversationChannelPage from './pages/conversations/ConversationChannelPage';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GroupPage } from 'pages/groups/GroupPage';
import { GroupChannelPage } from 'pages/groups/GroupChannelPage';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

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
    <ReduxProvider store={store}>
      <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
        {children}
      </AuthContext.Provider>
    </ReduxProvider>
  )
}

function App() {
  const [user, setUser] = useState<User>();
  return (
    <AppWithProviders user={user} setUser={setUser}>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/conversations" />} />
        <Route element={<AuthenticatedRoute children={<AppPage />} />}>
          <Route path="conversations" element={<ConversationPage />}>
            <Route 
              path=":id"
              element={
                <ConversationChannelPage />
              }
            />
          </Route>
          <Route path="groups" element={<GroupPage />}>
            <Route
              path=":id"
              element={
                <GroupChannelPage />
              }
            />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        toastStyle={{borderRadius: "0.45rem", backgroundColor: "#3f3f46", color: "#d4d4d8"}}
        transition={Flip}
        position="top-right"
        progressStyle={{backgroundColor: "#4f46e5"}}
        theme="dark" />
    </AppWithProviders>
  )
}

export default App
