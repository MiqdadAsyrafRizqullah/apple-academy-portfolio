import '@testing-library/jest-dom'
import * as fc from 'fast-check'
import { configureAxe } from 'jest-axe'

// Configure fast-check global settings
fc.configureGlobal({ numRuns: 100 })

// Configure jest-axe global settings
configureAxe({
  rules: {
    // Relax color-contrast rule for testing environments where CSS variables aren't resolved
    'color-contrast': { enabled: false },
  },
})
