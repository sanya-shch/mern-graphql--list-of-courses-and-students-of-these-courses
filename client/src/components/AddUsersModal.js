import React, {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';

import {addUserMutation} from "../graphql/mutations";
import {usersQuery} from "../graphql/queries";
import {SelectCourse} from "./SelectCourse";

import M from 'materialize-css/dist/js/materialize.min.js';

const AddUsersModal = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(false);
    const [courseId, setCourseId] = useState('');

    const [addUser] = useMutation(
        addUserMutation,
        {
            refetchQueries: [
                {
                    query: usersQuery,
                    variables: { name: '' }
                }
            ]
        }
    );

    const onSubmit = () => {
        if (name === '' || email === '' || courseId === '') {
            M.toast({ html: 'Please enter all fields' });
        } else {
            addUser({ variables: { name, email, status, courseId } })
                .then(() => M.toast({ html: `Added new user: ${name}` }))
                .catch(() => M.toast({ html: 'Something went wrong' }));

            setName('');
            setEmail('');
            setStatus(false);
            setCourseId('');
        }
    };

    const setCourseHandler = (value) => {
        setCourseId(value)
    };

    return (
        <div id='add_user_modal' className='modal' style={{padding: '2rem'}}>
            <div className='modal-content'>

                <h4 style={{marginBottom: '2rem'}}>Add User</h4>

                <div className='row'>
                    <div className='input-field'>
                        <input
                            type='text'
                            name='name'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <label htmlFor='name' className='active'>
                            Name of user
                        </label>
                    </div>
                </div>

                <div className='row'>
                    <div className='input-field'>
                        <input
                            type='text'
                            name='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <label htmlFor='email' className='active'>
                            Email of user
                        </label>
                    </div>
                </div>

                <div className='row'>
                    <label>
                        <input
                            type="checkbox"
                            value={status}
                            onChange={e => setStatus(!!e.target.value)}
                        />
                        <span>Status of user</span>
                    </label>
                </div>

               <SelectCourse setCourse={setCourseHandler} currentCourse=""/>

            </div>

            <div className='modal-footer'>
                <a
                    href='#!'
                    onClick={onSubmit}
                    className='modal-close waves-effect blue waves-light btn'
                >
                    Add
                </a>
            </div>
        </div>
    );
};

export default AddUsersModal;