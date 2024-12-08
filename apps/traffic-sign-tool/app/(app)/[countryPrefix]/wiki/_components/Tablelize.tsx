import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@app/app/_components/catalyst/table'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import { SignStateType } from '@osm-traffic-signs/converter'
import Image from 'next/image'
import { WikiSign } from '../page'

export const Tablelize = ({ data }: { data: Partial<SignStateType> | Partial<WikiSign> }) => {
  return (
    <Table className="mt-5" dense>
      <TableHead>
        <TableRow>
          <TableHeader>key</TableHeader>
          <TableHeader>value</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(data).map(([key, value]) => {
          if (!key) return null
          return (
            <TableRow key={key}>
              <TableCell className="w-40">
                <strong>{key}</strong>
              </TableCell>
              <TableCell>
                {typeof value === 'boolean' ? (
                  JSON.stringify(value)
                ) : Array.isArray(value) || typeof value === 'object' ? (
                  <pre className="text-xs leading-snug">
                    <code>{JSON.stringify(value, undefined, 1)}</code>
                  </pre>
                ) : key.toLocaleLowerCase().includes('url') ? (
                  <ExternalLink href={value} blank>
                    {value}
                  </ExternalLink>
                ) : key.toLocaleLowerCase().includes('svg') ? (
                  <Image src={value} height={50} width={50} alt={key} />
                ) : (
                  value
                )}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
