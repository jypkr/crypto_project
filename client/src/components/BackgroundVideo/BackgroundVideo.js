import "./BackgroundVideo.css";
import Video from "./Video/globe.mp4";
import Poster from "./Video/poster.jpg";
import React, {Component} from 'react';

class BackgroundVideo extends Component {
    constructor (props) {
        super(props);

        this.state = {
            videoURL: 'globe.mp4'
        }
    }

    render () {
        return (
          <video id="BackgroundVideo" autoPlay="autoplay" loop="loop" muted poster={Poster}>
          <source src={Video} type="video/mp4"/>
          <source src={Video} type="video/ogg" />
          </video>
        )
    }
};

export default BackgroundVideo;



