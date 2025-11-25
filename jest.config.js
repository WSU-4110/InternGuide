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
  transform: {
    ...tsJestTransformCfg,
  },
};
