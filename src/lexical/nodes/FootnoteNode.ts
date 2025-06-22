import {
  ElementNode,
  DOMExportOutput,
  SerializedElementNode,
  Spread,
} from 'lexical'

export type SerializedFootnoteNode = Spread<
  {
    id: number
    content: string
  },
  SerializedElementNode
>

export class FootnoteNode extends ElementNode {
  __id: number
  __content: string

  constructor(id = 1, content = '', key?: string) {
    super(key)
    this.__id = id
    this.__content = content
  }

  static getType(): string {
    return 'footnote'
  }

  static clone(node: FootnoteNode): FootnoteNode {
    return new FootnoteNode(node.__id, node.__content, node.__key)
  }

  createDOM(): HTMLElement {
    const sup = document.createElement('sup')
    sup.textContent = `${this.__id}`
    sup.className = 'footnote-node'
    return sup
  }

  updateDOM(): boolean {
    return false
  }

  exportDOM(): DOMExportOutput {
    const sup = document.createElement('sup')
    const a = document.createElement('a')
    a.href = `#footnote-${this.__id}`
    a.textContent = `${this.__id}`
    sup.appendChild(a)
    return { element: sup }
  }

  static importJSON(serializedNode: SerializedFootnoteNode): FootnoteNode {
    return new FootnoteNode(serializedNode.id, serializedNode.content)
  }

  exportJSON(): SerializedFootnoteNode {
    return {
      ...super.exportJSON(),
      type: 'footnote',
      version: 1,
      id: this.__id,
      content: this.__content,
    }
  }

  getContent(): string {
    return this.__content
  }

  setContent(content: string): void {
    const self = this.getWritable()
    self.__content = content
  }

  getId(): number {
    return this.__id
  }

  setId(id: number): void {
    const self = this.getWritable()
    self.__id = id
  }

  isInline(): boolean {
    return true
  }
}
