import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Channel } from 'src/core';
import { changeCoreSelectedChannelId } from 'src/actions/coreActions';
import _ from 'lodash';

export function ChannelNavigation() {
  const dispatch = useDispatch();
  const selectedWorkspaceId: string = useSelector(
    (reduxState: any) => reduxState.core.selectedWorkspaceId,
  );
  const channels: Channel[] = useSelector((reduxState: any) => reduxState.core.channels);
  const filteredChannels = _.filter(channels, {
    groupId: selectedWorkspaceId,
  }) as Channel[];
  const selectedChannelId: string = useSelector(
    (reduxState: any) => reduxState.core.selectedChannelId,
  );
  const history = useHistory();

  return (
    <div className="px-2 py-2 h-screen overflow-y-auto">
      {filteredChannels.map((channel) => (
        <div
          className={`font-bold text-xl ${
            channel.id === selectedChannelId ? 'text-black' : 'text-gray-500'
          }`}
          onClick={() => {
            dispatch(changeCoreSelectedChannelId(channel.get('id') || ''));
            history.push('/memo');
          }}
        >
          {channel.get('name')}
        </div>
      ))}
      <div className="px-2 py-2">
        <div
          className="text-gray-300"
          onClick={() => {
            history.push('/createchannel');
          }}
        >
          チャンネルを作る
        </div>
      </div>
    </div>
  );
}
