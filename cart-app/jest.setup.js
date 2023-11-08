// jest.setup.js
import "@testing-library/jest-dom";
// Necessary to test Dialog components:
import ResizeObserver from "resize-observer-polyfill";

global.ResizeObserver = ResizeObserver;
