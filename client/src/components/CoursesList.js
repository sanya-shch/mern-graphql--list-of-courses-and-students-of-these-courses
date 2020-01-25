import React, {useContext} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {coursesQuery} from "../graphql/queries";

export const CoursesList = ({search, setCurrent}) => {
    const { loading, data, error } = useQuery(
        coursesQuery,
        {
            variables: {
                name: search || ''
            }
        }
    );

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const editClickHandler = (course) => {
        setCurrent(course)
    };

    const deleteClickHandler = (course) => {
        setCurrent(course)
    };

    return (
        <div>

            <table className="centered">
                <thead>
                <tr>
                    <th>№</th>
                    <th>NAME</th>
                    <th>CODE</th>
                    <th>actions</th>
                </tr>
                </thead>

                <tbody>
                { data.courses.map((course, index) => {
                    return (
                        <tr key={course.id}>
                            <td>{index + 1}</td>
                            <td>{course.name}</td>
                            <td>{course.code}</td>
                            <td>
                                <a
                                    className="btn-floating btn-small waves-effect waves-light green modal-trigger"
                                    style={{marginRight: '2rem'}}
                                    onClick={() => editClickHandler(course)}
                                    href='#edit-course-modal'
                                >
                                    <i className="material-icons">edit</i>
                                </a>
                                <a
                                    className="btn-floating btn-small waves-effect waves-light red modal-trigger"
                                    onClick={() => deleteClickHandler(course)}
                                    href='#delete-course-modal'
                                >
                                    <i className="material-icons">delete</i>
                                </a>
                            </td>
                        </tr>
                    )
                }) }
                </tbody>
            </table>

        </div>
    )
};