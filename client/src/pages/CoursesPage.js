import React, {useCallback, useContext, useEffect, useState} from 'react';
import {CoursesList} from '../components/CoursesList';
import AddBtn from "../components/AddBtn";
import AddCoursesModal from "../components/AddCoursesModal";
import EditCoursesModal from "../components/EditCoursesModal";
import DeleteCoursesModal from "../components/DeleteCoursesModal";

export const CoursesPage = () => {
    const [search, setSearch] = useState('');
    const [current, setCurrent] = useState('');

    const searchHandler = (e) => {
        setSearch(e.target.value);
    };

    const setCurrentHandler = (value) => {
        setCurrent(value);
    };

    return (
        <div className="row">
            <div className="col s8 offset-s2">
                <h1 className="center">Courses</h1>

                <div className="input-field s12">
                    <input id="last_name" type="text" className="validate" value={search} onChange={(event) => searchHandler(event)}/>
                    <label htmlFor="last_name">Search by name</label>
                </div>

                <CoursesList search={search} setCurrent={setCurrentHandler}/>

                <AddBtn toId="#add-course-modal"/>
                <AddCoursesModal/>
                <EditCoursesModal current={current}/>
                <DeleteCoursesModal current={current}/>
            </div>
        </div>
    )
};
