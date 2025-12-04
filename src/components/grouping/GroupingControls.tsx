'use client'

import { FIELD_LABELS, GROUP_FIELDS } from '@/constants/fields'
import styles from './GroupingControls.module.css'
import { GroupField } from '@/types/transactions'

type Props = {
  rowField: GroupField
  columnFields: GroupField[]
  onRowFieldChange: (field: GroupField) => void
  onColumnFieldChange: (index: number, field: GroupField) => void
  onAddColumnField: () => void
  onRemoveColumnField: (index: number) => void
}

export const GroupingControls = ({
  rowField,
  columnFields,
  onRowFieldChange,
  onColumnFieldChange,
  onAddColumnField,
  onRemoveColumnField,
}: Props) => (
  <div className={styles.panel} data-testid="grouping-controls">
    <div className={styles.panelHeader}>
      <div>
        <p className="eyebrow">Configuration</p>
        <h2>Choose how to group the report</h2>
      </div>
      <button className={styles.ghost} onClick={onAddColumnField} disabled={columnFields.length >= GROUP_FIELDS.length}>
        + Add column level
      </button>
    </div>

    <div className={styles.controlGrid}>
      <div>
        <label className={styles.label} htmlFor="row-field">
          Row grouping
        </label>
        <select
          id="row-field"
          className={styles.select}
          value={rowField}
          onChange={(event) => onRowFieldChange(event.target.value as GroupField)}
        >
          {GROUP_FIELDS.map((field) => (
            <option key={field} value={field}>
              {FIELD_LABELS[field]}
            </option>
          ))}
        </select>
        <p className={styles.hint}>One field at a time</p>
      </div>

      <div>
        <label className={styles.label}>Column grouping</label>
        <div className={styles.stack}>
          {columnFields.map((field, idx) => (
            <div className={styles.columnField} key={`${field}-${idx}`}>
              <select
                className={styles.select}
                value={field}
                onChange={(event) => onColumnFieldChange(idx, event.target.value as GroupField)}
              >
                {GROUP_FIELDS.map((option) => (
                  <option key={option} value={option} disabled={columnFields.includes(option) && option !== field}>
                    {FIELD_LABELS[option]}
                  </option>
                ))}
              </select>
              <button
                className={`${styles.ghost} ${styles.danger}`}
                onClick={() => onRemoveColumnField(idx)}
                disabled={columnFields.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <p className={styles.hint}>Order defines column nesting</p>
      </div>
    </div>
  </div>
)
