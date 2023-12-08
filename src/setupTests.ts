import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});

// import matchers from '@testing-library/jest-dom/matchers';
// import { expect, vi } from 'vitest';

// expect.extend(matchers);