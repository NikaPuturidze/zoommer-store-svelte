import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [
		sveltekit({
			preprocess: vitePreprocess(),
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			adapter: adapter()
		})
	],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: (content: string, filename: string) => {
					if (path.basename(filename) === 'main.scss') {
						return content;
					}

					return `
					@use 'src/lib/styles/variables' as *;
					@use 'src/lib/styles/mixins' as *;
					${content}
				`;
				}
			}
		}
	}
});
