import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import CloseIcon from '@material-ui/icons/Close';
import Fade from '@material-ui/core/Fade';

import { styles } from '../assets/scripts/helpers';

class Comments extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			setOpen: false,
			data: [],
		};

		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.generateComments = this.generateComments.bind(this);

		if (this.props.clickAction) {
			this.props.clickAction((data) => {
				this.setState({
					data,
				});
			});
		}
	}

	handleOpen() {
		this.setState({ open: true });
	}

	handleClose() {
		this.setState({ open: false });
	}

	generateComments() {
		return this.state.data.map((comment, i) => {
			return (
				<ListItem key={i} className="comment">
					<ListItemAvatar>
						<Avatar>{comment.id}</Avatar>
					</ListItemAvatar>
					<ListItemText
						className="modal__text"
						primary={comment.name}
						secondary={comment.body}
					/>
				</ListItem>
			);
		});
	}

	UNSAFE_componentWillReceiveProps() {
		if (this.props.clickAction) {
			this.props.clickAction((data) => {
				this.setState({
					data,
				});
			});
		}
	}

	render() {
		const { classes } = this.props;

		return (
			<div className="comments">
				<IconButton onClick={this.handleOpen} aria-label="share">
					<CommentIcon />
				</IconButton>

				<Modal
					aria-labelledby="spring-modal-title"
					aria-describedby="spring-modal-description"
					className={'comments__modal ' + classes.modal}
					open={this.state.open}
					onClose={this.handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}
				>
					<Fade in={this.state.open}>
						<div className="modal__inner">
							<IconButton
								className="close-button"
								onClick={this.handleClose}
								aria-label="share"
							>
								<CloseIcon />
							</IconButton>
							<List className={'modal__list ' + classes.paper}>
								{this.generateComments()}
							</List>
						</div>
					</Fade>
				</Modal>
			</div>
		);
	}
}

Comments.propTypes = {
	classes: PropTypes.object,
	clickAction: PropTypes.func.isRequired,
};

export default withStyles(styles)(Comments);
