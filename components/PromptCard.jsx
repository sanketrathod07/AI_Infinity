'use client'

import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Image from 'next/image'



const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete, handleUserProfile }) => {

    const { data: session } = useSession();
    const pathName = usePathname();

    const [copied, setCopied] = useState("");

    const handleCopy = () => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => setCopied(""), 3000);
    }

    const userImage = post.creator.image ? post.creator.image : UnknownUserLogo.src;

    const handleClickUserContainer = () => {
        // Check if the current pathname is not '/profile'
        if (pathName !== '/user' || pathName === '/profile') {
            // Call handleUserProfile only if we are not in the profile page
            handleUserProfile(post.creator._id);
        }
    }

    return (
        <div className="PromptCardListContainer">
            <div className="prompt_cardUserContainer" onClick={handleClickUserContainer}>
                <div className="prompt_cardUserName">
                    <Image
                        width={200}
                        height={200}
                        src={userImage}
                        alt="user_image"
                        className="prompt_card_img"
                    />
                    <div className="prompt_cardname">
                        <h3>{post.creator.username}</h3>
                        <p>{post.creator.email}</p>
                    </div>
                </div>
                <div className="" onClick={handleCopy}>
                    <Image
                        width={20}
                        height={20}
                        className="CopyPasteSVG"
                        alt="SVG"
                        src={copied === post.prompt ? '/icons/done.svg' : '/icons/copy.svg'}
                    />
                </div>
            </div>
            <p className="promptContainerPara">{post.prompt}</p>
            <p className="promptContainerTag" onClick={() => handleTagClick && handleTagClick(post.tag)}>#{post.tag}</p>

            {(session?.user.id === post.creator._id && pathName != '/' || (session?.user && pathName === '/profile')) && (
                <div className="PromptEditDeleteBTN">
                    <p className="PromptCardEditBTN" onClick={handleEdit}>Edit</p>
                    <p className="PromptCardDeleteBTN" onClick={handleDelete}>Delete</p>
                </div>
            )}
        </div>
    )
}

export default PromptCard
