import * as m from '@app/paraglide/messages'
import type { SignComentType } from '@osm-traffic-signs/converter'
import { CommentsList } from './CommentsList'

type Props = {
  comments: Map<string, SignComentType[]>
}

export const CommentsMap = ({ comments }: Props) => {
  return (
    <>
      {Array.from(comments).map(([signKey, signComments]) => {
        return (
          <div key={signKey} className="mb-4 space-y-2">
            <h4 className="text-sm font-light text-stone-300">
              {m.notes_on()}{' '}
              <code className="rounded-sm bg-stone-700 px-2 py-1 text-stone-50">{signKey}</code>
            </h4>
            <CommentsList comments={signComments} />
          </div>
        )
      })}
    </>
  )
}
