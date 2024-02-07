import React from 'react';
import PromptCard from './PromptCard';
import UnknownUserLogo from '@public/images/unknown.png';
import PromptSkeleton from './PromptSkeleton';


const Profile = ({ name, desc, userProfileImg ,data, handleEdit, handleDelete }) => {
    // Check if data is empty or not available
    const isLoading = data.length === 0;

    return (
        <section className='ProfileMainContainer'>
            <div className='ProfileMainHeadingDiv'>
                {/* Conditional rendering to display userProfileImg if available, otherwise display the unknown user logo */}
                {userProfileImg ? (
                    <img src={userProfileImg} alt="User Logo" className='UserLogo' />
                ) : (
                    <img src={UnknownUserLogo.src} alt="Unknown User Logo" className='UserLogo' />
                )}
                <span><h1 className='ProfileHeader'>{name}</h1></span>
                <p className='ProfilePara'>{desc}</p>
            </div>

            {/* Check if data is empty, if yes, display loading animation */}
            {isLoading ? (
                <div className="ProfileSkeletonContainer">
                <PromptSkeleton />
                <PromptSkeleton />
                <PromptSkeleton />
            </div>
            ) : (
                <div className='PromptCard'>
                    {data.map((post) => (
                        <PromptCard
                            key={post._id}
                            post={post}
                            handleEdit={() => handleEdit && handleEdit(post)}
                            handleDelete={() => handleDelete && handleDelete(post)}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Profile;
