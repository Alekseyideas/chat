import {
  IAction,
  EActionTypes,
  IModal,
  IUser,
  IState,
  IMessage,
} from './types';

interface IData {
  users: IUser[];
  messages: IMessage[];
}
export default class StoreAction {
  dispatch: IAction | any;
  constructor(dispatch: IAction | any) {
    this.dispatch = dispatch;
  }

  public setUser = (payload: IUser) =>
    this.dispatch({
      type: EActionTypes.SET_USER,
      payload,
    });
  public setUsers = (payload: IUser[]) =>
    this.dispatch({
      type: EActionTypes.SET_USERS,
      payload,
    });

  public openModal = (payload: IModal) =>
    this.dispatch({
      type: EActionTypes.OPEN_MODAL,
      payload: { open: true, ...payload },
    });

  public setLoading = (payload: boolean) =>
    this.dispatch({
      type: EActionTypes.SET_LOADING,
      payload,
    });

  public setPage = (payload: IState['page']) =>
    this.dispatch({
      type: EActionTypes.SET_PAGE,
      payload,
    });
  public sendMessage = (payload: IMessage) =>
    this.dispatch({
      type: EActionTypes.SEND_MESSAGE,
      payload,
    });
  public setPass = (payload: string) =>
    this.dispatch({
      type: EActionTypes.SET_PASS,
      payload,
    });

  public setData = (payload: IData) =>
    this.dispatch({
      type: EActionTypes.SET_DATA,
      payload,
    });
}
