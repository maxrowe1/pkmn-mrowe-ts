import { equalCategory } from "../src/utils"
import { Category } from "../src/classes/Enums"

const sessionStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    length: 0,
    key: jest.fn(),
    removeItem: jest.fn()
};
global.sessionStorage = sessionStorageMock;

test('equalCategory true', () => {
    const result = equalCategory("PHYSICAL", Category.PHYSICAL)
    expect(result).toBe(true)
});
test('equalCategory false', () => {
    const result = equalCategory("PHYSICAL", Category.SPECIAL)
    expect(result).toBe(false)
});