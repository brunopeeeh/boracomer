export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1400,
};

export type BreakpointKey = keyof typeof BREAKPOINTS;

export const isTabletWidth = (vw: number) => vw >= BREAKPOINTS.sm && vw < BREAKPOINTS.lg;