import React, {useContext} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {usersQuery} from "../graphql/queries";
import {Loader} from "./Loader";
import currentContext from "../context/current/currentContext";

export const UsersList = ({search}) => {
    const context = useContext(currentContext);
    const { setCurrent } = context;

    const { loading, data } = useQuery(
        usersQuery,
        {
            variables: {
                name: search || ''
            }
        }
    );

    const editClickHandler = (user) => {
        setCurrent(user)
    };

    const deleteClickHandler = (user) => {
        setCurrent(user)
    };

    return (
        <div>
            <table className="centered">
                <thead>
                <tr>
                    <th>№</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>STATUS</th>
                    <th>COURSE</th>
                    <th>actions</th>
                </tr>
                </thead>

                {
                    !loading && <tbody>
                        {
                            data.users.map((user, index) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.status
                                                    ? <span className="green-text">Active</span>
                                                    : <span className="red-text">Inactive</span>
                                            }
                                        </td>
                                        <td>{user.course.name}</td>
                                        <td>
                                            <a
                                                className="btn-floating btn-small waves-effect waves-light green modal-trigger"
                                                style={{marginRight: '2rem'}}
                                                onClick={() => editClickHandler(user)}
                                                href='#edit_user_modal'
                                            >
                                                <i className="material-icons">edit</i>
                                            </a>
                                            <a
                                                className="btn-floating btn-small waves-effect waves-light red modal-trigger"
                                                onClick={() => deleteClickHandler(user)}
                                                href='#delete_user_modal'
                                            >
                                                <i className="material-icons">delete</i>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                }
            </table>

            {
                loading ? <Loader/> : data.users.length === 0 && <h4>No users to show...</h4>
            }
        </div>
    )
};