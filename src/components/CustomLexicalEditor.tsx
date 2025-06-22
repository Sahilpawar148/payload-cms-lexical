'use client'

import React from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { $generateHtmlFromNodes } from '@lexical/html'
import { EditorState, $getRoot, $isElementNode } from 'lexical'

import Toolbar from './Toolbar'
import { MarkNode } from '@/lexical/nodes/MarkNode'
import { FootnoteNode } from '@/lexical/nodes/FootnoteNode'

import './editor.css'

const editorConfig = {
  namespace: 'CustomEditor',
  theme: {},
  onError(error: Error) {
    console.error('Lexical Error:', error)
  },
  nodes: [MarkNode, FootnoteNode],
}

const generateHtmlWithFootnotes = (editor: any): string => {
  let html = ''
  const footnotes: string[] = []

  editor.getEditorState().read(() => {
    const root = $getRoot()

    const collectFootnotes = (node: any) => {
      if (node instanceof FootnoteNode) {
        const id = node.getId()
        const content = node.getContent()
        footnotes.push(`<li id="footnote-${id}">${content}</li>`)
      }

      if ($isElementNode(node)) {
        for (const child of node.getChildren()) {
          collectFootnotes(child)
        }
      }
    }

    collectFootnotes(root)

    // ✅ wrap HTML generation inside read scope
    html = $generateHtmlFromNodes(editor, null)
  })

  if (footnotes.length > 0) {
    return `${html}<footer><ul>${footnotes.join('')}</ul></footer>`
  }

  return html
}

const CustomLexicalEditor: React.FC = () => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div style={{ position: 'relative' }}>
        <Toolbar />

        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<div className="editor-placeholder">Enter content…</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>

      <HistoryPlugin />

      <OnChangePlugin
        onChange={(editorState: EditorState, editor) => {
          const html = generateHtmlWithFootnotes(editor)
          console.log('Generated HTML with footnotes:', html)
        }}
      />
    </LexicalComposer>
  )
}

export default CustomLexicalEditor
