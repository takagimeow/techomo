import { saveNode } from '../../../src/core/utils/save';
import { MemoBuilder } from '../../../src/core/classes/MemoBuilder';
import _ from 'lodash';
import { Memo } from '../../../src/core';
import faker from 'faker';

describe('引数で指定したノードのsavedのtrueとfalseを切り替える関数', () => {
  let memos = [] as Memo[];
  let parentMemo: Memo;
  let childMemo1: Memo;
  let childMemo2: Memo;
  beforeEach(() => {
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
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it('ノードのsavedがfalseの場合はtrueに設定する', () => {
    /**
     * Act
     */
    const nodes = saveNode(memos, memos[0].id as string);
    expect(nodes[0].saved).toBe(true);
  });
  it('ノードのsavedがtrueの場合はfalseに設定する', () => {
    /**
     * Act
     */
    memos[0].editSaved(true);
    const nodes = saveNode(memos, memos[0].id as string);
    expect(nodes[0].saved).toBe(false);
  });
});
