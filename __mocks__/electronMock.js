jest.mock('electron', () => ({
  ipcRenderer: {
    on: jest.fn(),
    send: jest.fn(),
  }
}));
