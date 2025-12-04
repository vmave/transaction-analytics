'use client'

import { FIELD_LABELS, GroupField } from '@/constants/fields'
import { HeaderCell } from '@/lib/pivot'
import styles from './PivotTable.module.css'

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
            <th
              rowSpan={headerRowCount}
              className={`${styles.cell} ${styles.headerCell} ${styles.rowHeading} ${styles.rowHeadingSticky} ${styles.sticky}`}
            >
              {FIELD_LABELS[rowField]}
            </th>
          )}
          {headerRow.map((cell, idx) => {
            const isLastHeaderRow = rowIndex === headerRowCount - 1
            const separatorClass = isLastHeaderRow && separators[idx] ? styles.groupEdge : ''
            return (
              <th
                key={`${cell.label}-${idx}`}
                colSpan={cell.span}
                className={`${styles.cell} ${styles.headerCell} ${styles.sticky} ${separatorClass}`}
              >
                <div className={styles.headerWrapper}>
                  <span>{cell.label}</span>
                </div>
              </th>
            )
          })}
          {rowIndex === 0 && (
            <th rowSpan={headerRowCount} className={`${styles.cell} ${styles.total} ${styles.sticky}`}>
              Row total
            </th>
          )}
        </tr>
      ))}
    </thead>
  )
}
