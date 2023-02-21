import React, { useState } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';

import { formatDate, upperCaseFirstLetter } from '../utils/helpers';
import { Comments } from './Comments';
import { getComments } from '../utils/api';
import { PostType } from '../types/postTypes';

type Props = {
	title: string;
	children: any;
	data: PostType;
};

export const Post = ({ title, children, data }: Props) => {
	const [checked] = useState(true);

	const showComments = (callback: (x: any) => void) => {
		const id = data.id;

		getComments(id, (err, comments) => {
			if (err) {
				console.log(err);
			} else {
				if (callback) {
					callback(comments);
				}
			}
		});
	};

	const staggerBy = checked ? { timeout: 1000 } : {};

	return (
		<Grow in={checked} style={{ transformOrigin: 'top center' }} {...staggerBy}>
			<Card className="post" elevation={0}>
				<CardHeader
					className="post__header"
					avatar={
						<Avatar aria-label="recipe" src={data.image.user.profile_image.medium} />
					}
					title={
						<a
							href={data.image.user.links.html}
							target="_blank"
							rel="noopener noreferrer"
						>
							{data.image.user.name}
						</a>
					}
					subheader={formatDate(data.image.created_at)}
				/>

				{data.image ? (
					<a href={data.image.urls.full} target="_blank" rel="noopener noreferrer">
						<CardMedia
							style={{
								height: 0,
								paddingTop: '56.25%', // 16:9
							}}
							image={data.image.urls.regular}
							title={data.image.alt_description}
						/>
					</a>
				) : null}

				<CardContent>
					<Typography
						className="post__title"
						variant="body2"
						color="textPrimary"
						component="h6"
					>
						{upperCaseFirstLetter(title)}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{upperCaseFirstLetter(children)}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<Comments clickAction={showComments} />
				</CardActions>
			</Card>
		</Grow>
	);
};
