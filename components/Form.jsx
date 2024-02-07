import Link from 'next/link'
import React from 'react'

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='FormSection'>
      <h1 className='FormHeading'>
        <span >
          {type} Post
        </span>
      </h1>
      <p className='FormPara'>{type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform</p>

      <form
        onSubmit={handleSubmit}
        className='FormSectionForm'
      >
        <label className='FormSectionLabel'>
          <span className='FormSectionFormSpan'>Your AI Prompt</span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your prompt here...'
            required
            className='FormSectionFormTextArea'
          />
        </label>
        <label className='FormSectionLabel'>
          <span className='FormSectionFormSpan'>Tag {` `} <span>(#webdevelopment, #idea #ai #product)</span></span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder='#tags'
            required
            className='FormSectionFormtag'
          />
        </label>

        <div className='CancelAndCreateContainer'>
          <Link href='/' className='CancelBTN'>Cancel</Link>
          <button type='submit' disabled={submitting} className='CreateBTN'>
            {submitting ? `${type}...`: type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
