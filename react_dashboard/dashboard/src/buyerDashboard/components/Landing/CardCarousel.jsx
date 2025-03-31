import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import ItemsCarousel from 'react-items-carousel';
import leftChevron from '../images/left-chevron.png';
import rightChevron from '../images/right-chevron.png';
import person1 from '../images/MEGHA.jpg';
import person2 from '../images/Pavithra.jpg';
import person3 from '../images/Rashmi.jpg';
import person4 from '../images/Sudarshan.jpg';
import person5 from '../images/Diwu.jpg';

import './CardCarousel.css';

const CardCarousel = () => {
    const [CardCount, SetCardCount] = useState(() => {
        if (window.innerWidth > 1000) {
            return 3;
        } else if (window.innerWidth > 800) {
            return 2;
        } else {
            return 1;
        }
    });
    
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 1000) {
                SetCardCount(3);
            } else if (window.innerWidth > 800) {
                SetCardCount(2);
            } else {
                SetCardCount(1);
            }
        }

        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    });

    const [activeItemIndex, setActiveItemIndex] = useState(0);

    const chevronWidth = 0;

    return (
        <React.Fragment>
        <Container className="comment-container">
            <h1 className="comment-h">Our satisfied customer says</h1>
           
        </Container>
        <Container className="card-carousel-container">
        <ItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={CardCount}
            gutter={20}
            leftChevron={<img src={leftChevron} alt="Left" />}
            rightChevron={<img src={rightChevron} alt="Right" />}
            outsideChevron
            chevronWidth={chevronWidth}
        >
            <Card className="card-carousel-div">
                <Card.Img className="circular--portrait" src={person1} alt="Person1" />
                <Card.Body>
                    <Card.Text>
                    Absolutely love this website! The user experience is smooth, and everything is well-organized.
                    </Card.Text>
                    <Card.Title>- Meghasyam</Card.Title>
                </Card.Body>
            </Card>
            <Card className="card-carousel-div">
                <div className="circular--portrait">
                <img src={person2} alt="Person2" />
                </div>
                <Card.Body>
                    <Card.Text>
                    This platform made everything so easy! Highly satisfied with the seamless navigation and design.
                    </Card.Text>
                    <Card.Title>- Pavithra</Card.Title>
                </Card.Body>
            </Card>
            <Card className="card-carousel-div">
                <div className="circular--portrait">
                <img src={person3} alt="Person3" />
                </div>
                <Card.Body>
                    <Card.Text>
                    A fantastic website with great features! It’s intuitive and works flawlessly.
                    </Card.Text>
                    <Card.Title>- Rashmi</Card.Title>
                </Card.Body>
            </Card>
            <Card className="card-carousel-div">
                <div className="circular--portrait">
                <img src={person4} alt="Person4" />
                </div>
                <Card.Body>
                    <Card.Text>
                    Super happy with this platform! Everything works perfectly, and I couldn’t ask for more.
                    </Card.Text>
                    <Card.Title>- Sudarshan</Card.Title>
                </Card.Body>
            </Card>
            <Card className="card-carousel-div">
                <div className="circular--portrait">
                <img src={person5} alt="Person1" />
                </div>
                <Card.Body>
                    <Card.Text>
                    Best website I’ve used in a long time! It’s fast, efficient, and exactly what I needed.
                    </Card.Text>
                    <Card.Title>- Diwakar</Card.Title>
                </Card.Body>
            </Card>
        </ItemsCarousel>
        </Container>
        </React.Fragment>
)};

export default CardCarousel;