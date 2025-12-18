import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const modelsToTest = [
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash',
  'gemini-1.5-pro-latest',
  'gemini-1.5-pro',
  'gemini-pro',
  'gemini-1.0-pro',
  'gemini-1.0-pro-latest',
];

async function testModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  console.log('🧪 Testing available Gemini models...\n');

  for (const modelName of modelsToTest) {
    try {
      console.log(`Testing: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });

      const result = await model.generateContent('Hello');
      const response = await result.response;
      const text = response.text();

      console.log(`✅ SUCCESS: ${modelName}`);
      console.log(`   Response: ${text.substring(0, 50)}...\n`);

      // If we found a working model, stop testing
      console.log(`\n🎉 Working model found: ${modelName}`);
      console.log(`Update your code to use this model name.\n`);
      break;

    } catch (error) {
      console.log(`❌ FAILED: ${modelName}`);
      console.log(`   Error: ${error.message}\n`);
    }
  }
}

testModels();
