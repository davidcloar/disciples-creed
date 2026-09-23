import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const trainings = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/trainings' }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		audience: z.string().optional(),
		format: z.enum(['one-on-one', 'cohort', 'workshop', 'self-paced']),
		duration: z.string().optional(),
		topics: z.array(z.string()).optional(),
		featured: z.boolean().default(false),
		order: z.number().optional(),
		heroImage: z.string().optional(),
		cta: z.string().optional(),
	}),
});

const resources = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
	schema: z.object({
		title: z.string(),
		type: z.enum(['article', 'video', 'download', 'reading']),
		summary: z.string(),
		date: z.coerce.date(),
		url: z.string().optional(),
		heroImage: z.string().optional(),
		comingSoon: z.string().optional(),
		topics: z.array(z.string()).optional(),
	}),
});

export const collections = { trainings, resources };
