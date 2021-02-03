import {
  changeCoreChannelIds,
  changeCoreChannels,
  changeCoreWorkspaceIds,
  changeCoreWorkspaces,
  changeCoreMemoIds,
  changeCoreMemos,
  changeCoreSelectedWorkspaceId,
  changeCoreSelectedChannelId,
  changeCoreSelectedMemoId,
} from 'src/actions/coreActions';
import { Channel, Memo, Workspace } from 'src/core';
import {
  CORE_WORKSPACES_CHANGE,
  CORE_WORKSPACE_IDS_CHANGE,
  CORE_CHANNELS_CHANGE,
  CORE_CHANNEL_IDS_CHANGE,
  CORE_MEMOS_CHANGE,
  CORE_MEMO_IDS_CHANGE,
  CORE_SELECTED_WORKSPACE_ID_CHANGE,
  CORE_SELECTED_CHANNEL_ID_CHANGE,
  CORE_SELECTED_MEMO_ID_CHANGE,
} from '../constants/Redux';

export const INITIAL_STATE = {
  workspaces: [] as Workspace[],
  workspaceIds: [] as string[],
  channels: [] as Channel[],
  channelIds: [] as string[],
  memos: [] as Memo[],
  memoIds: [] as string[],
  selectedWorkspaceId: '',
  selectedChannelId: '',
  selectedMemoId: '',
};

type Action =
  | ReturnType<typeof changeCoreWorkspaceIds>
  | ReturnType<typeof changeCoreWorkspaces>
  | ReturnType<typeof changeCoreChannels>
  | ReturnType<typeof changeCoreChannelIds>
  | ReturnType<typeof changeCoreMemos>
  | ReturnType<typeof changeCoreMemoIds>
  | ReturnType<typeof changeCoreSelectedWorkspaceId>
  | ReturnType<typeof changeCoreSelectedChannelId>
  | ReturnType<typeof changeCoreSelectedMemoId>;

export const coreReducer = (state = INITIAL_STATE, action: Action): typeof INITIAL_STATE => {
  switch (action.type) {
    case CORE_WORKSPACES_CHANGE:
      return {
        ...state,
        workspaces: action.payload as Workspace[],
      };
    case CORE_WORKSPACE_IDS_CHANGE:
      return {
        ...state,
        workspaceIds: action.payload as string[],
      };
    case CORE_CHANNELS_CHANGE:
      return {
        ...state,
        channels: action.payload as Channel[],
      };
    case CORE_CHANNEL_IDS_CHANGE:
      return {
        ...state,
        channelIds: action.payload as string[],
      };
    case CORE_MEMOS_CHANGE:
      return {
        ...state,
        memos: action.payload as Memo[],
      };
    case CORE_MEMO_IDS_CHANGE:
      return {
        ...state,
        memoIds: action.payload as string[],
      };
    case CORE_SELECTED_WORKSPACE_ID_CHANGE:
      return {
        ...state,
        selectedWorkspaceId: action.payload as string,
      };
    case CORE_SELECTED_CHANNEL_ID_CHANGE:
      return {
        ...state,
        selectedChannelId: action.payload as string,
      };
    case CORE_SELECTED_MEMO_ID_CHANGE:
      return {
        ...state,
        selectedMemoId: action.payload as string,
      };
    default:
      return state;
  }
};
