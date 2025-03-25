import { ElementType, parseDocument } from 'htmlparser2';
import { render } from 'dom-serializer';
import { type Node, Element, type Document, Text, isTag, hasChildren } from 'domhandler';

export type XmlDocument = Document;

export function stringToXml(str: string): Document {
  return parseDocument(str);
}

export function xmlToString(node?: Document): string {
  return node ? render(node) : '';
}

export function isElement(node: Node): node is Element {
  return isTag(node);
}

export function findOneByTagName(parent: Element, tagName: string): Element | undefined {
  return parent.children.filter(isElement).find((child) => child.tagName === tagName);
}

export function findChildByTagName(parent: Element, tagName: string): Element[] {
  return parent.children
    .filter(isElement)
    .flatMap((child) => [
      ...(hasChildren(child) ? findChildByTagName(child, tagName) : []),
      ...(child.tagName === tagName ? [child] : [])
    ]);
}

export function createChildTag(parent: Element, tagName: string): Element {
  const newElement = new Element(tagName, {}, [], ElementType.Tag);
  parent.children.push(newElement);
  return newElement;
}

export function createChildText(parent: Element, text: string): Text {
  const textNode = new Text(text);
  parent.children.push(textNode);
  return textNode;
}

export function getOrCreateChildTag(parent: Element, tagName: string): Element {
  const existingChild = findOneByTagName(parent, tagName);
  if (existingChild) {
    return existingChild;
  }
  return createChildTag(parent, tagName);
}

export function moveAllChild(fromParent: Element, toParent: Element) {
  const items = fromParent.children;
  fromParent.children = [];
  for (const item of items) {
    item.parent = toParent;
  }
  toParent.children.push(...items);
}

export function removeChild(parent: Element, child: Element) {
  parent.children = Array.from(parent.children.filter((c) => c != child));
}
