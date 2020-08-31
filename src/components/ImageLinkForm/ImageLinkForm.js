import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
        <div>
            <p className="f3">
                {'This Magic Tech Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className="flexcenter">
                <div className="form flexcenter  pa4 br3 shadow-2 w-40">
                    <input id="picurl" className="f4 pa2 w-80 center" type="text" placeholder="Your picture url here" onChange={onInputChange}/>
                    <button className="w-20 grow f4 link ph3 pv2 white bg-light-purple" onClick={onPictureSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;