import { setupDevtoolsPlugin } from '@vue/devtools-api';
import { ComposableStorage, setupPlugin } from './plugin';

export const setupDevTools = (app, storage: ComposableStorage) => {
  setupDevtoolsPlugin(
    {
      id: 'composable-storage-devtools-plugin',
      label: 'Composable Storage Plugin',
      packageName: 'composable-storage-devtools-plugin',
      app,
    },
    (api) => setupPlugin(api, storage)
  )
}
