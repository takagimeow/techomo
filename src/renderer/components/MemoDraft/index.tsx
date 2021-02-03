import React, { useCallback, useReducer } from 'react';
import ReactMde from 'react-mde';
// @ts-ignore
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import 'react-mde/lib/styles/css/react-mde-all.css';
// import { save, loadSuggestions } from './callbacks';
import { MemoBuilder } from 'src/core';
import { v4 as uuidv4 } from 'uuid';
import {
  changeCoreMemoIds,
  changeCoreMemos,
  changeCoreSelectedMemoId,
} from 'src/actions/coreActions';
import { ipcRenderer } from 'electron';
import { changeValue } from './actions';
import { reducer } from './redux';

export function MemoDraft() {
  const dispatch = useDispatch();
  const [state, localDispatch] = useReducer(reducer, {
    value: '**なにか入力してみてください**',
  });
  const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview' | undefined>('write');
  const selectedChannelId: string = useSelector(
    (reduxState: any) => reduxState.core.selectedChannelId,
  );
  const selectedMemoId: string = useSelector((reduxState: any) => reduxState.core.selectedMemoId);
  const memos = useSelector((reduxState: any) => reduxState.core.memos);
  const memoIds = useSelector((reduxState: any) => reduxState.core.memoIds);
  const handleChange = (newValue: string) => {
    localDispatch(changeValue(newValue));
  };

  const handleSave = () => {
    const memoId = uuidv4();
    const memo = new MemoBuilder()
      .id(memoId)
      .groupId(selectedMemoId !== '' ? selectedMemoId : selectedChannelId)
      .index(0)
      .name('')
      .body(state.value)
      .color('#000000')
      .saved(false)
      .build();
    dispatch(changeCoreMemos([...memos, memo]));
    if (selectedMemoId === '') {
      dispatch(changeCoreMemoIds([...memoIds, memoId]));
    }
    dispatch(changeCoreSelectedMemoId(''));
    localDispatch(changeValue(''));
    ipcRenderer.send('save-memos-message', JSON.stringify([...memos, memo]));
  };

  const handleSaveMemosReply = useCallback(() => {
    ipcRenderer.send('save-memoIds-message', JSON.stringify(memoIds));
  }, [memoIds]);

  ipcRenderer.on('save-memos-reply', handleSaveMemosReply);

  return (
    <div className="flex flex-col px-3 py-3 border-b border-gray-400">
      <div className="py-2">
        <ReactMde
          value={state.value}
          onChange={handleChange}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={async (markdown) => <ReactMarkdown source={markdown} />}
          childProps={{
            writeButton: {
              tabIndex: -1,
            },
          }}
          // loadSuggestions={loadSuggestions}
          /*
          paste={{
            saveImage: save,
          }}
          */
        />{' '}
      </div>
      <div className="flex flex-row justify-end">
        <div
          className="hover:bg-blue-700 rounded-md border border-gray-800 py-2 px-3 bg-blue-600"
          onClick={handleSave}
        >
          <p className="select-none text-cneter text-blue-50">投稿する</p>
        </div>
      </div>
    </div>
  );
}
