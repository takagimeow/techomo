import React from 'react';

export function ChannelNavigationHeader({ title }: { title: string }) {
  return (
    <div className="px-2 py-4 border-b border-gray-400">
      <p className="text-center font-bold">{title}</p>
    </div>
  );
}
