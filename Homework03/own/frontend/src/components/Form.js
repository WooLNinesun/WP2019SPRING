import React, { useState } from 'react'
import {
  Col,
  Form, FormGroup,
  Label, Input, Button,
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'

import { Query } from 'react-apollo'
import { AUTHORS_QUERY } from '../graphql'

function CustomForm(props) {
  const [Title, setTitle] = useState('')
  const [Body, setBody,] = useState('')
  const [Author, setAuthor] = useState({ name: 'None Select', id: -1 })
  const [PulldownOpen, setPulldownOpen] = useState(false)

  const handelPulldownToggle = () => {
    setPulldownOpen(!PulldownOpen)
  }

  const handelPulldownSelect = (user) => {
    setPulldownOpen(!PulldownOpen)
    setAuthor(user)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    if (Title === '' || Body === '') return
    if (Author.name === 'None Select' || Author.id === -1) return

    props.handleFormSubmit({
      title: Title,
      body: Body,
      authorId: Author.id
    })

    setPulldownOpen(false)
    setTitle('')
    setBody('')
    setAuthor({ name: 'None Select', id: -1 })
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormGroup>
        <ButtonDropdown
          isOpen={PulldownOpen}
          toggle={handelPulldownToggle}
          style={{ width: '100%' }}
        >
          <DropdownToggle caret
          >Author: {Author.name}</DropdownToggle>
          <Query query={AUTHORS_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>
              if (error) return <p>Error :(((</p>

              const items = data.users.map((user) => (
                <DropdownItem key={user.id}
                  onClick={() => handelPulldownSelect(user)}
                >{user.name}</DropdownItem>
              ))
              return <DropdownMenu style={{ width: '100%' }}>{items}</DropdownMenu>
            }}
          </Query>
        </ButtonDropdown>
      </FormGroup>
      <FormGroup row>
        <Label for="title" sm={2}>Title</Label>
        <Col sm={10}>
          <Input
            type="text" name="title" id="title" value={Title}
            placeholder="Post title..."
            onChange={e => setTitle(e.target.value)}
          />
        </Col>
      </FormGroup>
      <FormGroup>
        <Label for="body">Body</Label>
        <Input
          type="textarea" name="body" id="body" value={Body}
          placeholder="Post body..."
          onChange={e => setBody(e.target.value)}
        />
      </FormGroup>
      <Button type="submit" color="primary" style={{ width: '100%' }}>Post</Button>
    </Form>
  )
}

export default CustomForm
