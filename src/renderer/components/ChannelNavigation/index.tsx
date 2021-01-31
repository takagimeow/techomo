import React from 'react';
import { useHistory } from 'react-router-dom';

export function ChannelNavigation() {
  const history = useHistory();

  return (
    <div className="px-2 py-2 h-screen overflow-y-auto">
      <div className="font-bold text-xl">チャンネル</div>
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
