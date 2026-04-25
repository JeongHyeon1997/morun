// Sequential heat palette (low → high). Tweak in one place to restyle the map.
export const HEAT_PALETTE = [
  '#EAEEF7',
  '#C7D2EA',
  '#94A6D8',
  '#5C77BF',
  '#33509E',
  '#1E2338',
] as const;

export const HEAT_LEGEND = [
  { color: HEAT_PALETTE[0], label: '0' },
  { color: HEAT_PALETTE[1], label: '1–4' },
  { color: HEAT_PALETTE[2], label: '5–9' },
  { color: HEAT_PALETTE[3], label: '10–19' },
  { color: HEAT_PALETTE[4], label: '20–29' },
  { color: HEAT_PALETTE[5], label: '30+' },
] as const;

export function heatColor(value: number): string {
  if (value <= 0) return HEAT_PALETTE[0];
  if (value < 5) return HEAT_PALETTE[1];
  if (value < 10) return HEAT_PALETTE[2];
  if (value < 20) return HEAT_PALETTE[3];
  if (value < 30) return HEAT_PALETTE[4];
  return HEAT_PALETTE[5];
}
