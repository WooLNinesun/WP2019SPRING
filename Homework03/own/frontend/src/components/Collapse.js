import React from 'react'
import {
  Row, Col,
  UncontrolledCollapse, Button, Badge
} from 'reactstrap'
import Post from './Post'

function CustomCollapse({ name, posts }) {
  return (
    <div>
      <Button outline id={name} style={{ margin: '1rem', width: '100%' }} >
        <Row>
          <Col xs="8">{name}</Col>
          <Col xs="4">
            <Badge color="info" className="text-right">{posts.length}</Badge>
          </Col>
        </Row>
      </Button>
      <UncontrolledCollapse
        toggler={`#${name}`}
        style={{ marginLeft: '1rem', marginRight: '1rem', width: '100%' }}
      >
        {posts.map((post, idx) => (<Post key={idx} post={post} />))}
      </UncontrolledCollapse>
    </div>
  )
}

export default CustomCollapse
