import React from 'react';

export function MemoTabs() {
  return (
    <div className="flex flex-row border-b border-gray-400 py-4">
      <div className="flex flex-row mx-auto">
        <div className="select-none border w-auto border-r-0 border-gray-400 rounded-l-lg px-4 py-2 bg-gray-400 text-white">
          メモ
        </div>
        {/* <div className="select-none border border-gray-400 px-4 py-2 bg-gray-100">お気に入り</div> */}
        <div className="select-none border border-l-0 border-gray-400 rounded-r-lg px-4 py-2 bg-gray-100">
          お気に入り
        </div>
      </div>
    </div>
  );
}
