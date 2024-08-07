const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.generatePlaylistDescription = async (prompt) => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: `Generate a playlist description based on the following mood: ${prompt}`,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating playlist description:', error);
    throw error;
  }
};
