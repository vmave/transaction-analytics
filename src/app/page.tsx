'use client'

import { GroupingControls } from '@/components/GroupingControls'
import { DataCoverage } from '@/components/DataCoverage'
import { HomeHero } from '@/components/HomeHero'
import { PivotTable } from '@/components/PivotTable'
import { usePivotConfig } from '@/hooks/usePivotConfig'
import styles from './page.module.css'

export default function HomePage() {
  const { rowField, columnFields, dimensionValues, pivot, stats, handlers } = usePivotConfig()

  return (
    <main className={styles.page}>
      <HomeHero stats={stats} />

      <section className={styles.layout}>
        <GroupingControls
          rowField={rowField}
          columnFields={columnFields}
          onRowFieldChange={handlers.handleRowFieldChange}
          onColumnFieldChange={handlers.handleColumnFieldChange}
          onAddColumnField={handlers.handleAddColumnField}
          onRemoveColumnField={handlers.handleRemoveColumnField}
        />

        <DataCoverage dimensions={dimensionValues} />

        <PivotTable result={pivot} rowField={rowField} columnFields={columnFields} />
      </section>
    </main>
  )
}
