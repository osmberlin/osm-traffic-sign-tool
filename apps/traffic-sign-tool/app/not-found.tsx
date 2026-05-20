import { Link } from '@tanstack/react-router'

export default function NotFound() {
  return (
    <div className="bg-white">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link to="/DE">Return Home</Link>
    </div>
  )
}
