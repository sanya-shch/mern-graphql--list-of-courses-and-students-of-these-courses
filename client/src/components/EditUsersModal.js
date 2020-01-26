import React, {useState, useEffect, useContext} from 'react';
import { useMutation } from '@apollo/react-hooks';

import {updateUserMutation} from "../graphql/mutations";
import {usersQuery} from "../graphql/queries";

import currentContext from "../context/current/currentContext";

import M from 'materialize-css/dist/js/materialize.min.js';
import {SelectCourse} from "./SelectCourse";

const EditUsersModal = () => {
    const context = useContext(currentContext);
    const { current } = context;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(false);
    const [courseId, setCourseId] = useState('');

    const [updateCourse] = useMutation(
        updateUserMutation,
        {
            refetchQueries: [
                {
                    query: usersQuery,
                    variables: { name: '' }
                }
            ]
        }
    );

    useEffect(() => {
        if (current && current.__typename === "User") {
            setName(current.name);
            setEmail(current.email);
            setStatus(!!current.status);
            setCourseId(current.course.id);
        }
    }, [current]);

    const onSubmit = () => {
        if (name === '' || email === '' || courseId === '') {
            M.toast({ html: 'Please enter all fields' });
        } else {
            updateCourse({ variables: { id: current.id, name, email, status, courseId } })
                .then(() => M.toast({ html: `Updated course: ${name}` }))
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

    const handleChangeCheckbox = () => {
        setStatus((prev) => !prev)
    };

    return (
        <div id='edit_user_modal' className='modal' style={{padding: '2rem'}}>
            <div className='modal-content'>

                <h4 style={{marginBottom: '2rem'}}>Update User</h4>

                <div className='row'>
                    <div className='input-field'>
                        <span className="helper-text">Name of user</span>
                        <input
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='input-field'>
                        <span className="helper-text">Email of user</span>
                        <input
                            type='text'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className='row'>
                    <label>
                        <input
                            type="checkbox"
                            value={status}
                            onChange={handleChangeCheckbox}
                            checked={status}
                        />
                        <span>Status of user</span>
                    </label>
                </div>

                <SelectCourse setCourse={setCourseHandler} currentCourse={courseId}/>

            </div>

            <div className='modal-footer'>
                <a
                    href='#!'
                    onClick={onSubmit}
                    className='modal-close waves-effect blue waves-light btn'
                >
                    Update
                </a>
            </div>
        </div>
    )
};

export default EditUsersModal;