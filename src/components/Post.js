import React from 'react';
import PropTypes from 'prop-types';
 
function Post({title, children}) {
	return (
		<div className="post">
			<div className="post__inner">
				<h4 className="post__title">{title}</h4>
				<p className="post__body" dangerouslySetInnerHTML={{__html: children}}></p>
			</div>
		</div>
	);
}

Post.propTypes = {
	title: PropTypes.string,
	children: PropTypes.any,
};

export default Post;
