// manage localStorage

const StorageKey = 'swagger-viewer.haishan.me';

export const initialState = {
  specs: {},
  allSpecs: [],
};

function loadState() {
  try {
    const serialized = localStorage.getItem(StorageKey);
    if (!serialized) return initialState;
    return JSON.parse(serialized);
  } catch (err) {
    return initialState;
  }
}

function saveState(state) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(StorageKey, serialized);
  } catch (err) {
    // ignore
  }
}

function clearState() {
  try {
    localStorage.removeItem(StorageKey);
  } catch (err) {
    // ignore
  }
}

export { loadState, saveState, clearState };
