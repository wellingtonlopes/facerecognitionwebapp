import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const particlesOptions = {
    particles: {
        number: {
            value: 125,
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

const initialState = {
    input:'',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
};

class App extends Component {

    constructor(){
        super();
        this.state = initialState;
    }

    loadUser = (userdata) => {
        this.setState({user: {
            id: userdata.id,
            name: userdata.name,
            email: userdata.name,
            entries: userdata.entries,
            joined: userdata.joined
        }})
    }

    async componentDidMount() {
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
        this.setState({box: box});
    }

    onPictureSubmit = async () => {
        this.setState({imageUrl: this.state.input});
        try {
            const response = await fetch('https://cryptic-oasis-67518.herokuapp.com/imageurl', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    input: this.state.input
                })
            });
            const responsejson = await response.json();
            if (responsejson.status) {
                const res = await fetch('https://cryptic-oasis-67518.herokuapp.com/image', {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                });
                const count = await res.json();
                this.setState(Object.assign(this.state.user, { entries: count }))
            }
            this.displayFaceBoundary(this.calculateFaceLocation(responsejson));
        } catch (error) {
            console.log(error, 'picture address could not be loaded');
        }
    }

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initialState);
        } else if (route === 'home') {
            this.setState({isSignedIn: true});
        }
        this.setState({route: route});
    }

    render(){
        const { isSignedIn, route, box, imageUrl } = this.state;
        return (
            <div className="App">
                <Particles className="particles"
                params={particlesOptions} 
                />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                { (route === 'home')
                    ?   <div>
                            <Logo/>
                            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                            <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit}/>
                            <FaceRecognition box={box} imageUrl={imageUrl}/>
                        </div>
                    :   (
                            route === 'signin' || route === 'signout'
                                ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                        ) 
                }
            </div>
        );
    }
}

export default App;
