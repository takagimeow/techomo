import React from 'react';
import { WorkspaceIcon } from 'components/WorkspaceIcon';
import { CreateWorkspaceIcon } from 'components/CreateWorkspaceIcon';
import { SettingsWorkspaceIcon } from 'components/SettingsWorkspaceIcon';

export function WorkspaceNavigation() {
  return (
    <div className="px-2 py-4 mx-auto h-screen overflow-y-auto">
      <div className="my-2">
        <WorkspaceIcon />
      </div>
      <div className="my-2">
        <CreateWorkspaceIcon />
      </div>
      <div className="my-2">
        <SettingsWorkspaceIcon />
      </div>
    </div>
  );
}