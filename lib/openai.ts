import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface GenerateArticleProps {
  keyword: string;
  customPrompt?: string;
  minWords?: number;
  maxWords?: number;
}

export async function generateArticle({
  keyword,
  customPrompt = '',
  minWords = 800,
  maxWords = 1200,
}: GenerateArticleProps) {
  const systemPrompt = `You are an expert Indonesian real estate content writer. 
Create a comprehensive, SEO-friendly article in Indonesian about "${keyword}".
The article should be between ${minWords} and ${maxWords} words.
Use a natural, engaging tone and include relevant subheadings.
Focus on providing valuable information for Indonesian property buyers and investors.
${customPrompt}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: `Write an article about "${keyword}" with proper structure, including:
1. Engaging introduction
2. Multiple relevant subheadings
3. Practical tips and insights
4. Clear conclusion
Make it SEO-friendly and naturally incorporate the keyword.`,
      },
    ],
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
}

export async function generateMetadata(title: string, content: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are an SEO expert. Generate optimized metadata in Indonesian.",
      },
      {
        role: "user",
        content: `Generate SEO metadata for this article:
Title: ${title}
Content: ${content.substring(0, 500)}...

Please provide:
1. SEO-optimized meta title (max 60 chars)
2. Meta description (max 155 chars)
3. 5 relevant tags
4. Most appropriate category from: Tips Properti, Investasi, Desain Interior
5. Schema.org Article markup`,
      },
    ],
    temperature: 0.3,
  });

  const response = completion.choices[0].message.content;
  
  // Parse the response
  const metaTitle = response.match(/Meta Title: (.*)/)?.[1];
  const metaDescription = response.match(/Meta Description: (.*)/)?.[1];
  const tags = response.match(/Tags: (.*)/)?.[1].split(',').map(tag => tag.trim());
  const category = response.match(/Category: (.*)/)?.[1];
  const schema = JSON.parse(response.match(/Schema:(.*)$/s)?.[1] || '{}');

  return {
    metaTitle,
    metaDescription,
    tags,
    category,
    schema,
  };
}

export async function suggestInternalLinks(content: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are an SEO expert. Suggest relevant internal linking opportunities.",
      },
      {
        role: "user",
        content: `Based on this content, suggest 3-5 relevant topics that would make good internal links:
${content.substring(0, 500)}...`,
      },
    ],
    temperature: 0.5,
  });

  return completion.choices[0].message.content
    .split('\n')
    .filter(line => line.trim())
    .map(topic => topic.replace(/^\d+\.\s*/, '').trim());
}