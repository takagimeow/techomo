import React from 'react';
import { Relationship } from 'src/core/utils/parser';
import { Memo } from 'src/core/classes/Memo';
import { MemoNode } from 'components/MemoNode';
import _ from 'lodash';

export function parseMultiDimensionalToElements(
  multidimensional: Relationship<Memo>[],
  level: number,
) {
  const elements = multidimensional.map((relationship) => {
    const { parent, children } = relationship;
    const childrenElements = parseMultiDimensionalToElements(
      children,
      level + 1,
    ) as React.ReactElement[];
    return _.flattenDeep([
      <MemoNode
        id={parent.id || ''}
        body={parent.body || ''}
        level={level}
        saved={parent.saved}
        createdAt={parent.createdAt || null}
      />,
      ...childrenElements,
    ]) as React.ReactElement[];
  });

  return _.flattenDeep(elements);
}
