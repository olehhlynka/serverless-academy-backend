import { Link, App } from "../configs/constants.config";
import url from "url";

const shuffleString = (str: string): string => {
  const chars = str.split("");
  for (let i = chars.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
};

const generateString = (
  size: number = Link.SHORT_PATH_LENGTH
): string => {
  const newString = shuffleString(Link.URL_CHARACTERS);
  return newString.substring(0, size);
};

const createShortLink = (path: string): string => {
  return url.format({
    protocol: App.PROTOCOL,
    hostname: App.DOMAIN,
    port: App.PORT,
    pathname: path,
  });
};

export { createShortLink, generateString };
