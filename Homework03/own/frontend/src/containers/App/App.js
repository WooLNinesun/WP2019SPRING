import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Container, Row, Col } from 'reactstrap'

import {
  POSTS_QUERY,
  POSTS_SUBSCRIPTION,
  CREATE_POST_MUTATION
} from '../../graphql'
import CustomForm from '../../components/Form'
import CustomCollapse from '../../components/Collapse'
import classes from './App.module.css'

let post_unsubscribe = null

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0
    }
  }

  handleFormSubmit = (data) => {
    this.createPost({
      variables: {
        ...data,
        published: true
      }
    })
  }

  handleTabToggle = (activeTab) => {
    this.setState({
      activeTab: activeTab
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className={classes.title}>Modern GraphQL Tutorial</h1>
          </Col>
        </Row>
        <Row>
          <Col xs="6" className={classes.form}>
            <Mutation mutation={CREATE_POST_MUTATION}>
              {createPost => {
                this.createPost = createPost
                return <CustomForm handleFormSubmit={this.handleFormSubmit} />
              }}
            </Mutation>
          </Col>
          <Col xs="6">
            <Query query={POSTS_QUERY}>
              {({ loading, error, data, subscribeToMore }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error :(((</p>

                const authors = {};
                data.posts.forEach((post) => {
                  authors[post.author.name] = authors[post.author.name] || [];
                  authors[post.author.name].push(post);
                });

                const items = Object.keys(authors).map((name, id) => (
                  <CustomCollapse posts={authors[name]} name={name} key={id} />
                ))
                if (!post_unsubscribe)
                  post_unsubscribe = subscribeToMore({
                    document: POSTS_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev
                      const newPost = subscriptionData.data.post.data

                      return {
                        ...prev,
                        posts: [newPost, ...prev.posts]
                      }
                    }
                  })

                return <div>{items}</div>
              }}
            </Query>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
