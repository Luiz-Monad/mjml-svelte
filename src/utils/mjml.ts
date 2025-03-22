import type { MJMLJsonObject, MJMLJsonWithChildren, MJMLJsonWithContent } from 'mjml-core';

export function jsonToMjml(obj: MJMLJsonObject) {
  const { tagName, attributes } = obj;
  const { children } = isJsonChildren(obj) ? obj : {};
  const { content } = isJsonContent(obj) ? obj : {};
  const subNode =
    children && children.length > 0 ? children.map(jsonToMjml).join('\n') : content || '';
  const stringAttrs = Object.keys(attributes)
    .map((attr) => `${attr}="${attributes[attr]}"`)
    .join(' ');
  return `<${tagName}${stringAttrs === '' ? '>' : ` ${stringAttrs}>`}${subNode}</${tagName}>`;
}

export function isJsonChildren(obj: MJMLJsonObject): obj is MJMLJsonWithChildren {
  return (obj as MJMLJsonWithChildren).children !== undefined;
}

export function isJsonContent(obj: MJMLJsonObject): obj is MJMLJsonWithContent {
  return (obj as MJMLJsonWithChildren).children !== undefined;
}

export function findChildByTagName(parent: MJMLJsonWithChildren, tagName: string) {
  return parent.children.find((child) => child.tagName === tagName);
}

export function createChildTag(parent: MJMLJsonObject, tagName: string) {
  const newTag: MJMLJsonObject = {
    tagName,
    attributes: {}
  };
  const withChild = parent as MJMLJsonWithChildren;
  withChild.children = [newTag, ...(withChild.children ?? [])];
  return newTag;
}

export function getOrCreateChildTag(parent: MJMLJsonWithChildren, tagName: string) {
  return findChildByTagName(parent, tagName) ?? createChildTag(parent, tagName);
}
