'use client'

import { FIELD_LABELS, GroupField } from '@/constants/fields'
import { PivotResult } from '@/lib/pivot'
import { PivotHeader } from './PivotHeader'
import { PivotRow } from './PivotRow'
import { PivotSummaryRow } from './PivotSummaryRow'
import { getGroupSeparators } from './utils'

type Props = {
  result: PivotResult
  rowField: GroupField
  columnFields: GroupField[]
}

// Orchestrates pivot header, body rows, and summary row.
export const PivotTable = ({ result, rowField, columnFields }: Props) => {
  const separators = getGroupSeparators(result.columnLeaves)

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
          <PivotHeader
            headers={result.headers}
            rowField={rowField}
            separators={separators}
          />
          <tbody>
            {result.rows.map((rowValue) => (
              <PivotRow
                key={rowValue}
                rowValue={rowValue}
                columnLeaves={result.columnLeaves}
                cells={result.cells}
                rowTotals={result.rowTotals}
                separators={separators}
              />
            ))}
            <PivotSummaryRow
              columnLeaves={result.columnLeaves}
              columnTotals={result.columnTotals}
              grandTotal={result.grandTotal}
              separators={separators}
            />
          </tbody>
        </table>
      </div>
    </div>
  )
}
