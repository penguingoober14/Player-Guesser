import { config } from 'dotenv';
config();

import '@/ai/flows/generate-daily-challenge.ts';
import '@/ai/flows/adjust-difficulty-based-on-performance.ts';