import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { changeValue } from './actions';
import { handleSave } from './callbacks';
import { reducer } from './redux';

export function CreateWorkspaceScreen() {
  const [state, localDispatch] = useReducer(reducer, {
    value: '',
  });
  const history = useHistory();

  return (
    <div className="h-screen flex flex-col py-1 px-2">
      <h1 className="text-3xl">ワークスペースを作成する</h1>
      <p className="text-gray-400 my-2">作成するワークスペースの名前を入力してください</p>
      <input
        value={state.value}
        className="border rounded-md py-2 px-2"
        type="text"
        onChange={(event) => {
          localDispatch(changeValue(event.target.value));
        }}
      />
      <div className="flex flex-row justify-end">
        <div
          className="rounded-md border border-gray-800 py-2 px-3 bg-blue-600 my-3"
          onClick={() => {
            handleSave(state.value);
            history.push('/createchannel');
          }}
        >
          <p className="text-cneter text-blue-50">作成する</p>
        </div>
      </div>
    </div>
  );
}
