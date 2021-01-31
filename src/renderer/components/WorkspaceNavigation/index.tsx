import React from 'react';
import { useHistory } from 'react-router-dom';
import { WorkspaceIcon } from 'components/WorkspaceIcon';
import { CreateWorkspaceIcon } from 'components/CreateWorkspaceIcon';
import { SettingsWorkspaceIcon } from 'components/SettingsWorkspaceIcon';
import { useDispatch, useSelector } from 'react-redux';
import { Workspace } from 'src/core';
import { changeCoreSelectedWorkspaceId } from 'src/actions/coreActions';

export function WorkspaceNavigation() {
  const dispatch = useDispatch();
  const workspaces: Workspace[] = useSelector((reduxState: any) => reduxState.core.workspaces);
  const selectedWorkspaceId: string = useSelector(
    (reduxState: any) => reduxState.core.selectedWorkspaceId,
  );
  const history = useHistory();
  // const workspaceIds: string[] = useSelector((reduxState: any) => reduxState.core.workspaceIds);

  return (
    <div className="px-2 py-4 mx-auto h-screen overflow-y-auto">
      {workspaces.map((workspace) => (
        <div
          className={`my-2 ${
            workspace.id === selectedWorkspaceId ? 'text-black' : 'text-gray-500'
          }`}
          onClick={() => {
            dispatch(changeCoreSelectedWorkspaceId(workspace.get('id') || ''));
            history.push('/memo');
          }}
        >
          <WorkspaceIcon name={workspace.get('name') || ''} />
        </div>
      ))}
      <div className="my-2">
        <CreateWorkspaceIcon />
      </div>
      <div className="my-2">
        <SettingsWorkspaceIcon />
      </div>
    </div>
  );
}
