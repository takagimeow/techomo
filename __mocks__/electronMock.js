jest.mock('electron', () => ({
  ipcRenderer: {
    send: jest.fn(),
  }
}));
