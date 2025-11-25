/// <reference types="vitest" />
import { defineConfig } from "vitest/config"

export default defineConfig({
test: {
    globals: true,          // gives you describe(), test(), beforeEach()
    environment: "jsdom",   // needed for React Testing Library
    exclude: [
    "backend/**",                // ignore ALL backend test
    "node_modules/**",
    ],
},
})
