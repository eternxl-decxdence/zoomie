export interface AtomComponentConfig<
  Sizing extends object,
  Variants extends object,
  States extends object,
  Logic extends object
> {
  styles: {
    base: string
    sizing: Sizing
    variants: Variants
    states: States
  }
  logic: Logic
}
