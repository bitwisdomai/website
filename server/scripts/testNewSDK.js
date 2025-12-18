import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

async function testNewSDK() {
  try {
    console.log('🧪 Testing new @google/genai SDK...\n');
    const apiKey = process.env.GEMINI_API_KEY;
    console.log(`API Key: ${apiKey ? apiKey.substring(0, 15) + '...' : 'Not found'}\n`);

    // Initialize client with explicit API key
    const ai = new GoogleGenAI({ apiKey });

    const modelsToTest = [
      'gemini-2.5-flash',
      'gemini-3-pro-preview',
      'gemini-2.0-flash-exp',
      'gemini-1.5-flash',
    ];

    for (const modelName of modelsToTest) {
      try {
        console.log(`Testing: ${modelName}...`);

        const response = await ai.models.generateContent({
          model: modelName,
          contents: 'Say "Hello from BitWisdom!" in a friendly way.',
        });

        console.log(`✅ SUCCESS: ${modelName}`);
        console.log(`   Response: ${response.text}\n`);

        console.log(`\n🎉 Working model found: ${modelName}`);
        console.log(`Your chatbot will use this model!\n`);
        break;

      } catch (error) {
        console.log(`❌ FAILED: ${modelName}`);
        console.log(`   Error: ${error.message}\n`);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testNewSDK();
