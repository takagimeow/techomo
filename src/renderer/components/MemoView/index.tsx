import React from 'react';
import ReactMarkdown from 'react-markdown';
import { MemoNode } from 'components/MemoNode';

export function MemoView() {
  return (
    <div className="">
      <MemoNode level={0} />
      <MemoNode level={1} />
      <MemoNode level={2} />
      <MemoNode level={0} />
    </div>
  );
}