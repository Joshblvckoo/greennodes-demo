'use server';
/**
 * @fileOverview A Genkit flow for generating a personalized ServiceNow Executive Dashboard blueprint.
 *
 * - generateAuditBlueprint - A function that handles the generation of the audit blueprint.
 * - AuditBlueprintInput - The input type for the generateAuditBlueprint function.
 * - AuditBlueprintOutput - The return type for the generateAuditBlueprint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AuditBlueprintInputSchema = z.object({
  fullName: z.string().describe('The full name of the prospective customer.'),
  corporateEmail:
    z.string().email().describe('The corporate email address of the prospective customer.'),
  estimatedMonthlyCloudSpend:
    z.string().describe(
      'The estimated monthly cloud spend, selected from a dropdown. Expected values include: "Less than $1k", "$1k-$10k", "$10k-$50k", "$50k-$100k", "More than $100k".'
    ),
  primaryCloudProvider:
    z.string().describe(
      'The primary cloud provider. Expected values include: "AWS", "GCP", "Azure", "Multi-Cloud".'
    ),
});
export type AuditBlueprintInput = z.infer<typeof AuditBlueprintInputSchema>;

const AuditBlueprintOutputSchema = z.object({
  blueprint:
    z.string().describe('The generated ServiceNow Executive Dashboard blueprint.'),
});
export type AuditBlueprintOutput = z.infer<typeof AuditBlueprintOutputSchema>;

export async function generateAuditBlueprint(
  input: AuditBlueprintInput
): Promise<AuditBlueprintOutput> {
  return generateAuditBlueprintFlow(input);
}

const auditBlueprintPrompt = ai.definePrompt({
  name: 'auditBlueprintPrompt',
  input: {schema: AuditBlueprintInputSchema},
  output: {schema: AuditBlueprintOutputSchema},
  prompt: `You are a highly skilled GreenNodes Solutions Architect. Your task is to generate a personalized ServiceNow Executive Dashboard blueprint based on the provided customer details.
The blueprint should highlight how GreenNodes Core, a B2B FinOps and GreenOps automation platform, can deliver significant value.
Focus on identifying potential areas for cost optimization, carbon emission reduction, and overall cloud resource efficiency specific to the customer's estimated spend and cloud provider.
The output should be a detailed, professional, and actionable blueprint suitable for an executive audience.

Customer Details:
- Full Name: {{{fullName}}}
- Corporate Email: {{{corporateEmail}}}
- Estimated Monthly Cloud Spend: {{{estimatedMonthlyCloudSpend}}}
- Primary Cloud Provider: {{{primaryCloudProvider}}}

Structure the blueprint with the following sections:
1.  **Executive Summary:** Briefly introduce the potential benefits of GreenNodes Core for their specific profile.
2.  **Current Cloud Landscape (Inferred):** Describe potential challenges and typical inefficiencies based on their estimated spend and provider.
3.  **GreenNodes Core Value Proposition:** Detail how GreenNodes Core addresses these challenges, emphasizing FinOps (cost savings, budget optimization) and GreenOps (carbon reduction, sustainable practices) automation.
4.  **ServiceNow Executive Dashboard Blueprint:** Outline key metrics, dashboards, and reports that would be visible in their personalized ServiceNow dashboard, tailored to their cloud provider and spend. Include examples of data points such as "Total Infrastructure Spend," "Wasted Cloud Budget," "Active Token Balance (GreenCoins / GNC)," and "Avoided Carbon Emissions (kg CO2e)."
5.  **Next Steps:** Suggest a call to action for a deeper dive.

Ensure the blueprint is comprehensive, professional, and demonstrates a clear understanding of the customer's context and the value GreenNodes Core brings.`,
});

const generateAuditBlueprintFlow = ai.defineFlow(
  {
    name: 'generateAuditBlueprintFlow',
    inputSchema: AuditBlueprintInputSchema,
    outputSchema: AuditBlueprintOutputSchema,
  },
  async input => {
    const {output} = await auditBlueprintPrompt(input);
    if (!output) {
      throw new Error('Failed to generate audit blueprint.');
    }
    return output;
  }
);
