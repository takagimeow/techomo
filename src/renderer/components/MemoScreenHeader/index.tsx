import React from 'react';

export function MemoScreenHeader() {
  return (
    <div className="z-50 flex flex-row justify-between px-2 py-2 border-b border-gray-400 bg-white">
      <div className="flex flex-row py-2">
        <div className="px-2 text-gray-400">◀</div>
        <div className="px-2 text-gray-400">▶</div>
      </div>
      <div className="flex-grow flex flex-row">
        <input
          placeholder="メモ内を検索する"
          className="mx-auto border border-gray-600 w-9/12 rounded-md px-2 py-1"
          type="text"
          id="name"
          name="name"
        />
      </div>
      <div className="flex flex-row justify-self-end py-2">
        <div className="text-gray-400">◀</div>
        <div className="text-gray-400">▶</div>
      </div>
    </div>
  );
}
