
export const CONTENT_STATUS = {
  0: 'DRAFT',
  1: 'PUBLISH',
  2: 'TRASH'
};

export const CONTENT_REVISION_TYPE = {
  live: 'LIVE',
  working: 'WORKING',
  revisions: 'REVISION',
  autosaves: 'AUTOSAVE'
};

export const CONTENT_SCHEMA = {
  page: 'Page',
  file: 'File',
  folder: 'Folder',
  pattern: 'Pattern'
};

export function getStatusName(value) {
    return Object.keys(CONTENT_STATUS).find(key => CONTENT_STATUS[key] === value);
}

export function getSchemaName(value) {
    return Object.keys(CONTENT_SCHEMA).find(key => CONTENT_SCHEMA[key] === value);
}