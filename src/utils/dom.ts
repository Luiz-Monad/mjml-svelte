import { ElementType, parseDocument } from 'htmlparser2';
import { render } from 'dom-serializer';
import {
  type Document,
  type Node,
  type NodeWithChildren,
  Element,
  hasChildren,
  isDocument,
  isTag,
  isText,
  Text
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

export function getText(node: Node): string | undefined {
  return isText(node) ? node.data : undefined;
}

export function getAttribute(node: Node, attribName: string): string | undefined {
  return isTag(node)
    ? node.attributes.find((attrib) => attrib.name === attribName)?.value
    : undefined;
}

export function findOneByTagName(parent: NodeWithChildren, tagName: string): Element | undefined {
  return parent.children.filter(isTag).find((child) => child.tagName === tagName);
}

export function findChildByTagName(parent: NodeWithChildren, tagName: string): Element[] {
  return parent.children
    .filter(isTag)
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

export function moveAllChild(fromParent: NodeWithChildren, toParent: NodeWithChildren) {
  const items = fromParent.children;
  fromParent.children = [];
  for (const item of items) {
    item.parent = isTag(toParent) ? toParent : isDocument(toParent) ? toParent : null;
  }
  toParent.children.push(...items);
}

export function removeChild(parent: NodeWithChildren, child: Node) {
  parent.children = Array.from(parent.children.filter((c) => c != child));
}
