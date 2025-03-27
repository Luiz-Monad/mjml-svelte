import { ElementType, parseDocument } from 'htmlparser2';
import { render } from 'dom-serializer';
import {
  type Node,
  Element,
  type Document,
  Text,
  isTag,
  isText,
  hasChildren,
  type NodeWithChildren
} from 'domhandler';

export type HtmlDocument = Document;
export type HtmlElement = Element;

export function stringToHtml(str: string): Document {
  return parseDocument(str, { decodeEntities: false });
}

export function htmlToString(node?: Document): string {
  return node ? render(node, { encodeEntities: false }) : '';
}

export function isElement(node: Node): node is Element {
  return isTag(node);
}

export function getText(node: Node): string | null {
  return isText(node) ? node.data : null;
}

export function findOneByTagName(parent: NodeWithChildren, tagName: string): Element | undefined {
  return parent.children.filter(isTag).find((child) => child.tagName === tagName);
}

export function findChildByTagName(parent: NodeWithChildren, tagName: string): Element[] {
  return parent.children
    .filter(isElement)
    .flatMap((child) => [
      ...(hasChildren(child) ? findChildByTagName(child, tagName) : []),
      ...(child.tagName === tagName ? [child] : [])
    ]);
}

export function createChildTag(
  parent: NodeWithChildren,
  tagName: string,
  tagType: 'script' | 'style' | 'tag' = 'tag'
): Element {
  const elementTypeMap: Record<
    typeof tagType,
    typeof ElementType.Script | typeof ElementType.Style | typeof ElementType.Tag
  > = {
    script: ElementType.Script,
    style: ElementType.Style,
    tag: ElementType.Tag
  };
  const newElement = new Element(tagName, {}, [], elementTypeMap[tagType]);
  parent.children.push(newElement);
  return newElement;
}

export function createChildText(parent: NodeWithChildren, text: string): Text {
  const textNode = new Text(text);
  parent.children.push(textNode);
  return textNode;
}

export function getOrCreateChildTag(parent: NodeWithChildren, tagName: string): Element {
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

export function removeChild(parent: NodeWithChildren, child: Node) {
  parent.children = Array.from(parent.children.filter((c) => c != child));
}
