import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
});

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});
