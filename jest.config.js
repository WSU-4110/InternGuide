import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset({
  tsconfig: './tsconfig.jest.json',
}).transform;

/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  transform: {
    ...tsJestTransformCfg,
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    'backend/src/app.controller.spec.ts',
    'backend/src/mindmap/mindmap.controller.spec.ts',
  ],
};