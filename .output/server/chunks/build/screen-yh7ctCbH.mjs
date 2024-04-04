import { b3 as useBreakpoints, b4 as breakpointsTailwind } from './server.mjs';

const breakpoints = useBreakpoints(breakpointsTailwind);
const isSmallScreen = breakpoints.smallerOrEqual("sm");
const isMediumOrLargeScreen = breakpoints.between("sm", "xl");
breakpoints.smallerOrEqual("xl");

export { isSmallScreen as a, isMediumOrLargeScreen as i };
