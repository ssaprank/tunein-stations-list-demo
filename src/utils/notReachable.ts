export const notReachable = (_x: never): never => {
  throw new Error("Should have never been reached");
};
