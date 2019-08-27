import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/Comment';


const useStyles = makeStyles(theme => ({
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	}
}));

function Post({title, children, data}) {
	const classes = useStyles();
	return (
		<Card className="post">
			<CardHeader
				avatar={
					<Avatar aria-label="recipe">{data.id}</Avatar>
				}
				
				title={title}
				subheader="September 14, 2016"
			/>
			<CardMedia
				className={classes.media}
				image={data.image.url}
				title="Paella dish"
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{children}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="share">
					<CommentIcon />
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
