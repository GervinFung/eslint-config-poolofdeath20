import puppeteer from 'puppeteer';
import { describe, expect, it } from 'vitest';
import esbuild from 'esbuild';
import { getPreferredMode, isBrowser } from '../src/web';
import { guardAsDefined } from '../src/guard';

describe('Browser utils', () => {
	describe('In node', () => {
		it('should return values that were not in browser', () => {
			expect(isBrowser()).toBe(false);
			expect(getPreferredMode()).toBe('dark');
		});
	});

	describe('In browser', () => {
		it('should return values that were in browser', async () => {
			const browser = await puppeteer.launch({
				headless: 'new',
			});

			const page = await browser.newPage();

			await page.emulateMediaFeatures([
				{ name: 'prefers-color-scheme', value: 'light' },
			]);

			const outputResult = await esbuild.build({
				minify: true,
				bundle: true,
				write: false,
				entryPoints: [`${__dirname}/dummy/web.ts`],
			});

			const code = new TextDecoder().decode(
				guardAsDefined({
					value: outputResult.outputFiles.at(0)?.contents,
					error: new Error('No output file'),
				})
			);

			const result = await page.evaluate((code) => {
				new Function(code)();

				return {
					isBrowser: window.isBrowser,
					getPreferredMode: window.getPreferredMode,
				};
			}, code);

			await browser.close();

			expect(result.isBrowser).toBe(true);
			expect(result.getPreferredMode).toBe('light');
		});
	});
});
