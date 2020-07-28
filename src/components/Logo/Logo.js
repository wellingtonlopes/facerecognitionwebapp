import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png'

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="br2 shadow-2 Tilt" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3 pt4"> 
                    <img src={brain} alt="logo"/> 
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;