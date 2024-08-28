import { expect, test } from '@playwright/test';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	const title = await page.textContent('h2');
	expect(title).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
});
