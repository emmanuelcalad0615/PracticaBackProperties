import 'dotenv/config';
import prisma from '../src/infrastructure/db/prismaClient';

const tipos = ['Apartamento', 'Casa', 'Penthouse', 'Estudio', 'Loft', 'Dúplex', 'Casa campestre', 'Apartaestudio'];

const ubicaciones = [
  'El Poblado, Medellín',
  'Laureles, Medellín',
  'Envigado',
  'Sabaneta',
  'La América, Medellín',
  'Belén, Medellín',
  'Chapinero, Bogotá',
  'Usaquén, Bogotá',
  'Cedritos, Bogotá',
  'Salitre, Bogotá',
  'Rosales, Bogotá',
  'Zona T, Bogotá',
  'Granada, Cali',
  'San Fernando, Cali',
  'Ciudad Jardín, Cali',
  'El Peñón, Cali',
  'Alto Prado, Barranquilla',
  'El Prado, Barranquilla',
  'Riomar, Barranquilla',
  'Bocagrande, Cartagena',
  'Manga, Cartagena',
  'Centro Histórico, Cartagena',
  'La Boquilla, Cartagena',
  'Pinares, Pereira',
  'Álamos, Pereira',
];

const adjetivos = [
  'remodelado',
  'amoblado',
  'con balcón',
  'vista panorámica',
  'piscina compartida',
  'estrenar',
  'iluminado',
  'cerca al metro',
  'gimnasio incluido',
  'parqueadero doble',
  'esquinero',
  'jardín privado',
  'penthouse',
  'con terraza',
  'duplex',
];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
  console.log('Borrando propiedades existentes...');
  await prisma.property.deleteMany();

  console.log('Insertando 100 propiedades...');

  const data = Array.from({ length: 100 }, (_, i) => {
    const tipo = pick(tipos);
    const ubicacion = pick(ubicaciones);
    const adjetivo = pick(adjetivos);
    const habitaciones = rand(1, 5);
    const precio = rand(120, 1800) * 1_000_000;

    return {
      title: `${tipo} ${adjetivo} - ${habitaciones} hab #${i + 1}`,
      price: precio,
      location: ubicacion,
      available: Math.random() > 0.2,
    };
  });

  await prisma.property.createMany({ data });

  const total = await prisma.property.count();
  console.log(`Listo. Total propiedades en DB: ${total}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
