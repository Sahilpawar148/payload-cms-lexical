import { ElementNode, DOMExportOutput, LexicalEditor } from 'lexical'

export class MarkNode extends ElementNode {
  static getType(): string {
    return 'mark'
  }

  static clone(node: MarkNode): MarkNode {
    return new MarkNode(node.__key)
  }

  createDOM(): HTMLElement {
    const dom = document.createElement('mark')
    return dom
  }

  updateDOM(): false {
    return false
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('mark')
    return { element }
  }

  static importDOM(): any {
    return {
      mark: () => ({
        conversion: () => ({ node: new MarkNode() }),
        priority: 1,
      }),
    }
  }

  static importJSON(): any {
    return {
      type: 'mark',
      version: 1,
    }
  }

  exportJSON(): any {
    return {
      type: 'mark',
      version: 1,
    }
  }
}
