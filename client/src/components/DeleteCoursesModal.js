import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import {deleteCourseMutation} from "../graphql/mutations";
import {coursesQuery} from "../graphql/queries";

import M from 'materialize-css/dist/js/materialize.min.js';

const DeleteCoursesModal = ({ current: {id, name} }) => {

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
        deleteCourse({ variables: {id} })
            .then(() => M.toast({ html: `Course ${name} deleted` }))
            .catch(() => M.toast({ html: 'Something went wrong' }));
    };

    const onClickNotDeleteHandler = () => {

    };

    return (
        <div id='delete-course-modal' className='modal' style={{padding: '2rem'}}>
            <div className='modal-content'>

                <h3 style={{marginBottom: '2rem'}}>Are you sure you want to delete the course</h3>

            </div>

            <div className='modal-footer'>
                <a
                    href='#!'
                    onClick={onClickNotDeleteHandler}
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