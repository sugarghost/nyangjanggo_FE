export const getNowUrl = () => window.location.pathname;

export const isUserPath = (path: string) => {
  if (path.split("/")[1] === "users") {
    return true;
  } 
    return false;
  
};

export const renderHelper = (segment: string, segments: string[]): boolean => {
  let result = false;

  for (const item of segments) {
    if (item === segment) {
      result = true;
    }
  }

  return result;
};

export const getRedirectUrl = () => {
  const searchParams = new URLSearchParams(window.location.search);

  return searchParams.get("redirectUrl");
};
