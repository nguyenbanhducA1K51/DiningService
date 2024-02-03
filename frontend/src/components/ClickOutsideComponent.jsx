import React, { useState, useEffect, useRef } from 'react';

export const ClickOutsideComponent = ({ children, onClose }) => {
    const containerRef = useRef(null);

    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            // Clicked outside the component, close it
            onClose();
        }
    };

    useEffect(() => {
        // Attach event listener when component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Detach event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return <div ref={containerRef}>{children}</div>;
};