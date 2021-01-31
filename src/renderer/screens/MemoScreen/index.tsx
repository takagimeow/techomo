import * as React from 'react';
import { MemoScreenHeader } from 'components/MemoScreenHeader';
import { MemoDraft } from 'components/MemoDraft';
// import { MemoTabs } from 'components/MemoTabs';
import { MemoView } from 'components/MemoView';

export function MemoScreen() {
  return (
    <div>
      <MemoScreenHeader />
      <div className="overflow-y-auto z-30 h-screen pb-32">
        <MemoDraft />
        {/* <MemoTabs /> */}
        <MemoView />
      </div>
    </div>
  );
}
