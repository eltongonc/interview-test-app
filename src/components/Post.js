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
import Grow from '@material-ui/core/Grow';

import { getComments, styles, formatDate, upperCaseFirstLetter } from '../assets/scripts/helpers';
import Comments from './Comments';


class Post extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			checked: false,
		};

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

	componentDidMount() {
		this.setState({
			checked: true,
		});
	}

	render() {
		const {title, children, data, classes} = this.props;

		return (
			<Grow 
				in={this.state.checked}
				style={{ transformOrigin: 'top center' }}
				{...(this.state.checked ? { timeout: 1000 } : {})}
			>
				<Card className="post" elevation={0}>
					<CardHeader
						avatar={
							<Avatar aria-label="recipe" src={data.image.user.profile_image.medium}/>
						}
						title={data.image.user.name}
						subheader={formatDate(data.image.created_at)}
					/>
					
					{data.image ? 
						<CardMedia
							className={classes.media}
							image={data.image.urls.regular}
							title={data.image.alt_description}
						/>
						:
						null
					}
					<CardContent>
						<Typography className="post__title" variant="body2" color="textPrimary" component="h6">
							{upperCaseFirstLetter(title)}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{upperCaseFirstLetter(children)}
						</Typography>
					</CardContent>
					<CardActions disableSpacing>
						<Comments clickAction={this.showComments}/>
					</CardActions>

				</Card>
			</Grow>
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
