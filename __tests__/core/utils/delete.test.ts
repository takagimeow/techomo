import { deleteParentNode } from '../../../src/core/utils/delete';
import { MemoBuilder } from '../../../src/core/classes/MemoBuilder';
import _ from 'lodash';
import { Memo } from '../../../src/core';
import faker from 'faker';

describe('ノードが何かのノードの子ノードで子要素を抱えている場合はそのノードのgroupIdを子ノードのgroupIdに割り当てる関数', () => {
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
  it('あるチャンネルに属していて、子ノードを所有しているメモが削除されるとき子ノードのgroupIdに自分のgroupIdを割り当てる', () => {
    /**
     * Act
     */
    const { nodes } = deleteParentNode(memos, parentMemo.id as string);
    expect(nodes[0].groupId).toBe(parentMemo.groupId);
    expect(nodes[1].groupId).toBe(parentMemo.groupId);
  });
  it('あるチャンネルに属していて、子ノードを所有しているメモが削除されるとき返される配列の数はそのノードを抜いたあとの配列の数になる', () => {
    /**
     * Act
     */
    const { nodes } = deleteParentNode(memos, parentMemo.id as string);
    expect(nodes.length).toBe(memos.length - 1);
  });
});
