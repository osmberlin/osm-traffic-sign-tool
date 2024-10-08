import { AggregatedTags } from '../signs/utils/aggregateTags'
import { WikiLinkKey } from './WikiLinkKey'
import { WikiLinkValue } from './WikiLinkValue'

type Props = {
  tagKey: string
  tagValue: AggregatedTags[number][1]
}

export const Tag = ({ tagKey, tagValue }: Props) => {
  return (
    <code>
      <WikiLinkKey osmKey={tagKey} />
      <span className="mx-0.5 text-gray-500">=</span>
      <WikiLinkValue osmKey={tagKey} osmValue={tagValue} />
    </code>
  )
}
