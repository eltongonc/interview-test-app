import React, { useEffect, useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';

import { CommentTypes } from '../types/commentTypes';

type CallBackType = (x: CommentTypes[]) => void;

type Props = {
	clickAction?: (x: CallBackType) => void;
};

export const Comments = ({ clickAction }: Props) => {
	const [open, setOpen] = useState(false);
	const [data, setData] = useState<CommentTypes[]>([]);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const generateComments = () => {
		return data.map((comment, i) => {
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
	};

	useEffect(() => {
		if (clickAction) {
			clickAction((d) => {
				setData(d);
			});
		}
	}, [clickAction]);

	return (
		<div className="comments">
			<IconButton onClick={handleOpen} aria-label="share">
				<CommentIcon />
			</IconButton>

			<Modal
				aria-labelledby="spring-modal-title"
				aria-describedby="spring-modal-description"
				className={'comments__modal '}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className="modal__inner">
						<IconButton
							className="close-button"
							onClick={handleClose}
							aria-label="share"
						>
							<CloseIcon />
						</IconButton>
						<List
							className={'modal__list '}
							style={{
								backgroundColor: 'white',
								// boxShadow: theme.shadows[1],
							}}
						>
							{generateComments()}
						</List>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};
