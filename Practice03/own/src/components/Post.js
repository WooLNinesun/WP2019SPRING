import React, { Component } from 'react';

class Post extends Component {
  render() {
    let tags = this.props.tags.split(' ');
    tags = tags.map(tag => <span class="tag">{tag}</span>);
    console.log(tags);

    return (
      <article className="media">
        <div className="media-content">
          <div className="content">
            <div className="title">{this.props.title}</div>
            <div className="is-pulled-right time">12 minutes ago</div>
            <div className="subtitle">{this.props.subtitle}</div>
            <hr />
            <p>{this.props.children}</p>
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <p><strong>Labels:</strong> {tags} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default Post;
