import React from 'react';
import { useHistory } from 'react-router-dom';

export function WorkspaceIcon() {
  const history = useHistory();
  return (
    <div
      className="border rounded-xl bg-gray-600 w-12 h-12"
      onClick={() => {
        history.push('/memo');
      }}
    ></div>
  );
}
