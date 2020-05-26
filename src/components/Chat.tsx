import React from 'react';
import { useForm } from '../hooks/useForm';
// import socket from '../utils/socket';
import styled from 'styled-components';
import { Input, Button } from './ui';
import { COLORS } from '../utils/colors';
import { Store } from '../store';
import { Message } from './message';
import StoreAction from '../store/StoreAction';
import socket from '../utils/socket';

interface IUser {
  name: string;
  id: number;
}
interface IMessage {
  text: string;
  userName: string;
  id: number;
}
const filed1 = 'message';
export const Chat: React.FC = () => {
  const { store, dispatch } = React.useContext(Store);
  const { messages } = store;
  const Action = new StoreAction(dispatch);
  const { form, updateForm, onChangeHandler } = useForm({
    [filed1]: {
      value: '',
    },
  });
  const messagesRef = React.useRef<HTMLDivElement | null>(null);
  const messValue = form[filed1].value;
  const onSendMessage = (
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>
  ) => {
    e && e.preventDefault();
    const date = new Date();

    const minutes = date.getMinutes();
    const hour = date.getHours();

    console.log('roomId:', store.pass);
    console.log('userName:', store.user ? store.user.name : 'No name');
    console.log('text:', messValue);
    console.log('time:', `${hour}:${minutes}`);

    socket.emit('ROOM:NEW_MESSAGE', {
      userName: store.user ? store.user.name : 'No name',
      roomId: store.pass,
      text: messValue,
      time: `${hour}:${minutes}`,
    });
    Action.sendMessage({
      id: new Date().getTime(),
      text: messValue,
      userName: store.user ? store.user.name : 'No name',
      time: `${hour}:${minutes}`,
    });
    updateForm(filed1, { value: '' });
  };

  React.useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  return (
    <WrapperS>
      <MessagesS ref={messagesRef}>
        {messages[0] &&
          messages.map((message, i) => (
            <Message
              key={i}
              time={message.time || '00:00'}
              name={i === 2 ? 'MCFR' : message.userName || ''}
              message={message.text || ''}
              mcfr={i === 2}
              admin={i === 3 || i === 4}
              com={
                i === 3
                  ? {
                      name: 'Юлия',
                      message:
                        'Токен сохраняешь в куки. Метод для проверки токена event.mcfr.ua/online/tcheck/ передаешь id, token ответ 200 или 400 (проверять токен раз в час)',
                    }
                  : null
              }
            />
          ))}
      </MessagesS>
      <FormS onSubmit={onSendMessage}>
        <Input name={filed1} value={messValue} onChange={onChangeHandler} />
        <Button
          style={{ width: '120px', borderRadius: '0' }}
          onSubmit={onSendMessage}
          type="submit"
          title="Відправити"
        />
      </FormS>
    </WrapperS>
  );
};

export const WrapperS = styled.div`
  width: 50%;
  min-width: 40%;
  border: 1px solid lightgray;
  border-bottom: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 590px;
  @media screen and (max-width: 993px) {
    width: 100%;
  }
`;

export const FormS = styled.form`
  display: flex;
  input {
    max-width: calc(100% - 0);
    min-width: calc(100% - 0);
    min-height: 40px;
    max-height: 40px;
    border-radius: 0;
  }
`;

export const SendBtnS = styled.button`
  display: flex;
  background: ${COLORS.accent};
  border: 0;
  outline: 0;
  width: 60px;
  min-width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
    fill: #fff;
  }
`;
export const MessagesS = styled.div`
  overflow: auto;
  word-break: break-all;
  /* max-height: 280px; */
`;
