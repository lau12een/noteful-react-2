import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import PropTypes from 'prop-types';
import config from '../config';
import './AddNote.css';

class AddNote extends Component {

    static contextType = ApiContext

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            newNote: '',
            newFolderName: '',
            newContent: '',
        }

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeFolder = this.handleChangeFolder.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
    }

    handleChangeTitle(event) {
        this.setState({newNote: event.target.value})
    }

    handleChangeFolder(event) {
        this.setState({newFolderName: event.target.value})
    }

    handleChangeContent(event) {
        this.setState({newContent: event.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.newFolderName);
        const { noteTitle } = e.target
        // const newNoteName = noteName.value
        const newNoteTitle = this.state.newNote;
        const { noteContent } = e.target
        // const newNoteContent = noteContent.value
        const newNoteContent = this.state.newContent;
        const selectedFolder = document.getElementById("noteFolder")
        // const selectedFolder = this.state.newFolderName;
        // how to rework this to call from state?
        const noteFolder = selectedFolder.options[selectedFolder.selectedIndex]
        const noteFolderId = noteFolder.id
        const dateModified = new Date()
        // const newId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        const newNote = {
            // id: newId,
            title: newNoteTitle,
            date_modified: dateModified,
            folder_id: noteFolderId,
            content: newNoteContent
        }

        this.setState({ error: null })
        fetch(config.API_NOTES, {
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => {
                if(!response.ok) {
                    return response.json().then(error => {
                        throw error
                    })
                }
                return response.json()
            })
            .then(data => {
                noteTitle.value=''
                noteContent.value=''
                this.context.addNote(data)
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    }

    render() {

        const { folders } = this.context
        const folderList = folders.map(folder =>
            <option value={folder.name} key={folder.id} id={folder.id}>{folder.name}</option>
        )

        return(
            <form className="add-note-form" onSubmit={this.handleSubmit}>
                <label htmlFor="noteTitle">
                    Note Title:
                </label>
                <input
                    type="text"
                    name="noteTitle"
                    id="noteTitle"
                    aria-label="Title for your new note"
                    aria-required="true"
                    onChange={this.handleChangeTitle}
                    required
                >
                </input>
                <label htmlFor="noteContent">
                    Note Content:
                </label>
                <textarea
                    type="text"
                    name="noteContent"
                    id="noteContent"
                    aria-label="Contents of your new note"
                    aria-required="true"
                    onChange={this.handleChangeContent}
                    required
                >
                </textarea>
                <label htmlFor="noteFolder">
                    Select Folder:
                </label>
                <select
                    name="noteFolder"
                    id="noteFolder"
                    aria-label="Select a folder for your new note"
                    aria-required="true"
                    onChange={this.handleChangeFolder}
                    required
                >
                    {folderList}
                </select>
                <button type="submit">
                    Add Note
                </button>
                <button type="button" onClick={this.handleClickCancel}>
                    Cancel
                </button>
            </form>
        )
    }
}

export default AddNote

AddNote.propTypes = {
    history: PropTypes.object
}