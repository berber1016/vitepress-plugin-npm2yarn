import convert from "@armano/npm-to-yarn";
import MarkdownIt = require("markdown-it");

export type ToType = "npm" | "yarn";
const KEY = "npm2yarn";

const getCodeType = (content: string) => {
  if (content.trim().includes("npm")) {
    return "npm";
  } else {
    return "yarn";
  }
};
export const npm2yarnPlugin: (md: MarkdownIt) => void = (md) => {
  const originFence = md.renderer.rules.fence;
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, ...rest] = args;
    let to: ToType = "npm";
    const currentToken = tokens[idx];
    const OFF = currentToken.info.includes(KEY);

    const firstCode = originFence(tokens, idx, ...rest);
    const firstCodeTitle = getCodeType(currentToken.content).toUpperCase();
    if (OFF) {
      if (getCodeType(currentToken.content) === "npm") to = "yarn";
      const translatContent = convert(currentToken.content, to);
      currentToken.content = translatContent;
      const secondCode = originFence(tokens, idx, ...rest);
      const secondCodeTitle = getCodeType(currentToken.content).toUpperCase();
      return `<CodeGroup><CodeGroupItem title="${firstCodeTitle}" actived>${firstCode} </CodeGroupItem><CodeGroupItem title="${secondCodeTitle}">${secondCode} </CodeGroupItem> </CodeGroup>`;
    } else {
      return originFence(tokens, idx, ...rest);
    }
  };
  // return md;
};

export default npm2yarnPlugin;
