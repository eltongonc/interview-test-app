export type PostType = {
	title: string;
	body: string;
	id: string;
	image: {
		created_at: string;
		alt_description: string;
		urls: {
			full: string;
			regular: string;
		};
		user: {
			name: string;
			links: {
				html: string;
			};
			profile_image: {
				medium: string;
			};
		};
	};
};
