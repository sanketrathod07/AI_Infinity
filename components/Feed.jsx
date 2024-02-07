'use client'

import React, { useEffect, useState } from 'react';
import PromptCard from './PromptCard';
import { useRouter } from 'next/navigation';
import PromptSkeleton from './PromptSkeleton';
import { useSession } from "next-auth/react"


const PromptCardList = ({ data, handleTagClick, handleUserProfile }) => {
  return (
    <div className='prompt_card'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleUserProfile={handleUserProfile}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading animation
  const router = useRouter();
  const { data: session } = useSession();


  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
      setLoading(false); // Set loading to false after data is fetched
    };
    fetchPosts();
  }, []);

  // Filter posts based on searchText and tag names
  const filteredPosts = posts.filter((post) =>
    post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
    post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
    post.creator.username.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  // Define handleUserProfile function
  const handleUserProfile = (id) => {

    session?.user.id === id ? router.push(`/profile`) : router.push(`/user?id=${id}`);
  };

  return (
    <section className='HomeFeed_Container'>
      <form>
        <input
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input'
        />
      </form>
      {loading ? ( // Render loading animation if loading is true
        <>
          <PromptSkeleton />
          <PromptSkeleton />
          <PromptSkeleton />
        </>
      ) : ( // Render PromptCardList if loading is false
        <PromptCardList
          data={filteredPosts.reverse()}
          handleTagClick={handleTagClick}
          handleUserProfile={handleUserProfile}
        />
      )}
    </section>
  );
};

export default Feed;
