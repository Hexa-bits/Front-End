import React, { useState, useEffect } from 'react';
import './AnimatedEllipsis.css'; // Asegúrate de crear este archivo

function AnimatedEllipsis () {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prevDots => (prevDots.length < 4 ? prevDots + '.' : ''));
        }, 300); 

        return () => clearInterval(interval);
    }, []);

    return <span className="animated-ellipsis">{dots}</span>;
};

export default AnimatedEllipsis;