import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import Jasmine from './Image/jasmine_avatar.png';
import Jayeon from './Image/jay_avatar1.png';
import Lan from './Image/lan_avatar.png';
import Remi from './Image/remi_avatar.png';
import Shannon from './Image/shannon_avatar.png';
import Samantha from './Image/samantha_avatar.png';
import './ControlledCarousel.css';

function ControlledCarousel() {
  return (
    <div id="Title">
      <h1 style={{color:'white'}}>Who We Are</h1>
      <h3 style={{color:'white'}}>CryptoMaster is the brainchild of six UCI Full Stack Bootcamp Students</h3>
      <br></br>
      <Carousel center="xs" id="WhoWeAre">
        <Carousel.Item interval={2000}>
          <img className="d-block w-100" src={Jasmine}/>
          <Carousel.Caption>
            <h3>Jasmine Benson</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img id="Image"className="d-block w-100" src={Lan}/>
          <Carousel.Caption>
            <h3>Lan Bui</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img id="Image" className="d-block w-100" src={Remi}/>
          <Carousel.Caption>
            <h3>Remi Kim</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img id="Image" className="d-block w-100" src={Samantha}/>
          <Carousel.Caption>
            <h3>Samantha Mack</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img id="Image" className="d-block w-100" src={Jayeon}/>
          <Carousel.Caption>
            <h3>Jaeyeon Park</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img id="Image"className="d-block w-100" src={Shannon}/>
          <Carousel.Caption>
            <h3>Shannon Rayes</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

    </div>
  );
}

export default ControlledCarousel