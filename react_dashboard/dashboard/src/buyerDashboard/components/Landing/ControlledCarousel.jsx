import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import bg_1 from '../images/bg_1.jpg';
import bg_2 from '../images/bg_2.jpg';
import bg_3 from '../images/bg_3.jpg';

const ControlledCarousel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel 
            activeIndex={index} 
            onSelect={handleSelect} 
            interval={3000} // Auto-slide every 3 seconds
            slide={true} // Enable slide effect
            fade={false} // Disable fade effect for smooth sliding
        >
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={bg_1}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First Slide Label</h3>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={bg_2}
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>Second Slide Label</h3>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={bg_3}
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Third Slide Label</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default ControlledCarousel;