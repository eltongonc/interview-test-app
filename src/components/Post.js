import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
 
function Post({title, children, data}) {
	console.log(data);
	
	return (
		<Card className="post">
			<CardHeader
				avatar={
					<Avatar aria-label="recipe">{data.id}</Avatar>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={title}
				subheader="September 14, 2016"
			/>
			<CardMedia
				image="/static/images/cards/paella.jpg"
				title="Paella dish"
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{children}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
}

Post.propTypes = {
	title: PropTypes.string,
	children: PropTypes.any,
	data: PropTypes.object,
};

export default Post;
