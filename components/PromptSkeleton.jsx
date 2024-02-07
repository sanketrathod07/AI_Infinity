import React from 'react'

const PromptSkeleton = () => {
    return (
        <div className="PromptCardSkeleton">
            <div className="promptInnearContainerSkeleton">
                <div className="prompt_cardUserContainerSkeleton">
                    <div className="prompt_cardUserNameSkeleton">
                        <div className="PromptImgSkeleton"></div>
                        <div className="prompt_cardnameSkeleton">
                            <div className="prompt_cardUsernameSkeleton"></div>
                            <div className="prompt_cardEmailSkeleton"></div>
                        </div>
                    </div>
                    <div className="IMGSkeleton">
                        <div className="iconDivSkeleton"></div>
                    </div>
                </div>
                <div className="promptContainerParaSkeleton"></div>
                <div className="promptContainerTagSkeleton"></div>
            </div>
        </div>
    )
}

export default PromptSkeleton
