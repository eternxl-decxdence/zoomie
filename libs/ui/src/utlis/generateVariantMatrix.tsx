import { ComponentType } from 'react'

interface MatrixOptions<Props> {
  component: ComponentType<Props>
  baseProps: Partial<Props>
  variantProps: {
    [K in keyof Props]?: readonly Props[K][]
  }
  sortOrder: [keyof Props, keyof Props, ...(keyof Props)[]]
  groupBy?: keyof Props
  filterCombination?: (props: Partial<Props>) => boolean
}

export function generateVariantMatrix<Props>({
  component: Component,
  baseProps,
  variantProps,
  sortOrder,
  groupBy,
  filterCombination,
}: MatrixOptions<Props>) {
  const [rowKey, colKey] = sortOrder

  const keys = Object.keys(variantProps) as (keyof typeof variantProps)[]

  const combine = (idx = 0, acc: Partial<Props> = {}): Partial<Props>[] => {
    if (idx >= keys.length) return [acc]

    const key = keys[idx]
    const values = variantProps[key]
    if (!values) return []

    const result = values.flatMap((value) =>
      combine(idx + 1, { ...acc, [key]: value })
    )

    return filterCombination ? result.filter(filterCombination) : result
  }

  const combinations = combine()
  const rows = Array.from(new Set(combinations.map((c) => c[rowKey])))
  const cols = Array.from(new Set(combinations.map((c) => c[colKey])))

  return (
    <div className="space-y-10">
      {rows.map((row) => (
        <div key={`row-${String(row)}`}>
          <h4 className="text-md font-bold capitalize">
            {String(rowKey)}: {String(row)}
          </h4>
          <div className="flex gap-6">
            {cols.map((col) => {
              const cellItems = combinations.filter(
                (c) => c[rowKey] === row && c[colKey] === col
              )

              // 🔥 Группировка внутри ячейки
              const groupedItems: Record<string, Partial<Props>[]> = groupBy
                ? cellItems.reduce((acc, item) => {
                    const groupKey = String(item[groupBy] ?? '__ungrouped')
                    if (!acc[groupKey]) acc[groupKey] = []
                    acc[groupKey].push(item)
                    return acc
                  }, {} as Record<string, Partial<Props>[]>)
                : { All: cellItems }

              return (
                <div
                  key={`cell-${String(row)}-${String(col)}`}
                  className="flex flex-col items-start gap-2"
                >
                  <div className="text-sm uppercase text-muted-foreground">
                    {String(col)}
                  </div>

                  {Object.entries(groupedItems).map(([groupKey, items]) => (
                    <div
                      key={groupKey}
                      className="flex flex-col items-center gap-1"
                    >
                      {groupBy && (
                        <div className="text-xs text-muted-foreground italic">
                          {groupKey}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {items.map((props, i) => (
                          <Component
                            key={i}
                            {...baseProps}
                            {...(props as Props)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
