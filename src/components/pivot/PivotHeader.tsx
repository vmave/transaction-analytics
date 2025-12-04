'use client'

import { FIELD_LABELS, GroupField } from '@/constants/fields'
import { HeaderCell } from '@/lib/pivot'

type Props = {
  headers: HeaderCell[][]
  rowField: GroupField
  separators: boolean[]
}

export const PivotHeader = ({ headers, rowField, separators }: Props) => {
  const headerRowCount = headers.length

  return (
    <thead>
      {headers.map((headerRow, rowIndex) => (
        <tr key={`header-${rowIndex}`}>
          {rowIndex === 0 && (
            <th rowSpan={headerRowCount} className="row-heading sticky">
              {FIELD_LABELS[rowField]}
            </th>
          )}
          {headerRow.map((cell, idx) => {
            const isLastHeaderRow = rowIndex === headerRowCount - 1
            const separatorClass = isLastHeaderRow && separators[idx] ? ' group-edge' : ''
            return (
              <th key={`${cell.label}-${idx}`} colSpan={cell.span} className={`sticky${separatorClass}`}>
                <div className="header-cell">
                  <span>{cell.label}</span>
                </div>
              </th>
            )
          })}
          {rowIndex === 0 && (
            <th rowSpan={headerRowCount} className="total sticky">
              Row total
            </th>
          )}
        </tr>
      ))}
    </thead>
  )
}
