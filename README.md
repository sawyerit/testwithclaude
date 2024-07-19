# Email Phone Lambda

This project is an AWS Lambda function that processes emails and phone numbers.

## Project Overview

The lambda function retrieves content from a file endpoint, extracts email addresses and phone numbers using regular expressions, and then checks each contact against a separate endpoint.

## Prerequisites

- Node.js (version 14.x or later recommended)
- npm (comes with Node.js)
- AWS SAM CLI (for local testing)

## Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd email-phone-lambda
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Building the Project

To build the project, run:

```
npm run build
```

This command uses esbuild to bundle the TypeScript code into a single JavaScript file, which is output to `dist/index.js`.

## Running Tests

To run the tests, use:

```
npm test
```

This command runs Jest to execute the test suite defined in `src/index.test.ts`.

## Running Locally

To run the lambda function locally, you need to have the AWS SAM CLI installed. The project includes a sample event file (`events/event.json`) that mimics an API Gateway proxy event. To invoke the function locally:

1. Make sure you've built the project using `npm run build`.
2. Run the following command:

```
npm start
```

This command uses SAM CLI to invoke the lambda function locally with the event defined in `events/event.json`.

Note: The lambda function expects two environment variables: `FILE_ENDPOINT` and `CHECK_ENDPOINT`. Make sure these are set in your local environment or in the `template.yaml` file before running the function locally.

## Project Structure

- `src/index.ts`: Main lambda function code
- `src/index.test.ts`: Unit tests for the lambda function
- `dist/`: Contains the built JavaScript files
- `events/event.json`: Sample API Gateway proxy event for local testing
- `template.yaml`: SAM template for defining the AWS resources

## Configuration

The lambda function uses two environment variables:
- `FILE_ENDPOINT`: The URL of the endpoint to retrieve the file content
- `CHECK_ENDPOINT`: The URL of the endpoint to check each contact

Make sure to set these in your AWS Lambda configuration or in the `template.yaml` file for local testing.

## Deployment

To deploy this lambda function to AWS, you can use the AWS SAM CLI or the AWS Console. Refer to the AWS documentation for detailed deployment instructions.

## License

This project is licensed under the ISC License.