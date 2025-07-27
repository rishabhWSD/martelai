# Agent Training System

## Overview
The Agent Training System provides comprehensive training capabilities for AI agents, allowing each agent to be trained with:
- Custom prompts and personas
- Specialized knowledge bases
- Industry whitepapers and documentation
- Business context integration

## Features

### 🎓 Agent-Specific Training
- **Custom Prompts**: Each agent has specialized prompts for different scenarios
- **Knowledge Base**: Curated expertise and best practices
- **PDF Integration**: Automatic extraction and processing of whitepaper content
- **Business Context**: Personalized responses based on Martel Brain profiles

### 🧠 Available Agents
1. **Business Strategist** - Strategic planning, market analysis, competitive positioning
2. **Marketing Strategist** - Brand strategy, digital marketing, customer acquisition
3. **Sales Strategist** - Sales process optimization, pipeline management, revenue growth
4. **Business Analyst** - Process analysis, data insights, operational efficiency

### 📚 Training Components

#### Prompts (`src/lib/agents/prompts/`)
- `base`: General expertise prompt for the agent
- `withBusinessContext`: Personalized prompt using business profile data
- `fallback`: Default response when context is limited

#### Knowledge Base (`src/lib/agents/knowledge/`)
- Markdown files with specialized knowledge
- Best practices and frameworks
- Industry insights and methodologies

#### Configuration (`src/lib/agents/config.ts`)
- Agent metadata and settings
- Expertise areas definition
- Knowledge source mapping

## How It Works

### 1. Training Data Loading
```typescript
const trainingManager = new AgentTrainingManager();
const trainingData = await trainingManager.getAgentTrainingData("Marketing Strategist");
```

### 2. PDF Processing
```typescript
const pdfProcessor = new PDFProcessor();
const content = await pdfProcessor.extractTextFromPDF("whitepaper.pdf");
```

### 3. Enhanced Responses
- Loads agent-specific prompts and knowledge
- Integrates business context from Martel Brain
- Provides expert-level, customized responses

## Usage

### For Administrators
1. **Access Training Manager**: Navigate to `/agents/training`
2. **View Agent Status**: See training data for each agent
3. **Refresh Training**: Update agent knowledge bases
4. **Clear Cache**: Reset training data cache

### For End Users
1. **Set Business Profile**: Configure Martel Brain with business details
2. **Interact with Agents**: Get personalized responses based on your business context
3. **Receive Expert Advice**: Benefit from specialized knowledge and industry best practices

## API Endpoints

### Training Management
- `GET /api/agents/training` - Get training overview
- `GET /api/agents/training?agent=AgentName` - Get specific agent details
- `POST /api/agents/training` - Refresh or clear training data

### Agent Responses
- `POST /api/agents/respond` - Get trained agent response

## Adding New Training Data

### 1. Create Custom Prompts
```typescript
// src/lib/agents/prompts/new-agent.ts
export const newAgentPrompt = {
  base: "You are an expert in...",
  withBusinessContext: "Based on business context: {businessContext}...",
  fallback: "I'm here to help with..."
};
```

### 2. Add Knowledge Base
```markdown
<!-- src/lib/agents/knowledge/expertise-area.md -->
# Expertise Area Guide
## Overview
...
## Best Practices
...
```

### 3. Update Configuration
```typescript
// src/lib/agents/config.ts
"New Agent": {
  name: "New Agent",
  role: "Senior Expert",
  description: "Provides expertise in...",
  expertiseAreas: ["Area 1", "Area 2"],
  // ... other config
}
```

### 4. Add to Prompt Manager
```typescript
// src/lib/agents/trainingManager.ts
case "New Agent":
  return newAgentPrompt;
```

## PDF Training Materials

### Current PDFs
The system automatically processes PDFs from the `public/uploads/` directory:
- Business strategy whitepapers
- Marketing best practices
- Sales methodologies
- Operational guides

### Adding New PDFs
1. Upload PDFs to `public/uploads/`
2. Reference in agent configuration
3. Refresh training data

## Benefits

### 🎯 Personalized Responses
- Business-specific recommendations
- Industry-relevant advice
- Context-aware insights

### 📈 Expert-Level Quality
- Professional frameworks and methodologies
- Data-driven recommendations
- Industry best practices

### ⚡ Efficient Training
- Automatic PDF processing
- Cached training data
- Scalable architecture

### 🔄 Continuous Improvement
- Easy knowledge updates
- Training data refresh
- Performance monitoring

## Technical Architecture

### Components
- **TrainingManager**: Orchestrates training data loading
- **PDFProcessor**: Extracts text from whitepaper PDFs
- **Agent Configs**: Define agent personalities and expertise
- **Prompt Templates**: Structure agent responses
- **Knowledge Base**: Store specialized information

### Flow
1. User interacts with agent
2. System loads agent training data
3. Business context integrated (if available)
4. Expert response generated using training materials
5. Personalized advice delivered

## Monitoring and Maintenance

### Training Status
- Monitor agent training completeness
- Track knowledge base updates
- Review response quality

### Performance
- Cache management for faster responses
- Training data optimization
- Error handling and fallbacks

### Updates
- Regular knowledge base updates
- New whitepaper integration
- Agent prompt refinements

## Future Enhancements
- Real-time training data updates
- Advanced PDF processing with embeddings
- Custom agent creation interface
- Training analytics and insights
- Multi-language support

This training system transforms generic AI responses into expert-level, business-specific advice that drives real value for users.
