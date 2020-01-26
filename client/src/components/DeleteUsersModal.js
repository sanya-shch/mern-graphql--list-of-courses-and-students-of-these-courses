import React, {useContext} from 'react';
import { useMutation } from '@apollo/react-hooks';

import {deleteUserMutation} from "../graphql/mutations";
import {usersQuery} from "../graphql/queries";

import currentContext from "../context/current/currentContext";

import M from 'materialize-css/dist/js/materialize.min.js';

const DeleteUsersModal = () => {
    const context = useContext(currentContext);
    const { current } = context;

    const [deleteUser] = useMutation(deleteUserMutation,
        {
            refetchQueries: [
                {
                    query: usersQuery,
                    variables: { name: '' }
                }
            ]
        }
    );

    const onClickDeleteHandler = () => {
        deleteUser({ variables: {id: current.id} })
            .then(() => M.toast({ html: `User ${current.name} deleted` }))
            .catch(() => M.toast({ html: 'Something went wrong' }));
    };

    return (
        <div id='delete_user_modal' className='modal' style={{padding: '2rem'}}>
            <div className='modal-content'>

                <h3 style={{marginBottom: '2rem'}}>Are you sure you want to delete the user</h3>

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

export default DeleteUsersModal;