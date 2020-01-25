import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import {addCourseMutation} from "../graphql/mutations";
import {coursesQuery} from "../graphql/queries";

import M from 'materialize-css/dist/js/materialize.min.js';

const AddCoursesModal = () => {

    const [courseName, setCourseName] = useState('');
    const [code, setCode] = useState('');

    const [addCourse] = useMutation(
        addCourseMutation,
        {
            refetchQueries: [
                {
                    query: coursesQuery,
                    variables: { name: '' }
                }
            ]
        }
    );

    const onSubmit = () => {
        if (courseName === '' || code === '') {
            M.toast({ html: 'Please enter a name and code' });
        } else {
            addCourse({ variables: { name: courseName, code } })
                .then(() => M.toast({ html: `Added new course: ${courseName}` }))
                .catch(() => M.toast({ html: 'Something went wrong' }));

            setCourseName('');
            setCode('');
        }
    };

    return (
        <div id='add-course-modal' className='modal' style={{padding: '2rem'}}>
            <div className='modal-content'>

                <h4 style={{marginBottom: '2rem'}}>Add Course</h4>

                <div className='row'>
                    <div className='input-field'>
                        <input
                            type='text'
                            name='name'
                            value={courseName}
                            onChange={e => setCourseName(e.target.value)}
                        />
                        <label htmlFor='name' className='active'>
                            Name of course
                        </label>
                    </div>
                </div>

                <div className='row'>
                    <div className='input-field'>
                        <input
                            type='text'
                            name='name'
                            value={code}
                            onChange={e => setCode(e.target.value)}
                        />
                        <label htmlFor='name' className='active'>
                            Code
                        </label>
                    </div>
                </div>

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

export default AddCoursesModal;