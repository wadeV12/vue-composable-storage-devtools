import { DevtoolsPluginApi } from '@vue/devtools-api';
import { Ref } from '@vue/composition-api';

export type ComposableStorage = Record<string, Ref>;

const COMPOSABLE_STORAGE_ID = 'composable-storage';

export const setupPlugin = (api: DevtoolsPluginApi<any>, storage: ComposableStorage) => {
  api.addInspector({
    id: COMPOSABLE_STORAGE_ID,
    label: 'Composable Storage',
    icon: 'storage',
  });

  if (!storage) {
    throw Error('No storage provided');
  }

  api.on.getInspectorTree(payload => {
    if (payload.inspectorId === COMPOSABLE_STORAGE_ID) {
      payload.rootNodes = Object.keys(storage).map(key => ({
        id: key,
        label: key,
      }))
    }
  })

  api.on.getInspectorState(payload => {
    if (payload.inspectorId === COMPOSABLE_STORAGE_ID) {
      const storageState = Object.entries(storage[payload.nodeId]).map(([key, { value }]) => ({ key, value }));

      payload.state = {
        state: storageState,
      }
    }
  })

}
