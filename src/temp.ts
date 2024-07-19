import AnthropicBedrock from '@anthropic-ai/bedrock-sdk';

const client = new AnthropicBedrock();

async function main() {
  const message = await client.messages.create({
    model: 'anthropic.claude-3-5-sonnet-20240620-v1:0',
    max_tokens: 256,
    messages: [{"role": "user", "content": "Hello, world"}],
    system: "you are a blank"
  });
  console.log(message);
}

main().catch(console.error);