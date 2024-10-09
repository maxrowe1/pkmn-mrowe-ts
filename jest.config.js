export const testPathIgnorePatterns = [
    "/node_modules/",
    "/out/"
];
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/test'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleDirectories: ['node_modules', '<rootDir>/src'],
    collectCoverage: true,
    coverageReporters: ['lcov', 'text'],
    coverageDirectory: 'coverage', // Ensure this is the correct path
};