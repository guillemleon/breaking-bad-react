import { render, screen } from '@testing-library/react';
import App from './App';
import data from './data.json';

describe('Breaking Bad', () => {
  beforeAll(() => jest.spyOn(window, 'fetch'));

  // Test API call mocking fetch method
  it('Show list characters from the API', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => data
    });

    render(<App />);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith('https://www.breakingbadapi.com/api/characters/');

    for (let character of data) {
      expect(await screen.findByText(character.name)).toBeInTheDocument();
    }
  })

  it('Show a message in case of network error', async () => {
    window.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<App />)
    expect(await screen.findByText('Network error')).toBeInTheDocument();
  })
})
