import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch } from 'react-redux';
import { changeCoreSelectedMemoId } from 'src/actions/coreActions';
import { convertDateToAgoText } from 'src/utils/converter';

export function MemoNode({
  id = '',
  body = '',
  level = 0,
  createdAt,
}: {
  id: string;
  body: string;
  level: number;
  createdAt: Date | null;
}) {
  const dispatch = useDispatch();

  return (
    <div className="border-b border-gray-400">
      <div className={`pl-${level * 2}`}>
        <div className={`flex flex-row border-l-${level >= 1 ? 2 : 0} border-blue-600`}>
          <div className="w-2/12 py-6 px-1 text-center">
            {convertDateToAgoText(createdAt || new Date())}
          </div>
          <div className="w-10/12 flex flex-col py-2">
            <div className="text-lg">
              <ReactMarkdown>{body}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className={`w-2/12 h-auto px-${2 * level}`}>
          <div className={`h-9 border-l-${level >= 1 ? 2 : 0} border-blue-600`} />
        </div>
        <div className="w-10/12">
          <div className="flex flex-row justify-between pb-2">
            <div
              className="text-sm"
              onClick={() => {
                dispatch(changeCoreSelectedMemoId(id));
              }}
            >
              コメントをつける
            </div>
            <div className="text-sm text-center">お気に入りに登録する</div>
            <div className="text-sm text-center">共有する</div>
            <div className="text-sm text-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
