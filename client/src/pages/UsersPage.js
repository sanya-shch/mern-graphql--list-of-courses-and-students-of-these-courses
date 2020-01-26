import React, {useState} from 'react';
import {UsersList} from '../components/UsersList';

export const UsersPage = () => {
    const [search, setSearch] = useState('');

    const searchHandler = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="row">
            <div className="col s8 offset-s2">
                <h1 className="center">Users</h1>

                <div>
                    <div className="input-field col s2">
                        <a href="#add_user_modal" className="btn-flat btn-large blue lighten-3 modal-trigger">
                            <i className='large material-icons'>add</i>
                        </a>
                    </div>

                    <div className="input-field col s4">
                        <input id="search_user_by_name" type="text" className="validate" value={search} onChange={(event) => searchHandler(event)}/>
                        <label htmlFor="search_user_by_name">Search by name</label>
                    </div>
                </div>

                <UsersList search={search}/>
            </div>
        </div>
    )
};
