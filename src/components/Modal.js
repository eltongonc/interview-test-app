/* eslint-disable react/prop-types */

import React from 'react';
import { useSpring, animated } from 'react-spring';
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


const styles = theme => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[1],
	},
});

const Fade = React.forwardRef(function Fade(props, ref) {
	const { in: open, children, onEnter, onExited, ...other } = props;
	const style = useSpring({
		from: { opacity: 0 },
		to: { opacity: open ? 1 : 0 },
		onStart: () => {
			if (open && onEnter) {
				onEnter();
			}
		},
		onRest: () => {
			if (!open && onExited) {
				onExited();
			}
		},
	});

	return (
		<animated.div ref={ref} style={style} {...other}>
			{children}
		</animated.div>
	);
});

class SpringModal extends React.Component {
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
					data
				});
			});
		}
	}

	handleOpen() {
		this.setState({
			setOpen: true,
			open: true,
		});
	}

	handleClose() {
		this.setState({
			setOpen: false,
			open: false,
		});
	}

	generateComments() {
		return this.state.data.map((comment, i) => {
			return <ListItem key={i} className="comment">
				<ListItemAvatar>
					<Avatar>R</Avatar>
				</ListItemAvatar>
				<ListItemText className="modal__text" primary={comment.name} secondary={comment.body} />
			</ListItem>;
		});
	}
	
	UNSAFE_componentWillReceiveProps() {
		if(this.props.clickAction) {
			this.props.clickAction((data) => {
				this.setState({
					data
				});
			});
		}
	}

	render() {
		const { classes } = this.props;
		return (
			<div className="modal-wrapper">
				<IconButton onClick={this.handleOpen} aria-label="share">
					<CommentIcon />
				</IconButton>
				<Modal
					aria-labelledby="spring-modal-title"
					aria-describedby="spring-modal-description"
					className={'modal ' + classes.modal}
					open={this.state.open}
					onClose={this.handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}
				>
					<Fade in={this.state.open}>
						<IconButton className="close-button" onClick={this.handleClose} aria-label="share">
							<CloseIcon />
						</IconButton>
						<List className={'modal__list ' + classes.paper}>
							{this.generateComments()}
						</List>
					</Fade>
				</Modal>
			</div>
		);
	}
}

export default withStyles(styles)(SpringModal);
