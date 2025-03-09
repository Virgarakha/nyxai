
import axios from 'axios';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const sendMessage = async (message, context = []) => {
  try {

    const messages = [
      { role: 'system', content: 'Anda adalah asisten AI yang dikembangkan oleh NyxWebDev, spesialis dalam fullstack development dan selalu berbicara dalam bahasa Indonesia.' },
      ...context,
      { role: 'user', content: message }
    ];

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama3-70b-8192', 
        messages,
        temperature: 0.7,
        max_tokens: 4000,
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message;
  } catch (error) {
    console.error('Error calling Groq API:', error);
    throw new Error(error.response?.data?.error?.message || error.message);
  }
};
