'use client'
import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js'; // Import anime.js

const FrontendPage = () => {
    const elementRef = useRef(null);
    const textContainerRef = useRef(null); // New ref for text container
    let progress = 0;

    useEffect(() => {
        if (textContainerRef.current) {
            anime({
                targets: textContainerRef.current.children,
                opacity: [0, 1],
                translateY: [100, 0],
                translateX: [100, 0],
                duration: 1000,
                delay: anime.stagger(200),
                easing: 'easeOutQuad',
            });
        }

        if (elementRef.current) {
            anime({
                targets: elementRef.current,
                opacity: [0, 1],
                translateY: [100, 0],
                duration: 1000,
                easing: 'easeOutQuad',
            });
        }
    }, []);

    useEffect(() => {
        // No need for ScrollMagic, handle scrolling animations here with anime.js directly
        // You can use Intersection Observer API for scroll-triggered animations
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
                <a className="navbar-brand" href="#">START</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExampleDefault"
                    aria-controls="navbarsExampleDefault"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#one">Section 1</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#two">Section 2</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#three">Section 3</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#four">Section 4</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <main role="main" className="container-fluid">
                <div className="row no-gutters">
                    <div className="col text-center">
                        <h1 className="py-5">SCROLL DOWN TO TRY ANIMATIONS</h1>
                        <img
                            src="https://drive.google.com/uc?export=view&id=1g2iw0lEBMYFyKjI9A1jN2wm0glHiXubt"
                            className="img-fluid"
                            alt="Responsive image"
                        />
                    </div>
                </div>
                <section id="intro" className="section">
                    <div className="row no-gutters">
                        <div className="col">
                            <div>
                                The Neuron scales the steepest climbs and descends with complete
                                control thanks to its 130 - 140mm suspension, 29” wheels (in sizes
                                M-XL) and confidence-inspiring geometry.
                            </div>
                        </div>
                    </div>
                </section>
                <section id="one" className="section">
                    <div className="row no-gutters">
                        <div className="col">
                            <div className="rectangle"></div>
                            <div className="elem" ref={textContainerRef}>
                                <div className="text-block">
                                    <h2 className="mb-0">2021</h2>
                                    <h5>Neuron CF SLX 9</h5>
                                </div>
                                <div className="blocks">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="two" className="section">
                    <div className="row no-gutters">
                        <div className="col">
                            <div className="elem">
                                <div>
                                    <img
                                        src="https://drive.google.com/uc?export=view&id=1wx3G8XcML7t9hTiE1ioUkLUiqUHkI_AJ"
                                        className="img-fluid"
                                        alt="Responsive image"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="three" className="section">
                    <div className="image"></div>
                    <div className="row no-gutters">
                        <div className="col">
                            <div className="elem">
                                <h2>GET OUT THERE</h2>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="four" className="section">
                    <div className="image"></div>
                    <div className="row no-gutters">
                        <div className="col">
                            <div className="elem">
                                <h2>GO RIDE</h2>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default FrontendPage;
