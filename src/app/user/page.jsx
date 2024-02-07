'use client'

import Profile from '@components/Profile';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"
import Loading from '@public/images/loading1.gif'
import { Suspense } from 'react';
import Image from 'next/image'

const UserProfile = () => {
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const getPromptDetails = async () => {
            try {
                const response = await fetch(`/api/users/${promptId}`);
                const data = await response.json();
                setPosts(data);
                setLoading(false); // Set loading state to false after posts are fetched
            } catch (error) {
                console.error("Error fetching posts:", error);
                setLoading(false); // Set loading state to false if there's an error
            }
        };
        if (promptId) getPromptDetails();
    }, [promptId]);

    console.log(posts)

    return (
        <Suspense fallback={<Image width={200} height={200} src={Loading} alt="Loading..." />}>
            <Profile
                name={posts[0]?.creator?.username}
                userProfileImg={posts[0]?.creator?.image}
                desc="Welcome to your personalized profile page"
                data={posts}
            />
        </Suspense>
    )
}

export default UserProfile;
