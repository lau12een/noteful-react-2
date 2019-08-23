import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ApiContext from '../ApiContext';
import './FolderSidebar.css';


export default class FolderSidebar extends Component {

    static contextType = ApiContext

    render() {
        const { folders } = this.context

        const sidebarFolders = folders.map(folder =>
            <li key={folder.id}>
                <NavLink
                    to={`/folder/${folder.id}`}
                    activeClassName="current"
                    key={folder.id}
                    aria-label={`"See notes in this folder: ${folder.name}"`}
                >
                    {folder.name}
                </NavLink>
            </li>
        )
        return (
            <ul className="folder-list">
                {sidebarFolders}
            </ul>
        )
    }
}