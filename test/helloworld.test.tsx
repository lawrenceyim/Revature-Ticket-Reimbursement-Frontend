import { describe, it, expect } from 'vitest'
import {render} from "@testing-library/react"
import App from '../src/App';

describe('A truthy statement', () => {
    it('should be equal to 2', () => {
        expect(1 + 1).toEqual(2)
    });
});

describe("check app render", () => {
    it("renders", () => {
        render(<App/>);
    });
});