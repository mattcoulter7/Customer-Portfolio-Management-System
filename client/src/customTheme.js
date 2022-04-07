// 1. Import the utilities
import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

// 2. Update the breakpoints as key-value pairs
const breakpoints = createBreakpoints({
  sm: "425px",
  md: "896px",
  lg: "961px",
  xl: "1200px",
  "2xl": "1536px",
})

// 3. Extend the theme
const customTheme = extendTheme({ breakpoints })

export default customTheme
