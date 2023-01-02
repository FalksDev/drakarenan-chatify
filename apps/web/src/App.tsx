import { PropsWithChildren, useState, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';
import { AuthContext } from './utils/context/AuthContext';
import { User } from './utils/types';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import { Suspense } from 'react';
import { LoadingPage } from 'pages/LoadingPage';
import ConversationPage from './pages/conversations/ConversationPage';
import ConversationChannelPage from './pages/conversations/ConversationChannelPage';
import GroupPage from './pages/groups/GroupPage';
import GroupChannelPage from './pages/groups/GroupChannelPage';
import FriendsLayoutPage from 'pages/friends/FriendsLayoutPage';
import { FriendRequestPage } from 'pages/friends/FriendRequestPage';
import BlockedFriendsPage from 'pages/friends/BlockedFriendsPage';
import { socket, SocketContext } from 'utils/context/SocketContext';

const AppPage = lazy(() => import("./pages/AppPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

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
        <SocketContext.Provider value={socket}>
          {children}
        </SocketContext.Provider>
      </AuthContext.Provider>
    </ReduxProvider>
  )
}

function App() {
  const [user, setUser] = useState<User>();
  return (
    <AppWithProviders user={user} setUser={setUser}>
      <Routes>
        <Route path="/register" element={
          <Suspense fallback={<LoadingPage />}>
            <RegisterPage />
          </Suspense>
        } />
        <Route path="/login" element={
          <Suspense fallback={<LoadingPage />}>
            <LoginPage />
          </Suspense>
        } />
        <Route path="/" element={<Navigate to="/conversations" />} />
        <Route element={<AuthenticatedRoute children={
          <Suspense fallback={<LoadingPage/>}>
            <AppPage />
          </Suspense>
        } />}>
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
          <Route path="friends" element={<FriendsLayoutPage/>}>
            <Route path="requests" element={<FriendRequestPage />} />
            <Route path="blocked" element={<BlockedFriendsPage />} />
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
