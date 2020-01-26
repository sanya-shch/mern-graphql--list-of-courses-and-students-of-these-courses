import React from 'react';

export const Loader = () => (
    <div style={ {paddingTop: '2rem'} }>
        <div className="progress">
            <div className="indeterminate"/>
        </div>
    </div>
);