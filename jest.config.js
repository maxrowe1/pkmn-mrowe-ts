export const testPathIgnorePatterns = [
    "/node_modules/",
    "/out/"
];
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageReporters: ['lcov', 'text'],
};