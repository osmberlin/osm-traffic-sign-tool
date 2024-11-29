import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-white">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/DE">Return Home</Link>
    </div>
  )
}
