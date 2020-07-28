import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
 apiKey: '894bcab56eef4244b88d73af0e765db7'
});

const particlesOptions = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800,
            }
        },
    },
    interactivity: {
        detectsOn: "window",
        events: {
            onHover: {
                enable: true,
                mode: "repulse"
            },
            resize: true
        }
    }
};

class App extends Component {
  
    constructor(){
        super();
        this.state = {
            input:'',
            imageUrl: '',
            box: {}
        };
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage')
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBoundary = (box) => {
        this.setState({box: box})
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then(response => this.displayFaceBoundary(this.calculateFaceLocation(response)))
        .catch(err => console.log('Error: ', err));
    }

    render(){
        return (
        <div className="App">
            <Particles className="particles"
            params={particlesOptions} 
            />
            <Navigation />
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
        );
    }
}

export default App;
