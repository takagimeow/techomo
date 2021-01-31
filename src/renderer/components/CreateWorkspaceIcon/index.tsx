import React from 'react';
import { useHistory } from 'react-router-dom';

export function CreateWorkspaceIcon() {
  const history = useHistory();

  return (
    <div
      className="border rounded-xl bg-white"
      onClick={() => {
        history.push('/createworkspace');
      }}
    >
      <div className="p-3">{'➕'}</div>
    </div>
  );
}
