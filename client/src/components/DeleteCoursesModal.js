import React, {useContext} from 'react';
import { useMutation } from '@apollo/react-hooks';

import {deleteCourseMutation} from "../graphql/mutations";
import {coursesQuery} from "../graphql/queries";

import currentContext from "../context/current/currentContext";

import M from 'materialize-css/dist/js/materialize.min.js';

const DeleteCoursesModal = () => {
    const context = useContext(currentContext);
    const { current } = context;

    const [deleteCourse] = useMutation(deleteCourseMutation,
        {
            refetchQueries: [
                {
                    query: coursesQuery,
                    variables: { name: '' }
                }
            ]
        }
    );

    const onClickDeleteHandler = () => {
        deleteCourse({ variables: {id: current.id} })
            .then(() => M.toast({ html: `Course ${current.name} deleted` }))
            .catch(() => M.toast({ html: 'Something went wrong' }));
    };

    return (
        <div id='delete-course-modal' className='modal' style={{padding: '2rem'}}>
            <div className='modal-content'>

                <h3 style={{marginBottom: '2rem'}}>Are you sure you want to delete the course</h3>

            </div>

            <div className='modal-footer'>
                <a
                    href='#!'
                    className='modal-close waves-effect blue waves-light btn'
                    style={{marginRight: '1rem'}}
                >
                    No
                </a>
                <a
                    href='#!'
                    onClick={onClickDeleteHandler}
                    className='modal-close waves-effect red waves-light btn'
                >
                    Yes
                </a>
            </div>
        </div>
    );
};

export default DeleteCoursesModal;