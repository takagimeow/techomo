import React, { useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCoreMemoIds,
  changeCoreMemos,
  changeCoreSelectedMemoId,
} from 'src/actions/coreActions';
import { convertDateToAgoText } from 'src/utils/converter';
import { Memo } from 'src/core/classes/Memo';
import { deleteParentNode } from 'src/core/utils/delete';
import { saveNode } from 'src/core/utils/save';
import { ipcRenderer } from 'electron';

export function MemoNode({
  id = '',
  body = '',
  level = 0,
  saved = false,
  createdAt,
}: {
  id: string;
  body: string;
  level: number;
  saved?: boolean;
  createdAt: Date | null;
}) {
  const dispatch = useDispatch();
  const memos: Memo[] = useSelector((reduxState: any) => reduxState.core.memos);
  const memoIds: string[] = useSelector((reduxState: any) => reduxState.core.memoIds);
  const selectedMemoId: string = useSelector((reduxState: any) => reduxState.core.selectedMemoId);

  const handleSave = useCallback(() => {
    const result = saveNode(memos, id);
    const { nodes } = result;
    dispatch(changeCoreMemos(nodes));
    dispatch(changeCoreMemoIds(memoIds));
    ipcRenderer.send('save-memos-message', JSON.stringify(nodes));
  }, [memos, memoIds, id]);

  const handleDelete = useCallback(() => {
    const { nodes, ids } = deleteParentNode(memos, id);
    const newMemoIds = [...ids] as string[];
    for (let i = 0; i < memoIds.length; i += 1) {
      if (memoIds[i] !== id) {
        newMemoIds.push(memoIds[i]);
      }
    }
    dispatch(changeCoreMemos(nodes));
    dispatch(changeCoreMemoIds(newMemoIds));
    ipcRenderer.send('save-memos-message', JSON.stringify(nodes));
  }, [memos, memoIds, id]);

  const handleSaveMemosReply = useCallback(() => {
    ipcRenderer.send('save-memoIds-message', JSON.stringify(memoIds));
  }, [memoIds]);

  ipcRenderer.on('save-memos-reply', handleSaveMemosReply);

  return (
    <div
      className={`border-b border-gray-400 ${
        selectedMemoId !== id ? 'hover:bg-gray-100' : 'bg-gray-100'
      }`}
      onClick={() => {
        if (selectedMemoId === id) {
          dispatch(changeCoreSelectedMemoId(''));
        } else {
          dispatch(changeCoreSelectedMemoId(id));
        }
      }}
    >
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
              className="hover:text-gray-400 select-none text-sm"
              onClick={() => {
                dispatch(changeCoreSelectedMemoId(id));
              }}
            >
              コメント
            </div>
            <div
              className={`select-none text-sm text-center ${
                saved ? 'text-red-400 hover:text-red-200' : 'hover:text-gray-400'
              }`}
              onClick={handleSave}
            >
              お気に入りに登録
            </div>
            <div
              className="hover:text-gray-400 select-none text-sm text-center"
              onClick={handleDelete}
            >
              削除
            </div>
            <div className="hover:text-gray-400 select-none text-sm text-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
