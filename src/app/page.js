'use client'

import React, { useEffect } from 'react';
import Feed from "@components/Feed";

const Home = () => {
    // Scroll to the top of the page when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="HomeMain">
            <div className="HomeMainBanner">
                <h1 className="HomeMainHeading1">Props & Connection</h1>
                <h3 className="HomeMainHeading2">AI Powered Prompts</h3>
                <p className="HomeMainPara">Embark on a journey of integration and collaboration as we delve into the realm of AI props. </p>
            </div>
            <Feed />
        </div>
    );
}

export default Home;
