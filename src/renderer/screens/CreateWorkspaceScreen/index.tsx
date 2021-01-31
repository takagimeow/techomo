import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { WorkspaceBuilder } from 'src/core';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCoreWorkspaceIds,
  changeCoreWorkspaces,
  changeCoreSelectedWorkspaceId,
} from 'src/actions/coreActions';
import { changeValue } from './actions';
import { reducer } from './redux';

export function CreateWorkspaceScreen() {
  const dispatch = useDispatch();
  const workspaces = useSelector((reduxState: any) => reduxState.core.workspaces);
  const workspaceIds = useSelector((reduxState: any) => reduxState.core.workspaceIds);
  const [localState, localDispatch] = useReducer(reducer, {
    value: '',
  });
  const history = useHistory();

  const handleSave = (workspaceName: string) => {
    const workspaceId = uuidv4();
    const workspace = new WorkspaceBuilder()
      .id(workspaceId)
      .groupId('')
      .index(0)
      .name(workspaceName)
      .channels([])
      .color('#000000')
      .build();
    dispatch(changeCoreWorkspaces([...workspaces, workspace]));
    dispatch(changeCoreWorkspaceIds([...workspaceIds, workspaceId]));
    dispatch(changeCoreSelectedWorkspaceId(workspaceId));
  };

  return (
    <div className="h-screen flex flex-col py-1 px-2">
      <h1 className="text-3xl">ワークスペースを作成する</h1>
      <p className="text-gray-400 my-2">作成するワークスペースの名前を入力してください</p>
      <input
        value={localState.value}
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
            handleSave(localState.value);
            history.push('/createchannel');
          }}
        >
          <p className="text-cneter text-blue-50">作成する</p>
        </div>
      </div>
    </div>
  );
}
