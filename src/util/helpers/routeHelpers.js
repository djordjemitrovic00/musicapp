import history from "../../store/utils/history";

export const routeMatches = (route, secondRoute = null) => {
  let routeToCheck = secondRoute || history.location.pathname;

  if (
    routeToCheck === route ||
    routeToCheck + "/" === route ||
    routeToCheck.slice(0, -1) === route
  ) {
    return true;
  }
  return false;
};

export const replaceInRoute = (route, pathVariables = {}) => {
  const keys = Object.keys(pathVariables);

  return keys.reduce(
    (acc, key) => acc.replace(`:${key}`, pathVariables[`${key}`]),
    route
  );
};

export const dynamicRouteMatches = (dynamicRoute) => {
  let indexOfDynamicChar = dynamicRoute.indexOf(":");
  if (indexOfDynamicChar === -1) return false;
  const charactersToDelete = (dynamicRoute.length - indexOfDynamicChar) * -1;
  const newDynamicRoute = dynamicRoute.slice(0, charactersToDelete);
  return history.location.pathname.includes(newDynamicRoute);
};

export const isInRoute = (routeToCheck) => {
  return (
    history.location.pathname.includes(routeToCheck) ||
    dynamicRouteMatches(routeToCheck)
  );
};
