import React from 'react';
import { useForm } from '../hooks/useForm';
import styled from 'styled-components';
import { Input, Button } from './ui';
import StoreAction from '../store/StoreAction';
import { Store } from '../store';
import socket from '../utils/socket';
import axios from 'axios';
import { MESSAGES } from '../utils/messages';

const field1 = 'name';
const field2 = 'email';
const field3 = 'phone';

export const UserForm: React.FC = () => {
  const { form, onChangeHandler, updateForm } = useForm({
    [field1]: {
      value: '',
    },
    [field2]: {
      value: '',
    },
    [field3]: {
      value: '',
    },
  });
  const { store, dispatch } = React.useContext(Store);
  const Action = new StoreAction(dispatch);

  const submitHandler = () => {
    if (!store.pass) return alert('Ошибка, нет id');
    const name = form[field1].value;
    if (!name)
      return updateForm(field1, {
        value: '',
        errorText: MESSAGES.req,
      });
    if (!form[field2].value)
      return updateForm(field2, {
        value: '',
        errorText: MESSAGES.req,
      });
    if (!form[field3].value)
      return updateForm(field3, {
        value: '',
        errorText: MESSAGES.req,
      });

    console.log('name:', form[field1].value);
    console.log('email:', form[field2].value);
    console.log('phone:', form[field3].value);

    (async () => {
      const obj = {
        roomId: store.pass,
        userName: name,
      };
      await axios.post(`/rooms/`, obj);
      socket.emit('ROOM:JOIN', obj);
      const { data } = await axios.get(`/rooms/${obj.roomId}`);
      console.log('data: ', data);
      Action.setData(data);
    })();
    Action.setUser({
      id: new Date().getTime(),
      name,
    });
    return true;
  };

  return (
    <>
      <TitleS>Введіть ваші дані </TitleS>
      <FormS onSubmit={submitHandler}>
        <InputWrapperS>
          <Input
            label="Имя Фамилия"
            name={field1}
            value={form[field1].value}
            onChange={onChangeHandler}
            errorText={form[field1].errorText}
          />
          <Input
            label="Email"
            type="email"
            name={field2}
            value={form[field2].value}
            onChange={onChangeHandler}
            errorText={form[field2].errorText}
          />
          <Input
            label="номер телефона"
            name={field3}
            type="tel"
            value={form[field3].value}
            onChange={onChangeHandler}
            errorText={form[field3].errorText}
          />
          <Button
            title="Реєстрація"
            onClick={submitHandler}
            style={{ marginTop: '30px' }}
          />
        </InputWrapperS>
      </FormS>
    </>
  );
};

const FormS = styled.form`
  display: block;
  width: 100%;
`;

const TitleS = styled.h2`
  font-size: 16px;
  display: block;
  width: 100%;
  margin: 0;
`;

const InputWrapperS = styled.div`
  display: block;

  & > div {
    margin-top: 20px;
  }
`;
