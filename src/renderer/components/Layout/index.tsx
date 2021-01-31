import React from 'react';
import { WorkspaceNavigation } from 'components/WorkspaceNavigation';
import { ChannelNavigationHeader } from 'src/renderer/components/ChannelNavigationHeader';
import { ChannelNavigation } from 'src/renderer/components/ChannelNavigation';

export function Layout({ children }: { children: React.ReactElement }) {
  return (
    <div className="flex flex-row overflow-y-hidden h-screen">
      <div className="flex flex-col border-r border-gray-400 w-1/12">
        <WorkspaceNavigation />
      </div>
      <div className="flex flex-col w-3/12 border-r border-gray-400">
        <ChannelNavigationHeader title="ワークスペース名"/>
        <ChannelNavigation />
      </div>
      <div className="flex flex-col w-8/12">{children}</div>
    </div>
  );
}
