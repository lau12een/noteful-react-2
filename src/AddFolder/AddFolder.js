import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import PropTypes from 'prop-types';
import config from '../config';
import './AddFolder.css';


class AddFolder extends Component {

    static contextType = ApiContext;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            newFolder: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({newFolder: event.target.value})
    }

    handleSubmit = e => {
        e.preventDefault();
        const { folderName } = e.target
        // const userFolder = folderName.value
        const userFolder = this.state.newFolder;
        // const newId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const newFolder = {
            // id: newId,
            name: userFolder
        }
        this.setState({ error: null })
        fetch(config.API_FOLDERS, {
            method: 'POST',
            body: JSON.stringify(newFolder),
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
                folderName.value=''
                this.context.addFolder(data)
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({ error })
            })
    }


    handleClickCancel = () => {
        this.props.history.push('/')
      };

    render() {
        return (
            <form className="add-folder-form" onSubmit={this.handleSubmit}>
                <label htmlFor="folderName">
                    New Folder Name:
                    <span className="requiredField">(required)</span>
                </label>
                <input
                    type="text"
                    name="folderName"
                    id="folderName"
                    value={this.state.newFolder}
                    onChange={this.handleChange}
                    aria-label="Create a new folder for your notes"
                    aria-required="true"
                    required
                >
                </input>
                <button type="submit">
                    Add Folder
                </button>
                <button type="button" onClick={this.handleClickCancel}>
                    Cancel
                </button>
            </form>
        )
    }
}


export default AddFolder

AddFolder.propTypes = {
    history: PropTypes.object
}