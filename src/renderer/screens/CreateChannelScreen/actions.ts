import { CHANGE_VALUE } from './constants';

export function changeValue(payload: string) {
  return {
    type: CHANGE_VALUE as typeof CHANGE_VALUE,
    payload,
  };
}
