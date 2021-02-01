import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { ChannelBuilder } from 'src/core';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCoreChannelIds,
  changeCoreChannels,
  changeCoreSelectedChannelId,
} from 'src/actions/coreActions';
import { ipcRenderer } from 'electron';
import { changeValue } from './actions';
import { reducer } from './redux';

export function CreateChannelScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const channels = useSelector((reduxState: any) => reduxState.core.channels);
  const channelIds = useSelector((reduxState: any) => reduxState.core.channelIds);
  const selectedWorkspaceId: string = useSelector(
    (reduxState: any) => reduxState.core.selectedWorkspaceId,
  );
  const [localState, localDispatch] = useReducer(reducer, {
    value: '',
  });
  const handleSave = (workspaceName: string) => {
    const channelId = uuidv4();
    const channel = new ChannelBuilder()
      .id(channelId)
      .groupId(selectedWorkspaceId)
      .index(0)
      .name(workspaceName)
      .memos([])
      .color('#000000')
      .build();
    dispatch(changeCoreChannels([...channels, channel]));
    dispatch(changeCoreChannelIds([...channelIds, channelId]));
    dispatch(changeCoreSelectedChannelId(channel.get('id') || ''));
    ipcRenderer.send('save-channels-message', JSON.stringify([...channels, channel]));
  };

  ipcRenderer.on('save-channels-reply', (event, arg) => {
    console.log(arg);
  });

  return (
    <div className="h-screen flex flex-col py-1 px-2">
      <h1 className="text-3xl">チャンネルを作成する</h1>
      <p className="text-gray-400 my-2">作成するチャンネルの名前を入力してください</p>
      <input
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
            history.push('/memo');
          }}
        >
          <p className="text-cneter text-blue-50">作成する</p>
        </div>
      </div>
    </div>
  );
}
