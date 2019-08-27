import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { getComments } from '../assets/scripts/helpers';
import SpringModal from './Modal';

const styles = theme => ({
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	}
});

class Post extends React.Component {
	constructor(props) {
		super(props);

		this.showComments = this.showComments.bind(this);
	}

	showComments(callback) {
		const id = this.props.data.id;
		getComments(id, (err, comments) => {
			if(err) {
				console.log(err);
			} else {
				if (callback) {
					callback(comments);
				}
			}
		});
	}

	render() {
		const {title, children, data, classes} = this.props;
		
		return (
			<Card className="post">
				<CardHeader
					avatar={
						<Avatar aria-label="recipe">{data.id}</Avatar>
					}
					
					title={title}
					subheader="September 14, 2016"
				/>
				
				{data.image ? 
					<CardMedia
						className={classes.media}
						image={data.image.url}
						title={data.image.title}
					/>
					:
					null
				}
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						{children}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<SpringModal clickAction={this.showComments}/>
				</CardActions>

			</Card>
		);
	}
}

Post.propTypes = {
	title: PropTypes.string,
	children: PropTypes.any,
	data: PropTypes.object,
	classes: PropTypes.object,
};

export default withStyles(styles)(Post);
