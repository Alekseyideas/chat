import React from 'react';
import { hot } from 'react-hot-loader/root';
import './App.css';
import styled from 'styled-components';
import { Chat } from './components/Chat';
import { Login } from './components/Login';
import { UserForm } from './components/UserForm';
import { Store } from './store';
import { YouTubeBox } from './components/YouTubeBox';
import socket from './utils/socket';
import StoreAction from './store/StoreAction';

declare global {
  interface Window {
    socket: any;
  }
}

const App: React.FC = () => {
  const { store, dispatch } = React.useContext(Store);
  const Action = new StoreAction(dispatch);

  const setUsers = React.useCallback(
    (users: any) => {
      Action.setUsers(users);
    },
    [Action]
  );

  const addMessage = React.useCallback(
    (mes: any) => {
      Action.sendMessage(mes);
    },
    [Action]
  );

  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, [addMessage, setUsers]);

  window.socket = socket;

  let body;
  switch (store.page) {
    case 'userForm':
      body = <UserForm />;
      break;
    default:
      body = <Login />;
      break;
  }

  if (store.user?.joined) {
    body = (
      <WrapperS>
        <YouTubeBox />
        <Chat />
      </WrapperS>
    );
  }

  return <WrapperBodyS>{body}</WrapperBodyS>;
};

export default hot(App);

const WrapperBodyS = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 20px;
`;
const WrapperS = styled.div`
  display: flex;
  width: 100%;

  @media screen and (max-width: 991px) {
    flex-direction: column;
    & > div {
      width: 100%;
    }
  }
`;
