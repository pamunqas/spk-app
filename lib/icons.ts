export const PROVIDER_ICONS: Record<string, string> = {
  'Pupuk Kompos': '♻️',
  'Pupuk Kandang': '🐄',
  'Pupuk Organik Cair': '💧',
  'Vermikompos': '🪱',
  'Bokashi': '🌾',
}

export function getProviderIcon(name: string): string {
  return PROVIDER_ICONS[name] ?? '🌿'
}
