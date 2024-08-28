import { expect, test } from '@playwright/test';
import { DockerComposeEnvironment, StartedDockerComposeEnvironment } from 'testcontainers';
import type { IWireMockRequest, IWireMockResponse } from 'wiremock-captain';
import { WireMock } from 'wiremock-captain';

test.describe('モック動作確認用テスト', () => {
	let environment: StartedDockerComposeEnvironment;
	let mock: WireMock;

	test.beforeAll(async () => {
		environment = await new DockerComposeEnvironment('./tests', 'compose.yml').up();
		const wiremockEndpoint = 'http://localhost:3000';
		mock = new WireMock(wiremockEndpoint);
	});

	test.afterAll(async () => {
		await environment.down();
	});

	const request: IWireMockRequest = {
		method: 'GET',
		endpoint: '/posts/1'
	};

	test('check title 1', async ({ page }) => {
		const mockedResponse: IWireMockResponse = {
			status: 200,
			body: {
				userId: 1,
				id: 1,
				title: 'test title',
				body: 'test body'
			}
		};
		await mock.register(request, mockedResponse);

		await page.goto('/');
		const title = await page.textContent('h2');
		expect(title).toBe('test title');
	});

	test('check title 2', async ({ page }) => {
		const mockedResponse: IWireMockResponse = {
			status: 200,
			body: {
				userId: 1,
				id: 1,
				title: 'test title2',
				body: 'test body2'
			}
		};
		await mock.register(request, mockedResponse);

		await page.goto('/');
		const title = await page.textContent('h2');
		expect(title).toBe('test title2');
	});
});
