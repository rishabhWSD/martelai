// Mock implementation to avoid OpenAI API calls during development
import { AgentChatMessage } from './chatMemory';

const agentMemories: Record<string, string[]> = {};

export async function mockStreamAgentReply(
  prompt: string, 
  agent: string, 
  externalHistory?: AgentChatMessage[]
): Promise<string> {
  if (!agentMemories[agent]) agentMemories[agent] = [];
  
  // Log to help debug
  console.log(`Processing request for agent: ${agent}`);
  console.log(`Prompt: ${prompt.substring(0, 100)}${prompt.length > 100 ? '...' : ''}`);
  console.log(`External history provided: ${externalHistory ? 'yes' : 'no'}`);
  
  // Generate a mock response based on agent type - for development only
  let mockResponse = "";
  
  switch(agent) {
    case "Market Analyst":
      mockResponse = `## Market Analysis\n\nBased on current trends, the ${prompt.includes('technology') ? 'technology' : 'target'} market shows promising growth opportunities. Key indicators suggest:\n\n* Market size: $4.2 billion, with 7.8% CAGR\n* Major competitors: Acme Corp, TechGiant, InnoSystems\n* Consumer sentiment is trending positive\n\nRecommend focusing on product differentiation and value-based pricing strategies.`;
      break;
    case "Business Analyst":
      mockResponse = `## Business Analysis\n\nAfter reviewing the internal processes, I've identified the following:\n\n* Current operational efficiency: 72%\n* Key bottleneck: Approval workflow in procurement\n* Potential cost savings: 12-15% by streamlining processes\n\nRecommendation: Implement automated approval systems with defined SLAs.`;
      break;
    case "Marketing Strategist":
      mockResponse = `## Marketing Strategy\n\nBased on your target audience, I recommend:\n\n* Content marketing focused on educational resources\n* Partnership with industry influencers\n* Emphasis on sustainability in branding\n\nCustomer acquisition cost could be reduced by 18% through these targeted approaches.`;
      break;
    case "Sales Strategist":
      mockResponse = `## Sales Strategy\n\nTo boost revenue channels:\n\n* Implement tiered pricing structure\n* Develop upsell pathways for existing customers\n* Create specialized sales team for enterprise accounts\n\nThese changes could increase average deal size by 24% and improve conversion rates.`;
      break;
    case "Geo-analyst":
      mockResponse = `## Geopolitical Analysis\n\nRecent developments in ${prompt.includes('Asia') ? 'Asian' : 'global'} markets indicate:\n\n* Supply chain shifts from traditional hubs\n* Emerging regulatory frameworks in key regions\n* Resource allocation challenges in manufacturing sectors\n\nRecommendation: Diversify supplier networks and monitor policy developments in Southeast Asia.`;
      break;
    default:
      mockResponse = `Thank you for your prompt. I've analyzed the information provided and prepared some insights.\n\nYour query about "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}" requires a thoughtful analysis. Here's my assessment:\n\n1. The market shows potential for growth in this area\n2. Consider focusing on differentiated value propositions\n3. Monitor competitor activities closely over the next quarter`;
  }
  
  if (prompt.includes('PDF') || (externalHistory && JSON.stringify(externalHistory).includes('PDF'))) {
    mockResponse += `\n\n*Note: This analysis incorporates insights from the PDF documents you provided.*`;
  }
  
  // Store in memory
  agentMemories[agent].push(`User: ${prompt}`);
  agentMemories[agent].push(`${agent}: ${mockResponse}`);
  
  return mockResponse;
}
