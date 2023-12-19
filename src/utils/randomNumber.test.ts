import { describe, expect, it } from 'vitest';
import { randomNumber } from './randomNumber';

describe("randomNumber", ()=> {
  it("should generate a random number", ()=> {

    const number = randomNumber(3);

    expect(number).toBeLessThanOrEqual(2);
    expect(number).toBeGreaterThanOrEqual(0);
  })

})