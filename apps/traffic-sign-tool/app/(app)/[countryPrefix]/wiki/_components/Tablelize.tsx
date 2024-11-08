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

export const Tablelize = ({ data }: { data: SignStateType | WikiSign }) => {
  return (
    <Table className="mt-5">
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
                {Array.isArray(value) || typeof value === 'object' ? (
                  JSON.stringify(value, undefined, 2)
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
