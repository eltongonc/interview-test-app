import React from 'react';
import PropTypes from 'prop-types';
 
class Post extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<p>Post</p>
			</div>
		);
	}
}

Post.propTypes = {};

export default Post;
