import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-climate-risk-report.ts';
import '@/ai/flows/generate-mitigation-recommendations.ts';
import '@/ai/flows/generate-daily-summary-report.ts';
