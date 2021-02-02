import React from 'react';
import { useHistory } from 'react-router-dom';

export function WorkspaceIcon({ name }: { name: string }) {
  const history = useHistory();
  return (
    <div
      className="select-none border rounded-xl bg-gray-600 w-12 h-12 hover:bg-gray-700 text-white text-center pt-3"
      onClick={() => {
        history.push('/memo');
      }}
    >
      {name[0]}
    </div>
  );
}
