import React, { Component } from 'react';
import Post from './Post';

class Posts extends Component {
  render() {
    return (
      <section className="container">
        <Post title="Here's a Post with a longer title" subtitle="And its subtitle" tags="test random">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna orci, luctus eget vehicula et, accumsan nec nibh. Aenean pellentesque vitae ante id posuere. Donec tempus elit in felis imperdiet, eget rutrum justo porta. Duis eu velit nec urna facilisis vestibulum. Quisque id posuere lorem. Curabitur mollis, nisl quis mattis feugiat, risus sem sollicitudin ipsum, eget consequat metus ipsum a ligula. Pellentesque suscipit nulla dolor, nec blandit ligula lobortis a. Duis mattis, magna vitae rhoncus dapibus, ipsum magna sollicitudin augue, eu suscipit sapien mauris non odio. Integer ullamcorper vel massa sit amet sodales. Integer urna magna, aliquam nec commodo sit amet, commodo at elit. Mauris tortor mi, dictum ut blandit ut, fermentum non nisl. In vulputate maximus justo. Curabitur imperdiet ullamcorper dolor maximus maximus.
        </Post>
        <Post title="Here's a Post with a longer title" subtitle="And its subtitle" tags="test random">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna orci, luctus eget vehicula et, accumsan nec nibh. Aenean pellentesque vitae ante id posuere. Donec tempus elit in felis imperdiet, eget rutrum justo porta. Duis eu velit nec urna facilisis vestibulum. Quisque id posuere lorem. Curabitur mollis, nisl quis mattis feugiat, risus sem sollicitudin ipsum, eget consequat metus ipsum a ligula. Pellentesque suscipit nulla dolor, nec blandit ligula lobortis a. Duis mattis, magna vitae rhoncus dapibus, ipsum magna sollicitudin augue, eu suscipit sapien mauris non odio. Integer ullamcorper vel massa sit amet sodales. Integer urna magna, aliquam nec commodo sit amet, commodo at elit. Mauris tortor mi, dictum ut blandit ut, fermentum non nisl. In vulputate maximus justo. Curabitur imperdiet ullamcorper dolor maximus maximus.
        </Post>
        <Post title="Here's a Post with a longer title" subtitle="And its subtitle" tags="test random">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna orci, luctus eget vehicula et, accumsan nec nibh. Aenean pellentesque vitae ante id posuere. Donec tempus elit in felis imperdiet, eget rutrum justo porta. Duis eu velit nec urna facilisis vestibulum. Quisque id posuere lorem. Curabitur mollis, nisl quis mattis feugiat, risus sem sollicitudin ipsum, eget consequat metus ipsum a ligula. Pellentesque suscipit nulla dolor, nec blandit ligula lobortis a. Duis mattis, magna vitae rhoncus dapibus, ipsum magna sollicitudin augue, eu suscipit sapien mauris non odio. Integer ullamcorper vel massa sit amet sodales. Integer urna magna, aliquam nec commodo sit amet, commodo at elit. Mauris tortor mi, dictum ut blandit ut, fermentum non nisl. In vulputate maximus justo. Curabitur imperdiet ullamcorper dolor maximus maximus.
        </Post>
      </section>
    );
  }
}

export default Posts;
