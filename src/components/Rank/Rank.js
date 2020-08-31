import React from 'react';

const Rank = ({ name, entries }) => {
    return (
        <div className='white f3 flexcenter'>
            <p className="pa2 ma0">
                {`${name} , your current entry count is...`}
            </p>
            <div className='white f2 '>
                {entries}
            </div>
        </div>
    );
}

export default Rank;