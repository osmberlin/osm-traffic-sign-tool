'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@app/app/_components/catalyst/table'
import { useCountryPrefix } from '@app/app/_store/utils/useCountryPrefix'
import { SignStateType, signToTags, signToTrafficSignTagValue } from '@osm-traffic-signs/converter'
import clsx from 'clsx'
import { useState } from 'react'
import { PackageSvgTrafficSign } from '../../_components/PackageSvgTrafficSign'
import { TagList } from '../../_components/results/ResultTagRecommendations/TagList'

type Props = {
  list: SignStateType[][]
}

export const CheckCombinationTable = ({ list }: Props) => {
  const feedbackOptions = [
    { key: 'OK', label: 'OK' },
    { key: 'NOTOK', label: 'Not OK' },
    { key: 'INVALID', label: 'Invalid combination' },
  ] as const
  type FeedbackKey = (typeof feedbackOptions)[number]['key']

  const countryPrefix = useCountryPrefix()

  const [data, setData] = useState<Map<string, { status: FeedbackKey; comment?: string }>>(
    new Map(),
  )

  const handleStatusChange = (tagValue: string, status: FeedbackKey) => {
    setData((prev) => {
      const newData = new Map(prev)
      if (status == 'OK') {
        newData.set(tagValue, { status, comment: undefined })
      } else {
        newData.set(tagValue, { status })
      }
      return newData
    })
  }

  const handleCommentChange = (tagValue: string, comment: string) => {
    setData((prev) => {
      const newData = new Map(prev)
      const current = newData.get(tagValue)
      if (current) {
        newData.set(tagValue, { ...current, comment })
      }
      return newData
    })
  }

  return (
    <form>
      <Table className="mt-10">
        <TableHead>
          <TableRow>
            <TableHeader>Sign</TableHeader>
            <TableHeader>Image</TableHeader>
            <TableHeader>Tags</TableHeader>
            <TableHeader>Check</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((signs) => {
            const tagValue = signToTrafficSignTagValue(signs, countryPrefix)

            const primarySign = signs.filter((s) => s.recodgnizedSign === true).at(0)
            const modifierSign = signs.filter((s) => s.recodgnizedSign === true).at(1)
            const canReceiveModifiers = primarySign?.compatibility?.canReceiveModifiers !== false
            const canReceiveThisModifier =
              modifierSign &&
              !primarySign?.compatibility?.incompatibleModifiers?.includes(modifierSign.signId)
            const allowFeedback = canReceiveModifiers && canReceiveThisModifier

            const currentData = data.get(tagValue)

            return (
              <TableRow key={tagValue}>
                <TableHeader className="space-y-3 align-top">
                  <code>{tagValue}</code>
                </TableHeader>
                <TableCell className="align-top">
                  {signs
                    .filter((sign) => sign.recodgnizedSign === true)
                    .map((sign) => (
                      <PackageSvgTrafficSign
                        key={sign.osmValuePart}
                        sign={sign}
                        className="h-auto max-h-10 w-full max-w-10"
                      />
                    ))}
                </TableCell>
                <TableCell
                  className={clsx(
                    'align-top',
                    canReceiveThisModifier
                      ? ''
                      : 'text-xs leading-snug text-gray-300 hover:text-gray-600',
                  )}
                >
                  <TagList tags={signToTags(signs, countryPrefix)} />
                </TableCell>
                <TableCell className="align-top text-sm leading-snug">
                  {allowFeedback && (
                    <>
                      <div className="space-y-4 sm:flex sm:items-center sm:space-x-4 sm:space-y-0">
                        {feedbackOptions.map((option) => {
                          return (
                            <div key={option.key} className="flex items-center">
                              <input
                                // defaultChecked={option.key === 'OK'}
                                id={option.key}
                                onChange={() => handleStatusChange(tagValue, option.key)}
                                name={`feedback-${tagValue}`}
                                type="radio"
                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden not-checked:before:hidden"
                              />
                              <label htmlFor={option.key} className="ml-2 block">
                                {option.label}
                              </label>
                            </div>
                          )
                        })}
                      </div>
                      {currentData?.status !== 'OK' && (
                        <textarea
                          placeholder="Enter comment"
                          value={currentData?.comment || ''}
                          onChange={(e) => handleCommentChange(tagValue, e.target.value)}
                          className="mt-3 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                      )}
                    </>
                  )}
                  {!canReceiveModifiers && (
                    <p>
                      <small>Sign cannot be combined with modifier signs</small>
                    </p>
                  )}
                  {canReceiveModifiers && !canReceiveThisModifier && (
                    <p>
                      <small>Sign cannot be combined with this modifier signs</small>
                    </p>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <h3 className="mt-6 text-lg">Output</h3>
      <textarea
        className="mt-2 w-full border bg-gray-200"
        readOnly
        value={`new Map(${JSON.stringify(Array.from(data.entries()), null, 2)})`}
      />
    </form>
  )
}
