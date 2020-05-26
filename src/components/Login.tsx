import React from 'react';
import { useForm } from '../hooks/useForm';
import styled from 'styled-components';
import { Input, Button } from './ui';
import { Store } from '../store';
import StoreAction from '../store/StoreAction';
import { MESSAGES } from '../utils/messages';

const field1 = 'password';
export const Login: React.FC = () => {
  const { form, onChangeHandler, updateForm } = useForm({
    [field1]: {
      value: '',
    },
  });
  const { dispatch } = React.useContext(Store);

  const Action = new StoreAction(dispatch);

  const submitHandler = () => {
    const pass = form[field1].value;
    if (!pass)
      return updateForm(field1, {
        value: '',
        errorText: MESSAGES.req,
      });
    console.log('password:', pass);
    Action.setPage('userForm');
    Action.setPass(pass);
    return true;
  };

  return (
    <WrapperS>
      <FormS onSubmit={submitHandler}>
        <LabelS>Пароль</LabelS>
        <InputWrapperS>
          <Input
            type="password"
            name={field1}
            value={form[field1].value}
            onChange={onChangeHandler}
            errorText={form[field1].errorText}
          />
          <Button
            title="Вхiд"
            onClick={submitHandler}
            style={{ width: '100px' }}
          />
        </InputWrapperS>
      </FormS>
    </WrapperS>
  );
};
const WrapperS = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 100vh; */
`;

const FormS = styled.form`
  display: block;
  width: 200px;
`;
const LabelS = styled.div`
  font-size: 13px;
  display: block;
  color: gray;
  margin-bottom: 3px;
`;

const InputWrapperS = styled.div`
  display: flex;
  input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;
