export interface VenueMock {
  name: string;
  location: string;
  source: string;
}

export const VENUES_MOCK: VenueMock[] = [
  {
    name: 'Bar El Cairo',
    location: 'San Martín 400, Centro, Tucumán',
    source: 'mock',
  },
  {
    name: 'Antares Tucumán',
    location: 'Av. Solano Vera 100, Tucumán',
    source: 'mock',
  },
  { name: 'El Cairo Bar', location: 'San Martín 400, Tucumán', source: 'mock' }, // duplicado intencional
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
  {
    name: 'Irlanda Bar Tucumán',
    location: '25 de Mayo 700, Tucumán',
    source: 'mock',
  }, // duplicado intencional
  { name: 'El Que Canta', location: 'Mendoza 1200, Tucumán', source: 'mock' },
  { name: 'Café del Tiempo', location: 'Muñecas 500, Tucumán', source: 'mock' },
  {
    name: 'Boliche Mandarine',
    location: 'Av. Roca 1500, Tucumán',
    source: 'mock',
  },
  {
    name: 'La Peña del Angel',
    location: 'San Lorenzo 200, Tucumán',
    source: 'mock',
  },
  {
    name: 'Resto Bar Happening',
    location: 'Av. Aconquija 800, Yerba Buena',
    source: 'mock',
  },
  { name: 'El Batán', location: 'Las Piedras 400, Tucumán', source: 'mock' },
];
