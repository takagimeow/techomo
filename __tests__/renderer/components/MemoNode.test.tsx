import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider as ReduxProvider } from 'react-redux';
import { configureStore } from '../../../src/store/configureStore';
import { MemoNode } from '../../../src/renderer/components/MemoNode';
import * as coreActions from '../../../src/actions/coreActions';
import { Memo, MemoBuilder } from '../../../src/core';
import faker from 'faker';
import { ipcRenderer } from 'electron';

jest.mock('electron');
describe('メモ本体を表すコンポーネント', () => {
  /**
   * Arrange
   */
  let store: ReturnType<typeof configureStore>;
  let memos = [] as Memo[];
  let ids = [] as string[];
  let parentMemo: Memo;
  let childMemo1: Memo;
  let childMemo2: Memo;
  let changeCoreMemosSpy: ReturnType<typeof jest.spyOn>;
  let changeCoreMemoIdsSpy: ReturnType<typeof jest.spyOn>;
  // let ipcRendererSendSpy: ReturnType<typeof jest.spyOn>;
  beforeAll(() => {
    /**
     * Arrange
     */

    parentMemo = new MemoBuilder()
      .id('parent')
      .groupId('parentChannel')
      .index(0)
      .name('')
      .body(faker.lorem.text())
      .color('')
      .build();
    childMemo1 = new MemoBuilder()
      .id('child1')
      .groupId('parent')
      .index(0)
      .name('')
      .body(faker.lorem.text())
      .color('')
      .build();
    childMemo2 = new MemoBuilder()
      .id('child2')
      .groupId('parent')
      .index(0)
      .name('')
      .body(faker.lorem.text())
      .color('')
      .build();
    memos = [parentMemo, childMemo1, childMemo2];
    ids = memos.map((memo) => memo.id as string);
    store = configureStore();
  });
  beforeEach(() => {
    /**
     * Arrange
     */
    store.dispatch(coreActions.changeCoreMemos(memos));
    store.dispatch(coreActions.changeCoreMemoIds([parentMemo.id as string]));
    changeCoreMemosSpy = jest.spyOn(coreActions, 'changeCoreMemos');
    changeCoreMemoIdsSpy = jest.spyOn(coreActions, 'changeCoreMemoIds');
  });
  afterEach(() => {
    jest.clearAllMocks();
    // jest.resetAllMocks();
  });
  it('削除ボタンが押されたらそのノードの存在がreduxから消されれ、子ノードがあれば上位に昇格する', async () => {
    /**
     * Arrange
     */
    const { getByText } = render(
      <ReduxProvider store={store}>
        <MemoNode
          id={memos[0].id as string}
          body={memos[0].body as string}
          level={0}
          createdAt={memos[0].createdAt as Date}
        />
      </ReduxProvider>,
    );
    /**
     * Act
     */
    fireEvent.click(getByText('削除'));
    /**
     * Assert
     */
    await waitFor(() => {
      expect(changeCoreMemosSpy).toHaveBeenCalledWith([childMemo1, childMemo2]);
      expect(changeCoreMemoIdsSpy).toBeCalledWith([
        childMemo1.id as string,
        childMemo2.id as string,
      ]);
    });
  });

  it('削除ボタンが押されたらそのノードの存在がメモリーから削除される', async () => {
    /**
     * Arrange
     */
    const { getByText } = render(
      <ReduxProvider store={store}>
        <MemoNode
          id={memos[0].id as string}
          body={memos[0].body as string}
          level={0}
          createdAt={memos[0].createdAt as Date}
        />
      </ReduxProvider>,
    );
    /**
     * Act
     */
    fireEvent.click(getByText('削除'));
    /**
     * Assert
     */
    await waitFor(() => {
      expect(ipcRenderer.send).toHaveBeenCalledWith('save-memos-message', JSON.stringify([childMemo1, childMemo2]));
    });
  });
});
