import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Memo, parseUniToMultiDimensional } from 'src/core';
import _ from 'lodash';

// eslint-disable-next-line import/extensions
import { Relationship } from 'src/core/utils/parser';
// eslint-disable-next-line import/extensions
import { parseMultiDimensionalToElements } from './parser';

export function MemoView() {
  // const dispatch = useDispatch();
  const memos: Memo[] = useSelector((reduxState: any) => reduxState.core.memos);
  const memoIds: string[] = useSelector((reduxState: any) => reduxState.core.memoIds);
  const selectedChannelId: string = useSelector(
    (reduxState: any) => reduxState.core.selectedChannelId,
  );
  const [multiDimensional, setMultiDimensional] = useState<Relationship<Memo>[]>([]);

  useEffect(() => {
    const filteredMemos = _.filter(memos, {
      groupId: selectedChannelId,
    });
    const newMultiDimensinal = parseUniToMultiDimensional(memos, filteredMemos, '', memoIds);
    setMultiDimensional(newMultiDimensinal);
  }, [memos, selectedChannelId, memoIds]);

  const x = useCallback(parseMultiDimensionalToElements, [multiDimensional]);
  return <div className="">{x(multiDimensional, 0)}</div>;
}
