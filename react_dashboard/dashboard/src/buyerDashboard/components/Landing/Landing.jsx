import React from 'react';

import ControlledCarousel from './ControlledCarousel';
import FlaticonList from './FlaticonList';
import Gallery from './Gallery';
import About from './About';
import CardCarousel from './CardCarousel';
import Navigation from '../Navigation/Header/Navigation';


const Landing = () => {
    return (
        <React.Fragment>
            <Navigation /> {/* ✅ Added the Navigation bar here */}
            <ControlledCarousel />
            <FlaticonList />
            <Gallery />
            <About />
            <CardCarousel />
        </React.Fragment>
    );
};

export default Landing;
