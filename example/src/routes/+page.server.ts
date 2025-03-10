import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	let rawMailHtml = '';
	try {
		const response = await fetch('/mail');
		if (response.ok) {
			rawMailHtml = await response.text();
		} else {
			console.error('Failed to fetch raw mail');
		}
	} catch (error) {
		console.error('Error fetching raw mail:', error);
	}

	return {
		rawMailHtml
	};
};