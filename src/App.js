import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import MainSidebar from './Sidebar/MainSidebar';
import FolderSidebar from './Sidebar/FolderSidebar';
import NoteSidebar from './Sidebar/NoteSidebar';
import ApiContext from './ApiContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import NotefulError from './NotefulError';
import config from './config';
import './App.css'

// TODO: create PATCH ability for folders and notes

class App extends Component {
  
  state = {
    folders: [],
    notes: [],
    error: null,
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note =>
      note.id !== Number(noteId)
    )
    this.setState({
      notes: newNotes
    })
  }

  addFolder = newFolder => {
    this.setState({
      folders: [...this.state.folders, newFolder]
    })
  }

  addNote = newNote => {
    this.setState({
      notes: [...this.state.notes, newNote]
    })
  }

  updateNote = () => {};

  componentDidMount() {
    Promise.all([
      fetch(config.API_FOLDERS, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        }
      }),
      fetch(config.API_NOTES, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        }
      })
    ]).then(([foldersResponse, notesResponse]) => {
        if (!foldersResponse.ok) {
          throw new Error(foldersResponse.status)
        };
        if (!notesResponse.ok) {
          throw new Error(notesResponse.status)
        };
        return Promise.all([foldersResponse.json(), notesResponse.json()]);
      })
      .then(([folders, notes]) => {
        this.setState({folders, notes})
      })
      .catch(error => this.setState({ error }))
  }


  render() {

    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
      updateNote: this.updateNote
    }

    return (
      <div className='App'>
        <header className="header">
          <h1><Link to="/">Noteful</Link></h1>
        </header>
        <ApiContext.Provider value={contextValue}>
          <div className="app-body">
            <nav className="sidebar">
              <NotefulError>
                <Route
                  exact path='/'
                  component={MainSidebar}
                />
                <Route
                  path='/folder/:folderID'
                  component={FolderSidebar}
                />
                <Route
                  path='/note/:noteID'
                  component={NoteSidebar}
                />
              </NotefulError>
            </nav>
            <main className="main">
              <NotefulError>
                <Route
                  path='/add-folder'
                  component={AddFolder}
                />
                <Route
                  path='/add-note'
                  component={AddNote}
                />
              </NotefulError>
            </main>
          </div>
        </ApiContext.Provider>
      </div>
    );
  }
}

export default App;