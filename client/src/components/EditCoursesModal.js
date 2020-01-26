import React, {useState, useEffect, useContext} from 'react';
import { useMutation } from '@apollo/react-hooks';

import {updatedCourseMutation} from "../graphql/mutations";
import {coursesQuery} from "../graphql/queries";

import currentContext from "../context/current/currentContext";

import M from 'materialize-css/dist/js/materialize.min.js';

const EditCoursesModal = () => {
    const context = useContext(currentContext);
    const { current } = context;

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
        if (current && current.__typename === "Course") {
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


    const handleChangeName = (e) => {
        setCourseName(e.target.value)
    };


    const handleChangeCode = (e) => {
        setCode(e.target.value)
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
                            id='input_name'
                            value={courseName}
                            onChange={e => handleChangeName(e)}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='input-field'>
                        <span className="helper-text">Code</span>
                        <input
                            type='text'
                            id='input_code'
                            value={code}
                            onChange={e => handleChangeCode(e)}
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