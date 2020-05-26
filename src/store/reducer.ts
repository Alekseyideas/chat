import { IState, IAction, EActionTypes, IModal } from './types';

export const initialModalState: IModal = {
  title: '',
  message: '',
  open: false,
};

export default function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case EActionTypes.SET_USER:
      return {
        ...state,
        user: {
          ...action.payload,
          joined: true,
        },
      };
    case EActionTypes.OPEN_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case EActionTypes.CLOSE_MODAL:
      return {
        ...state,
        modal: initialModalState,
      };
    case EActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case EActionTypes.SET_USERS:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case EActionTypes.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case EActionTypes.SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case EActionTypes.SET_PASS:
      return {
        ...state,
        pass: action.payload,
      };
    case EActionTypes.SET_DATA:
      return {
        ...state,
        users: [...state.users, action.payload.users],
        messages: [...state.messages, ...action.payload.messages],
      };
    default:
      return state;
  }
}
