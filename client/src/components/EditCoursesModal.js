import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import {updatedCourseMutation} from "../graphql/mutations";
import {coursesQuery} from "../graphql/queries";

import M from 'materialize-css/dist/js/materialize.min.js';

const EditCoursesModal = ({ current }) => {

    const [courseName, setCourseName] = useState('');
    const [code, setCode] = useState('');

    const [updateCourse] = useMutation(updatedCourseMutation,
        {
            refetchQueries: [
                {
                    query: coursesQuery,
                    variables: { name: '' }
                }
            ]
        }
    );

    useEffect(() => {
        if (current) {
            setCourseName(current.name);
            setCode(current.code);
        }
    }, [current]);

    const onSubmit = () => {
        if (courseName === '' || code === '') {
            M.toast({ html: 'Please enter a name and code' });
        } else {
            updateCourse({ variables: { id: current.id, name: courseName, code } })
                .then(() => M.toast({ html: `Updated course: ${courseName}` }))
                .catch(() => M.toast({ html: 'Something went wrong' }));
        }
    };

    return (
        <div id='edit-course-modal' className='modal' style={{padding: '2rem'}}>
            <div className='modal-content'>

                <h4 style={{marginBottom: '2rem'}}>Update Course</h4>

                <div className='row'>
                    <div className='input-field'>
                        <span className="helper-text">Name of course</span>
                        <input
                            type='text'
                            id='name'
                            value={courseName}
                            onChange={e => setCourseName(e.target.value)}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='input-field'>
                        <span className="helper-text">Code</span>
                        <input
                            type='text'
                            name='code'
                            value={code}
                            onChange={e => setCode(e.target.value)}
                        />
                    </div>
                </div>

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

export default EditCoursesModal;