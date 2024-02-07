'use client'

import { Suspense } from 'react';
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            console.log("Fetched prompt data:", data);
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        };
        if (promptId) getPromptDetails();
    }, [promptId]);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) return alert("Prompt ID not found");

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            });

            if (response.ok) {
                router.push('/');
            } else {
                throw new Error('Failed to update prompt');
            }
        } catch (error) {
            console.error('Error updating prompt:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Form
                type="Edit"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={updatePrompt}
            />
        </Suspense>
    );
};

export default EditPrompt;
