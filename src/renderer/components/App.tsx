import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomeScreen } from 'src/renderer/screens/HomeScreen';
import { AboutScreen } from 'src/renderer/screens/AboutScreen';
import { MemoScreen } from 'src/renderer/screens/MemoScreen';
import { CreateWorkspaceScreen } from 'src/renderer/screens/CreateWorkspaceScreen';
import { CreateChannelScreen } from 'screens/CreateChannelScreen';
import { useDispatch } from 'react-redux';
import { ipcRenderer } from 'electron';
import {
  changeCoreWorkspaces,
  changeCoreChannels,
  changeCoreMemos,
  changeCoreMemoIds,
} from 'src/actions/coreActions';
import { ChannelBuilder, MemoBuilder, WorkspaceBuilder } from 'src/core';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.send('restore-workspaces-message', '');
  }, []);
  ipcRenderer.on('restore-workspaces-reply', (event, arg) => {
    const workspacesJson = JSON.parse(arg);
    const workspaces = workspacesJson.map((workspaceJson: any) => {
      const workspace = new WorkspaceBuilder()
        .id(workspaceJson.id)
        .groupId(workspaceJson.groupId)
        .index(workspaceJson.index)
        .name(workspaceJson.name)
        .channels(workspaceJson.channels)
        .color(workspaceJson.color)
        .build();
      return workspace;
    });
    dispatch(changeCoreWorkspaces(workspaces));
    ipcRenderer.send('restore-channels-message', '');
  });

  ipcRenderer.on('restore-channels-reply', (event, arg) => {
    const channelsJson = JSON.parse(arg);
    const channels = channelsJson.map((channelJson: any) => {
      const channel = new ChannelBuilder()
        .id(channelJson.id)
        .groupId(channelJson.groupId)
        .index(channelJson.index)
        .name(channelJson.name)
        .memos(channelJson.memos)
        .color(channelJson.color)
        .build();
      return channel;
    });
    dispatch(changeCoreChannels(channels));
    ipcRenderer.send('restore-memos-message', '');
  });
  ipcRenderer.on('restore-memos-reply', (event, arg) => {
    const memosJson = JSON.parse(arg);
    const memos = memosJson.map((memoJson: any) => {
      console.log('memoJson: ', memoJson);
      const memo = new MemoBuilder()
        .id(memoJson.id)
        .groupId(memoJson.groupId)
        .index(memoJson.index)
        .name(memoJson.name)
        .body(memoJson.body)
        .color(memoJson.color)
        .saved(memoJson.saved)
        .createdAt(new Date(memoJson.createdAt))
        .updatedAt(new Date(memoJson.updatedAt))
        .build();
      return memo;
    });
    dispatch(changeCoreMemos(memos));
    ipcRenderer.send('restore-memoIds-message', '');
  });
  ipcRenderer.on('restore-memoIds-reply', (event, arg) => {
    const memoIds = JSON.parse(arg);
    dispatch(changeCoreMemoIds(memoIds));
  });

  return (
    <div>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/">
          <HomeScreen />
        </Route>
        <Route path="/memo">
          <MemoScreen />
        </Route>
        <Route path="/createworkspace">
          <CreateWorkspaceScreen />
        </Route>
        <Route path="/createchannel">
          <CreateChannelScreen />
        </Route>
        <Route path="/about">
          <AboutScreen />
        </Route>
      </Switch>
    </div>
  );
}
