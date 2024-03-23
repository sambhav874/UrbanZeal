'use client'
import React, { useEffect } from 'react';
import ScrollMagic from 'scrollmagic';
import { TweenMax, Power2 } from 'gsap';

const ScrollMagicExample = () => {
  useEffect(() => {
    // Initialize ScrollMagic controller
    const controller = new ScrollMagic.Controller();

    // Create a scene
    new ScrollMagic.Scene({
      triggerElement: '.trigger-element', // element that triggers the animation
      triggerHook: 0.5, // trigger when the element reaches the middle of the viewport
      reverse: false // only animate once
    })
    .setTween(TweenMax.from('.animated-element', 1, { opacity: 0, y: 100, ease: Power2.easeOut })) // define Tween animation
    .addTo(controller); // add the scene to the controller
  }, []); // run once on component mount

  return (
    <div>
      <div className="trigger-element" style={{ height: '100vh' }}>
        Scroll down to see the animation
      </div>
      <div className="animated-element" style={{ opacity: 0 }}>
        This element will be animated when scrolled
      </div>
    </div>
  );
};

export default ScrollMagicExample;
