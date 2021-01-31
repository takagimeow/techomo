import React from 'react';
import { useSelector } from 'react-redux';
import { Memo, parseUniToMultiDimensional } from 'src/core';
import _ from 'lodash';

// eslint-disable-next-line import/extensions
import { parseMultiDimensionalToElements } from './parser';

export function MemoView() {
  // const dispatch = useDispatch();
  const memos: Memo[] = useSelector((reduxState: any) => reduxState.core.memos);
  const memoIds: string[] = useSelector((reduxState: any) => reduxState.core.memoIds);
  const selectedChannelId: string = useSelector(
    (reduxState: any) => reduxState.core.selectedChannelId,
  );
  const filteredMemos = _.filter(memos, {
    groupId: selectedChannelId,
  });
  const multiDimensional = parseUniToMultiDimensional(memos, filteredMemos, '', memoIds);

  return <div className="">{parseMultiDimensionalToElements(multiDimensional, 0)}</div>;
}
