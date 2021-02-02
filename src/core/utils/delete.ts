import _ from 'lodash';
import { Base } from '../classes/Base';

export function deleteParentNode<T extends Base>(nodes: T[], targetId: string) {
  // まず削除対象のIDを持つノードと削除対象のIDをgroupIDとして持つノードを取得する
  const foundIndex = _.findIndex(nodes, (node) => {
    if (node.id === targetId) {
      return true;
    }
    return false;
  });

  if (foundIndex < 0)
    return {
      nodes,
      ids: [],
    };
  // 親のノードを取得
  const parentNode = nodes[foundIndex];
  // 子のノードの配列を取得
  let childNodes = _.filter(nodes, (node) => {
    if (node.groupId === targetId) {
      return true;
    }
    return false;
  });
  // 子のノードのgroupIdを親のgroupIdに変更する
  childNodes = childNodes.map((node) => {
    const clonedNode = node;
    clonedNode.groupId = parentNode.groupId;
    return clonedNode;
  });
  const childNodesIds = childNodes.map((node) => node.id as string);

  // 要素の更新を行う
  let clonedNodes = nodes;
  childNodes.forEach((childNode) => {
    const index = _.findIndex(nodes, (node) => {
      if (childNode.id === node.id) {
        return true;
      }
      return false;
    });
    clonedNodes[index] = childNode;
  });
  clonedNodes = _.filter(clonedNodes, (node) => {
    if (node.id === targetId) {
      return false;
    }
    return true;
  });
  return {
    nodes: clonedNodes,
    ids: childNodesIds,
  };
}
