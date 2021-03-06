import React, {useContext} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {coursesQuery} from "../graphql/queries";
import {Loader} from "./Loader";
import currentContext from "../context/current/currentContext";

export const CoursesList = ({search}) => {
    const context = useContext(currentContext);
    const { setCurrent } = context;

    const { loading, data } = useQuery(
        coursesQuery,
        {
            variables: {
                name: search || ''
            }
        }
    );

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

                {
                    !loading && <tbody>
                        {
                            data.courses.map((course, index) => {
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
                            })
                        }
                    </tbody>
                }
            </table>

            {
                loading ? <Loader/> : data.courses.length === 0 && <h4>No courses to show...</h4>
            }
        </div>
    )
};