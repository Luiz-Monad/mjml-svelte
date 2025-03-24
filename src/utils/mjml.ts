import { ElementType, parseDocument } from 'htmlparser2';
import { render } from 'dom-serializer';
import { type Node, Element, type Document, Text, isTag } from 'domhandler';

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

export function findChildByTagName(parent: Element, tagName: string): Element | undefined {
  return parent.children.find(
    (child): child is Element => isElement(child) && child.tagName === tagName
  );
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
  const existingChild = findChildByTagName(parent, tagName);
  if (existingChild) {
    return existingChild;
  }
  return createChildTag(parent, tagName);
}
