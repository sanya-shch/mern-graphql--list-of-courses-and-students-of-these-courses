import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {shortCoursesQuery} from "../graphql/queries";
import {Loader} from "./Loader";

export const SelectCourse = ({setCourse, currentCourse}) => {

    const [selectedOption, setSelectedOption] =useState(null);

    const { loading, data } = useQuery( shortCoursesQuery, { variables: { name: '' } } );

    useEffect(() => {
        setSelectedOption(currentCourse)
    }, [currentCourse]);

    const handleChange = selectedOption => {
        setSelectedOption(selectedOption);
        setCourse(selectedOption)
    };

    return (
        <div className='row'>
            {
                loading
                    ? <Loader/>
                    : selectedOption !== null &&
                    <div className="input-field col s12">
                        <select
                            value={selectedOption}
                            className="browser-default"
                            onChange={(event) => handleChange(event.target.value)}
                        >
                            <option value="" disabled>Choose course</option>
                            {
                                data.courses.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
            }
        </div>
    )
};
