'use client'

import { DataCoverage } from '@/components/data-coverage'
import { HomeHero } from '@/components/home'
import { GroupingControls } from '@/components/grouping'
import { PivotTable } from '@/components/pivot'
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
