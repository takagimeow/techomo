import { WorkspaceBuilder } from 'src/core';
import { v4 as uuidv4 } from 'uuid';

export function handleSave(workspaceName: string) {
  const workspaceId = uuidv4();
  const workspace = new WorkspaceBuilder()
    .id(workspaceId)
    .groupId('')
    .index(0)
    .name(workspaceName)
    .channels([])
    .color('#000000')
    .build();
  console.log('workspace: ', workspace);
}
