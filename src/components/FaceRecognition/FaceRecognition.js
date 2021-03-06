import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className="mt3 flexcenter">
            <div className="br3 shadow-2 absolute pa2">
                <img id='inputimage' src={imageUrl} alt='' width='500px' height='auto'/>
                <div className='bounding-box' style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;