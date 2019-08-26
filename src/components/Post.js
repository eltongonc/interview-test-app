import React from 'react';
import PropTypes from 'prop-types';
 
class Post extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="post">
				<div className="post__inner">
					<h4 className="post__title">{this.props.title}</h4>
					<p className="post__body">{this.props.children}</p>
				</div>
			</div>
		);
	}
}

Post.propTypes = {
	title: PropTypes.string,
	children: PropTypes.any,
};

export default Post;
