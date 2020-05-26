export interface IModal {
  title: string;
  message: string;
  open?: boolean;
  callBack?: () => void;
}

export interface IUser {
  name: string;
  token1?: string;
  token2?: string;
  id: number;
  joined?: boolean;
}

export interface IMessage {
  text: string;
  userName: string;
  id: number;
  time: string;
}

export interface IState {
  user: IUser | null;
  pass: string;
  users: string[];
  modal: IModal;
  messages: IMessage[];
  page: 'login' | 'chat' | 'userForm';
  readonly errors?: string | undefined;
  readonly loading: boolean;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IStore {
  store: IState;
  dispatch: IAction | any;
}

export interface ISetNameAction {
  payload: string;
}

export interface IModalAction {
  payload: IModal;
}

export enum EActionTypes {
  SET_LOADING = 'SET_LOADING',
  SET_USER = 'SET_USER',
  SET_USERS = 'SET_USERS',
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  RESET_MODAL = 'RESET_MODAL',
  SET_PAGE = 'SET_PAGE',
  SEND_MESSAGE = 'SEND_MESSAGE',
  SET_PASS = 'SET_PASS',
  SET_DATA = 'SET_DATA',
}
