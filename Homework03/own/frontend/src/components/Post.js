import React from 'react'

import { Card, CardText, CardHeader, CardBody, CardFooter } from 'reactstrap'

const Post = ({ post }) => {
  return (
    <Card style={{ marginBottom: '1rem' }}>
      <CardHeader>{post.title}</CardHeader>
      <CardBody>
        <CardText>{post.body || `No body for this post...`}</CardText>
      </CardBody>
      <CardFooter className='text-right' style={{ fontSize: '0.8em' }}>
        {`Published: ${post.published}`}
      </CardFooter>
    </Card>
  )
}

export default Post
