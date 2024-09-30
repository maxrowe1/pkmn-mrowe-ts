import {Manager} from "../src/button-logic";

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ id: 0, name: 'name' }),
    })
) as jest.Mock;

test('Get player', () => {
    
    new Manager().getCombatants().then(res => {
        //expect(res.id).toEqual(0);
        //expect(res.name).toEqual('name');
    });

    expect(fetch).toHaveBeenCalledTimes(1);
});
