import _ from 'lodash';
import { Base } from '../classes/Base';

export function saveNode<T extends Base>(nodes: T[], targetId: string) {
  // 指定したノードを取得する
  const foundIndex = _.findIndex(nodes, (node) => {
    if (node.id === targetId) {
      return true;
    }
    return false;
  });
  if (foundIndex < 0) {
    return {
      nodes,
      id: '',
    };
  }

  const targetNode = nodes[foundIndex];
  targetNode.editSaved(!targetNode.saved);
  const clonedNodes = _.clone(nodes);
  clonedNodes[foundIndex] = targetNode;
  return {
    nodes: clonedNodes,
    id: targetNode.saved ? targetId : '',
  };
}
