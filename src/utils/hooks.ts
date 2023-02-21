/**
 * Styles used by the Material UI library
 * @param {*} theme
 */
export function useStyle(theme: any) {
	return {
		media: {},
		modal: {},
		paper: {},
		root: {
			position: 'fixed',
			bottom: theme.spacing(2),
			right: theme.spacing(2),
		},
		progress: {
			margin: theme.spacing(2),
		},
	};
}
