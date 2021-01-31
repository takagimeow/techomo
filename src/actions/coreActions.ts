import { Workspace } from 'src/core/classes/Workspace';
import { Channel } from 'src/core/classes/Channel';
import {
  CORE_WORKSPACES_CHANGE,
  CORE_WORKSPACE_IDS_CHANGE,
  CORE_CHANNELS_CHANGE,
  CORE_CHANNEL_IDS_CHANGE,
  CORE_MEMOS_CHANGE,
  CORE_MEMO_IDS_CHANGE,
  CORE_SELECTED_CHANNEL_ID_CHANGE,
  CORE_SELECTED_WORKSPACE_ID_CHANGE,
  CORE_SELECTED_MEMO_ID_CHANGE,
} from 'src/constants/Redux';
import { Memo } from 'src/core';

export function changeCoreWorkspaces(payload: Workspace[]) {
  return {
    type: CORE_WORKSPACES_CHANGE,
    payload,
  };
}

export function changeCoreWorkspaceIds(payload: string[]) {
  return {
    type: CORE_WORKSPACE_IDS_CHANGE,
    payload,
  };
}

export function changeCoreChannels(payload: Channel[]) {
  return {
    type: CORE_CHANNELS_CHANGE,
    payload,
  };
}

export function changeCoreChannelIds(payload: string[]) {
  return {
    type: CORE_CHANNEL_IDS_CHANGE,
    payload,
  };
}

export function changeCoreMemos(payload: Memo[]) {
  return {
    type: CORE_MEMOS_CHANGE,
    payload,
  };
}

export function changeCoreMemoIds(payload: string[]) {
  return {
    type: CORE_MEMO_IDS_CHANGE,
    payload,
  };
}

export function changeCoreSelectedWorkspaceId(payload: string) {
  return {
    type: CORE_SELECTED_WORKSPACE_ID_CHANGE,
    payload,
  };
}

export function changeCoreSelectedChannelId(payload: string) {
  return {
    type: CORE_SELECTED_CHANNEL_ID_CHANGE,
    payload,
  };
}

export function changeCoreSelectedMemoId(payload: string) {
  return {
    type: CORE_SELECTED_MEMO_ID_CHANGE,
    payload,
  };
}
