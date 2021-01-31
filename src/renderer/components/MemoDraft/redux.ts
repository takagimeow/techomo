import { CHANGE_VALUE } from './constants';

export interface State {
  value: string;
}

export type Action = {
  type: typeof CHANGE_VALUE;
  payload: string;
};

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case CHANGE_VALUE:
      return {
        ...state,
        value: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
