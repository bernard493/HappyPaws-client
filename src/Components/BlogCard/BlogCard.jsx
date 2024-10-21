import React from 'react'
import "./BlogCard.scss"
const BlogCard = ({blog}) => {
  return (
    <div className='blog'>
        <img src={blog.image} alt="" srcset="" className='blog__img' />
        <h2>{blog.title}</h2>
    </div>
  )
}

export default BlogCard