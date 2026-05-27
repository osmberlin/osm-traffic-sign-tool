import * as m from '@app/paraglide/messages'
import { defaultLang } from '@app/src/features/routing/lang'
import { Link } from '@tanstack/react-router'

export default function NotFound() {
  return (
    <div className="bg-white">
      <h2>{m.not_found_title()}</h2>
      <p>{m.not_found_body()}</p>
      <Link to="/$lang" params={{ lang: defaultLang }}>
        {m.not_found_home()}
      </Link>
    </div>
  )
}
