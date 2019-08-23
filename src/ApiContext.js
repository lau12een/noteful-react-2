import React from 'react';

const ApiContext = React.createContext({
    folders: [],
    notes: [],
    addFolder: () => {},
    updateFolder: () => {},
    deleteFolder: () => {},
    addNote: () => {},
    updateNote: () => {},
    deleteNote: () => {}
})

export default ApiContext