import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import './Hero.css';
import cabbageImg from '../assets/cabbage-01.webp';
import imagesImg from '../assets/images.jpg';
import unbrandedImg from '../assets/1-1-un-branded-whole-original-imag6hztrat5mx9d.webp';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const imageRefs = useRef([]);
    imageRefs.current = [];

    const addToRefs = (el) => {
        if (el && !imageRefs.current.includes(el)) {
            imageRefs.current.push(el);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial load animation
            gsap.from(textRef.current.children, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.2
            });

            gsap.from(imageRefs.current, {
                scale: 0.8,
                opacity: 0,
                rotation: () => Math.random() * 40 - 20,
                duration: 1.5,
                stagger: 0.1,
                ease: "elastic.out(1, 0.5)",
                delay: 0.5
            });

            // Parallax scrolling
            imageRefs.current.forEach((img, index) => {
                const speed = (index + 1) * 0.15;
                gsap.to(img, {
                    y: () => window.innerHeight * speed,
                    rotation: () => Math.random() * 50 - 25,
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    }
                });
            });

            // Fade out text on scroll
            gsap.to(textRef.current, {
                y: -150,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="hero-container" ref={heroRef}>
            <div className="hero-background"></div>

            <div className="hero-content" ref={textRef}>
                <div className="badge">100% Organic & Fresh</div>
                <h1 className="hero-title">
                    Nature's Best,<br />
                    <span>Delivered</span> to You.
                </h1>
                <p className="hero-subtitle">
                    Experience the finest selection of hand-picked groceries,
                    sourced from local farms and delivered straight to your doorstep.
                </p>
                <div className="hero-actions">
                    <button className="btn-primary flex-center">
                        Shop Now <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                    </button>
                    <button className="btn-secondary">Explore Offers</button>
                </div>
            </div>

            <div className="parallax-images">
                {/* Groceries that will float around */}
                <div className="p-img p-img-1" ref={addToRefs}>
                    <img src={cabbageImg} alt="Cabbage" className="blob-img" />
                </div>
                <div className="p-img p-img-2" ref={addToRefs}>
                    <img src={imagesImg} alt="Fresh Produce" className="blob-img" />
                </div>
                <div className="p-img p-img-3" ref={addToRefs}>
                    <img src={unbrandedImg} alt="Fresh Product" className="blob-img" />
                </div>
                {/* <div className="p-img p-img-4" ref={addToRefs}>
                    <img src="https://images.unsplash.com/photo-1518977822559-67d4fefd2df5?auto=format&fit=crop&q=80&w=400&h=400" alt="Avocado" className="blob-img" />
                </div>
                <div className="p-img p-img-5" ref={addToRefs}>
                    <img src="https://images.unsplash.com/photo-1628773822503-ae307ab4baec?auto=format&fit=crop&q=80&w=400&h=400" alt="Lemon" className="blob-img" />
                </div> */}
            </div>
        </div>
    );
};

export default Hero;
