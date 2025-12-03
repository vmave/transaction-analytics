'use client'

import { FIELD_COLORS, FIELD_LABELS, GroupField } from '@/data/transactions'
import { PivotResult } from '@/lib/pivot'

type Props = {
  result: PivotResult
  rowField: GroupField
  columnFields: GroupField[]
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function formatAmount(value: number) {
  return currency.format(value)
}

export function PivotTable({ result, rowField, columnFields }: Props) {
  const headerRowCount = result.headers.length
  const groupSeparators = result.columnLeaves.map((leaf, idx) => {
    if (idx === 0) return false
    const prev = result.columnLeaves[idx - 1]
    return leaf.path[0] !== prev.path[0]
  })

  return (
    <div className="table-card">
      <div className="table-header">
        <div>
          <p className="eyebrow">Report</p>
          <h2>
            {FIELD_LABELS[rowField]} by {columnFields.map((field) => FIELD_LABELS[field]).join(' → ')}
          </h2>
        </div>
        <div className="meta">
          <span>{result.rows.length} row groups</span>
          <span>{result.columnLeaves.length} column groups</span>
        </div>
      </div>

      <div className="table-scroll">
        <table className="pivot">
          <thead>
            {result.headers.map((headerRow, rowIndex) => (
              <tr key={`header-${rowIndex}`}>
                {rowIndex === 0 && (
                  <th rowSpan={headerRowCount} className="row-heading sticky">
                    {FIELD_LABELS[rowField]}
                  </th>
                )}
                {headerRow.map((cell, idx) => {
                  const isLastHeaderRow = rowIndex === headerRowCount - 1
                  const separatorClass = isLastHeaderRow && groupSeparators[idx] ? ' group-edge' : ''
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
          <tbody>
            {result.rows.map((rowValue) => (
              <tr key={rowValue}>
                <th className="row-heading sticky" scope="row">
                  {rowValue}
                </th>
                {result.columnLeaves.map((leaf, idx) => (
                  <td key={`${rowValue}-${leaf.key}`} className={groupSeparators[idx] ? 'group-edge' : ''}>
                    {formatAmount(result.cells[rowValue][leaf.key].amount)}
                  </td>
                ))}
                <td className="total">{formatAmount(result.rowTotals[rowValue])}</td>
              </tr>
            ))}
            <tr className="summary">
              <th className="row-heading sticky">Column total</th>
              {result.columnLeaves.map((leaf, idx) => (
                <td key={`total-${leaf.key}`} className={groupSeparators[idx] ? 'group-edge' : ''}>
                  {formatAmount(result.columnTotals[leaf.key])}
                </td>
              ))}
              <td className="total">{formatAmount(result.grandTotal)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
