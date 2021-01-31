/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

// console.log('👋 This message is being logged by "renderer.js", included via webpack');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { App } from 'src/renderer/components/App';
import { Layout } from 'src/renderer/components/Layout';
import { Provider } from 'react-redux';
import { configureStore } from 'src/store/configureStore';

import 'tailwindcss/tailwind.css';
import './index.css';

const store = configureStore();

const Index = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <App />
      </Layout>
    </Router>
  </Provider>
);

ReactDOM.render(<Index />, document.getElementById('app'));
