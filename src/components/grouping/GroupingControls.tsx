'use client'

import { FIELD_LABELS, GROUP_FIELDS, GroupField } from '@/constants/fields'

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
  <div className="panel" data-testid="grouping-controls">
    <div className="panel-header">
      <div>
        <p className="eyebrow">Configuration</p>
        <h2>Choose how to group the report</h2>
      </div>
      <button className="ghost" onClick={onAddColumnField} disabled={columnFields.length >= GROUP_FIELDS.length}>
        + Add column level
      </button>
    </div>

    <div className="control-grid">
      <div>
        <label className="label" htmlFor="row-field">
          Row grouping
        </label>
        <select
          id="row-field"
          className="select"
          value={rowField}
          onChange={(event) => onRowFieldChange(event.target.value as GroupField)}
        >
          {GROUP_FIELDS.map((field) => (
            <option key={field} value={field}>
              {FIELD_LABELS[field]}
            </option>
          ))}
        </select>
        <p className="hint">One field at a time</p>
      </div>

      <div>
        <label className="label">Column grouping</label>
        <div className="stack">
          {columnFields.map((field, idx) => (
            <div className="column-field" key={`${field}-${idx}`}>
              <select
                className="select"
                value={field}
                onChange={(event) => onColumnFieldChange(idx, event.target.value as GroupField)}
              >
                {GROUP_FIELDS.map((option) => (
                  <option key={option} value={option} disabled={columnFields.includes(option) && option !== field}>
                    {FIELD_LABELS[option]}
                  </option>
                ))}
              </select>
              <button className="ghost danger" onClick={() => onRemoveColumnField(idx)} disabled={columnFields.length === 1}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <p className="hint">Order defines column nesting</p>
      </div>
    </div>
  </div>
)
