import React, { Component } from "react";
import Particles from "react-particles-js";

class Canvas extends Component {
  state = { width: "0px", height: "0px" };
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }
  updateWindowDimensions = () => {
    this.setState({
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`
    });
  };
  render() {
    const {  } = this.state;
    return (

      <Particles
        params={{
          "particles": {
            "number": {
              "value": 8,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "line_linked": {
              "enable": false
            },
            "move": {
              "speed": 1,
              "out_mode": "out"
            },
            "shape": {
              "type": [
                "image",
                "circle"
              ],
              "image": [
                {
                  "src": "https://www.flaticon.es/svg/static/icons/svg/2941/2941556.svg",
                  "height": 20,
                  "width": 23
                },
                {
                  "src": "https://www.flaticon.es/svg/static/icons/svg/3208/3208867.svg",

                  "height": 20,
                  "width": 20
                },
                {
                  "src": "https://www.flaticon.es/svg/static/icons/svg/1046/1046371.svg",
                  "height": 20,
                  "width": 20
                },
                {
                  "src": "https://www.flaticon.es/svg/static/icons/svg/3655/3655601.svg",
                  "height": 20,
                  "width": 20
                },
                {
                  "src": "https://www.flaticon.es/svg/static/icons/svg/3655/3655580.svg",
                  "height": 20,
                  "width": 20
                }
              ]
            },
            "color": {
              "value": "#9CCCCC"
            },
            "size": {
              "value": 30,
              "random": false,
              "anim": {
                "enable": true,
                "speed": 4,
                "size_min": 10,
                "sync": false
              }
            }
          },
          "retina_detect": true
        }} />
    );
  }
}

export default Canvas;
