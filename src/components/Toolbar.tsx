'use client'

import React, { useEffect, useState } from 'react'
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  TextFormatType,
} from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getNextFootnoteId } from '@/utils/footnoteCounter'
import { FootnoteNode } from '@/lexical/nodes/FootnoteNode'
import {
  faBold,
  faItalic,
  faUnderline,
  faCode,
  faHighlighter,
  faStrikethrough,
  faSuperscript,
} from '@fortawesome/free-solid-svg-icons'
import { MarkNode } from '@/lexical/nodes/MarkNode'

const ToolbarButton = ({
  icon,
  title,
  onClick,
  active = false,
}: {
  icon: any
  title: string
  onClick: () => void
  active?: boolean
}) => (
  <button
    onClick={onClick}
    title={title}
    className={`toolbar-btn ${active ? 'active' : ''}`}
    style={{ color: active ? 'orange' : 'inherit' }}
  >
    <FontAwesomeIcon icon={icon} />
  </button>
)







export default function Toolbar() {
  const [editor] = useLexicalComposerContext()
  const [activeFormats, setActiveFormats] = useState<Set<TextFormatType>>(new Set())
  const [isMarkActive, setIsMarkActive] = useState(false)

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          const formatBitfield = selection.format
          const formats: TextFormatType[] = []

          if (formatBitfield & (1 << 0)) formats.push('bold')
          if (formatBitfield & (1 << 1)) formats.push('italic')
          if (formatBitfield & (1 << 2)) formats.push('underline')
          if (formatBitfield & (1 << 3)) formats.push('strikethrough')
          if (formatBitfield & (1 << 4)) formats.push('code')
          if (formatBitfield & (1 << 6)) formats.push('superscript')

          setActiveFormats(new Set(formats))

          const nodes = selection.getNodes()
          const markFound = nodes.some(
            (node) => node.getParent()?.getType?.() === 'mark'
          )
          setIsMarkActive(markFound)
        }
      })
    })
  }, [editor])

  const isFormatActive = (format: TextFormatType) => {
    return activeFormats.has(format)
  }

  const formatCommand = (format: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)
  }

  const toggleMark = () => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes()
        const markFound = nodes.some(
          (node) => node.getParent()?.getType?.() === 'mark'
        )

        if (markFound) {
          nodes.forEach((node) => {
            const parent = node.getParent()
            if (parent?.getType?.() === 'mark') {
              const children = [...parent.getChildren()]
              children.forEach((child) => parent.insertBefore(child))
              parent.remove()
            }
          })
        } else {
          const markNode = new MarkNode()
          const anchor = nodes[0]
          anchor.insertBefore(markNode)
          nodes.forEach((node) => markNode.append(node))
        }
      }
    })
  }   


  const insertFootnote = () => {
  editor.update(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const paragraph = selection.anchor.getNode().getTopLevelElementOrThrow()
      const footnoteNode = new FootnoteNode(getNextFootnoteId())
      paragraph.append(footnoteNode)
    }
  })
}

  return (
    <div className="toolbar">
      <ToolbarButton icon={faBold} title="Bold" onClick={() => formatCommand('bold')} active={isFormatActive('bold')} />
      <ToolbarButton icon={faItalic} title="Italic" onClick={() => formatCommand('italic')} active={isFormatActive('italic')} />
      <ToolbarButton icon={faUnderline} title="Underline" onClick={() => formatCommand('underline')} active={isFormatActive('underline')} />
      <ToolbarButton icon={faStrikethrough} title="Strikethrough" onClick={() => formatCommand('strikethrough')} active={isFormatActive('strikethrough')} />
      <ToolbarButton icon={faHighlighter} title="Highlight" onClick={toggleMark} active={isMarkActive} />
      <ToolbarButton icon={faSuperscript} title="Insert Footnote" onClick={insertFootnote} />
      <ToolbarButton icon={faCode} title="Code" onClick={() => formatCommand('code')} active={isFormatActive('code')} />
    </div>
  )
}
