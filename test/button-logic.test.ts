import { fetchGame } from "../src/button-logic"

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ id: 0, name: 'name' }),
    })
) as jest.Mock;

test('Get player', () => {
    fetchGame("test", "GET");
    expect(fetch).toHaveBeenCalledTimes(1);
});
