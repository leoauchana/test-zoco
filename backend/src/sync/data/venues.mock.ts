export interface VenueMock {
  name: string;
  location: string;
  source: string;
}

export const VENUES_MOCK: VenueMock[] = [
  { name: 'Bar El Cairo', location: 'San Martín 400, Tucumán', source: 'mock' },
  {
    name: 'Antares Tucumán',
    location: 'Av. Solano Vera 100, Yerba Buena',
    source: 'mock',
  },
  {
    name: 'Fuente de Soda París',
    location: 'Congreso 43, Tucumán',
    source: 'mock',
  },
  {
    name: 'La Farola',
    location: 'Av. Mate de Luna 2800, Tucumán',
    source: 'mock',
  },
  { name: 'Ceviche Bar', location: 'Laprida 360, Tucumán', source: 'mock' },
  {
    name: 'La Reserva Resto Bar',
    location: 'Av. Belgrano 1100, Tucumán',
    source: 'mock',
  },
  {
    name: 'Taberna Irlandesa',
    location: '25 de Mayo 700, Tucumán',
    source: 'mock',
  },
  { name: 'Café del Tiempo', location: 'Muñecas 500, Tucumán', source: 'mock' },

  { name: 'Temple Bar', location: 'San Lorenzo 430, Tucumán', source: 'mock' },
  {
    name: 'Sky Room',
    location: 'Av. Aconquija 1800, Yerba Buena',
    source: 'mock',
  },
  {
    name: 'Velvet Lounge',
    location: 'Av. Perón 2100, Yerba Buena',
    source: 'mock',
  },
  { name: 'Distrito Club', location: 'Maipú 900, Tucumán', source: 'mock' },
  {
    name: 'Moonlight Disco',
    location: 'Av. Roca 1500, Tucumán',
    source: 'mock',
  },
  {
    name: 'Neon Night Club',
    location: 'Av. Mate de Luna 2400, Tucumán',
    source: 'mock',
  },
  { name: 'Brooklyn Pub', location: 'Mendoza 600, Tucumán', source: 'mock' },
  {
    name: 'Old Irish Pub',
    location: '25 de Mayo 680, Tucumán',
    source: 'mock',
  },
  { name: 'Coffee Point', location: 'San Juan 350, Tucumán', source: 'mock' },
  {
    name: 'Café Central',
    location: '24 de Septiembre 520, Tucumán',
    source: 'mock',
  },
  {
    name: 'Sunset Rooftop',
    location: 'Av. Solano Vera 1900, Yerba Buena',
    source: 'mock',
  },
  {
    name: 'Black Room Club',
    location: 'Las Heras 800, Tucumán',
    source: 'mock',
  },
  { name: 'Urban Beat', location: 'General Paz 450, Tucumán', source: 'mock' },
  { name: 'La Bohemia', location: 'Monteagudo 320, Tucumán', source: 'mock' },
  { name: 'Liverpool Pub', location: 'Catamarca 550, Tucumán', source: 'mock' },
  {
    name: 'Havana Lounge',
    location: 'Av. Presidente Perón 2500, Yerba Buena',
    source: 'mock',
  },
  {
    name: 'Mandarine Club',
    location: 'Av. Roca 1520, Tucumán',
    source: 'mock',
  },

  // duplicados intencionales para probar deduplicación
  { name: 'Mandarine', location: 'Av. Roca 1500, Tucumán', source: 'mock' },
  {
    name: 'Irish Pub Tucumán',
    location: '25 de Mayo 700, Tucumán',
    source: 'mock',
  },
];
