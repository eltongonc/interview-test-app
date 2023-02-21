import React, { ReactNode } from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Zoom from '@mui/material/Zoom';
import { styled } from '@mui/material';

type Props = {
	children: ReactNode;
};

const StyledDiv = styled('div')`
	position: fixed;
	bottom: ${({ theme }: any) => theme.spacing(2)};
	right: ${({ theme }: any) => theme.spacing(2)};
`;

export default function ScrollTop({ children }: Props) {
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = () => {
		const anchor = document.getElementById('back-to-top-anchor');

		if (anchor) {
			anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	};

	return (
		<Zoom in={trigger}>
			<StyledDiv onClick={handleClick} role="presentation" className="to-top">
				{children}
			</StyledDiv>
		</Zoom>
	);
}
