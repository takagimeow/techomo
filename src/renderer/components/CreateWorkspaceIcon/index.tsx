import React from 'react';
import { useHistory } from 'react-router-dom';

export function CreateWorkspaceIcon() {
  const history = useHistory();

  return (
    <div
      className="select-none border rounded-xl bg-white hover:bg-gray-200"
      onClick={() => {
        history.push('/createworkspace');
      }}
    >
      <div className="p-3">{'➕'}</div>
    </div>
  );
}
