import { useMemo } from 'react'
import { Tag } from './Tag'
import { WikiLinkKey } from './WikiLinkKey'

type Props = {
  text: string
}

export const WikiLinkify = ({ text }: Props) => {
  function addCodeTags(text: string) {
    return text.replace(/`(.+?)`/g, '<code>$1</code>')
  }

  const parts = useMemo(() => {
    const regex = /\[(.*?)\]/g
    return text.split(regex).map((part) => {
      const partWithCode = addCodeTags(part)

      // Case Code `foo=bar`; Code in `tagsComment` need to be treated as text
      if (partWithCode.includes('<code>')) {
        return { type: 'text', content: partWithCode }
      }
      // Case Key [Key:foo]
      if (partWithCode.startsWith('Key:')) {
        return { type: 'key', content: partWithCode.replace('Key:', '') }
      }
      // Case Tag [Tag:foo=bar]
      if (partWithCode.startsWith('Tag:')) {
        return { type: 'tag', content: partWithCode.replace('Tag:', '') }
      }
      return { type: 'text', content: partWithCode }
    })
  }, [text])

  return (
    <>
      {parts.map((part, index) => {
        if (part.type === 'key') {
          return <WikiLinkKey key={index} osmKey={part.content} />
        }
        if (part.type === 'tag') {
          const [key, value] = part.content.split('=')
          return <Tag key={index} tagKey={key} tagValue={value} />
        }
        if (part.type === 'text') {
          return <span key={index} dangerouslySetInnerHTML={{ __html: part.content }} />
        }
        return null
      })}
    </>
  )
}
