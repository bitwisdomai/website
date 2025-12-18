import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

async function listModels() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    console.log('🔍 Fetching available Gemini models...\n');

    // List all available models
    const models = await genAI.listModels();

    console.log('📋 Available Models:\n');
    for await (const model of models) {
      console.log(`Model: ${model.name}`);
      console.log(`  Display Name: ${model.displayName}`);
      console.log(`  Supported Methods: ${model.supportedGenerationMethods.join(', ')}`);
      console.log('');
    }

  } catch (error) {
    console.error('❌ Error listing models:', error.message);
  }
}

listModels();
