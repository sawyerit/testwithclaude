import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';
import nock from 'nock';

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_REGEX = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g;

// Define constants for endpoint URLs
const BASE_URL = 'https://example.com';
const FILE_ENDPOINT = `${BASE_URL}/file-endpoint`;
const CHECK_ENDPOINT = `${BASE_URL}/check-endpoint`;

// Define the type for the request body
interface CheckContactRequest {
  contact: string;
}

// Stub HTTP endpoints
nock(BASE_URL)
  .get('/file-endpoint')
  .reply(200, `
    Test content with emails and phone numbers:
    john@example.com
    555-123-4567
    alice@test.org
    123.456.7890
  `);

nock(BASE_URL)
  .post('/check-endpoint')
  .reply(200, (uri, requestBody: CheckContactRequest) => {
    const { contact } = requestBody;
    // Simulate some contacts being valid and others invalid
    return contact.length % 2 === 0;
  });

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log('Lambda function started');

    // Call GET endpoint to retrieve file content
    const getResponse = await axios.get(FILE_ENDPOINT);
    const fileContent = getResponse.data;

    // Extract emails and phone numbers
    const emails = fileContent.match(EMAIL_REGEX) || [];
    const phoneNumbers = fileContent.match(PHONE_REGEX) || [];

    console.log('Extracted emails:', emails);
    console.log('Extracted phone numbers:', phoneNumbers);

    // Combine emails and phone numbers
    const contacts = [...emails, ...phoneNumbers];

    // Check each contact against POST endpoint
    const validContacts = [];
    for (const contact of contacts) {
      try {
        const postResponse = await axios.post<boolean>(CHECK_ENDPOINT, { contact } as CheckContactRequest);
        if (postResponse.data === true) {
          validContacts.push(contact);
          console.log(`Valid contact found: ${contact}`);
        } else {
          console.log(`Invalid contact: ${contact}`);
        }
      } catch (error) {
        console.error(`Error checking contact ${contact}:`, error);
      }
    }

    console.log('Lambda function completed successfully');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Processing complete', validContacts }),
    };
  } catch (error) {
    console.error('Error in Lambda handler:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error', error: (error as Error).message }),
    };
  }
};