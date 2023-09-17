import Avatar from '@mui/material/Avatar';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import React, { useState, useEffect } from 'react';

export default function FloatingButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Function to check scroll height and toggle visibility
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;

            // Show the floating component when the page is long enough and scrollable
            setIsVisible(scrollHeight > windowHeight);
        };

        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Initial check when the component mounts
        handleScroll();

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Add smooth scrolling behavior
        });
    };

    return (isVisible &&  <Avatar sx={{cursor:'pointer',position:isVisible?'fixed':'static',bottom:15,right:15}} onClick={scrollToTop}><KeyboardDoubleArrowUpIcon /></Avatar>
    )
}
