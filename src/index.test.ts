import { handler } from './index';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked&lt;typeof axios&gt;;

describe('Lambda Handler', () => {
  it('should process emails and phone numbers correctly', async () => {
    // Mock GET request
    mockedAxios.get.mockResolvedValueOnce({
      data: 'Test email@example.com and phone 123-456-7890',
    });

    // Mock POST requests
    mockedAxios.post
      .mockResolvedValueOnce({ data: true }) // email
      .mockResolvedValueOnce({ data: false }); // phone

    const consoleSpy = jest.spyOn(console, 'log');

    const result = await handler({} as any);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({ message: 'Processing complete' });

    expect(consoleSpy).toHaveBeenCalledWith('Found: email@example.com');
    expect(consoleSpy).not.toHaveBeenCalledWith('Found: 123-456-7890');

    consoleSpy.mockRestore();
  });
});