import { API_ENDPOINT } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const res = await fetch(`${API_ENDPOINT}/posts/1`);
	const posts = await res.json();
	return {
		posts
	};
};
