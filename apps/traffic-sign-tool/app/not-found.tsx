import { defaultLang } from '@app/src/features/routing/lang'
import { Link } from '@tanstack/react-router'

export default function NotFound() {
  return (
    <div className="bg-white">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link to="/$lang" params={{ lang: defaultLang }}>
        Return Home
      </Link>
    </div>
  )
}
