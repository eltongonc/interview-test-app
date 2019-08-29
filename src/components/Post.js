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

import { getComments, styles } from '../assets/scripts/helpers';
import SpringModal from './Modal';


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

		console.log(data);
		
		
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
						
						title={title}
						subheader="Augustus 28, 2018"
					/>
					
					{data.image ? 
						<CardMedia
							className={classes.media}
							image={data.image.urls.small}
							title={data.image.alt_description}
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
