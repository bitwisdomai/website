import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

async function testDirectAPI() {
  const models = [
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-pro',
  ];

  console.log('🧪 Testing Gemini API directly with v1 endpoint...\n');

  for (const model of models) {
    try {
      console.log(`Testing: ${model}...`);

      const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${API_KEY}`;

      const response = await axios.post(url, {
        contents: [{
          parts: [{
            text: 'Hello, respond with just "Working!"'
          }]
        }]
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const text = response.data.candidates[0].content.parts[0].text;
      console.log(`✅ SUCCESS: ${model}`);
      console.log(`   Response: ${text}\n`);

      console.log(`\n🎉 Working model found: ${model}`);
      console.log(`Use v1 API endpoint!\n`);
      break;

    } catch (error) {
      console.log(`❌ FAILED: ${model}`);
      if (error.response) {
        console.log(`   Status: ${error.response.status}`);
        console.log(`   Error: ${error.response.data.error?.message || 'Unknown error'}\n`);
      } else {
        console.log(`   Error: ${error.message}\n`);
      }
    }
  }
}

testDirectAPI();
