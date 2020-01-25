import React from 'react';

const AddBtn = ({toId}) => {
    return (
        <div className='fixed-action-btn'>
            <a href={toId} className='btn-floating btn-large blue darken-2 modal-trigger' >
                <i className='large material-icons'>add</i>
            </a>
        </div>
    );
};

export default AddBtn;