import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const dailySalesData = [
  {
    referenceDate: new Date('2026-02-01T00:00:00.000Z'),
    totalOrders: 42,
    grossRevenue: 5040,
    totalCosts: 3900,
  },
  {
    referenceDate: new Date('2026-02-02T00:00:00.000Z'),
    totalOrders: 35,
    grossRevenue: 3850,
    totalCosts: 4100,
  },
  {
    referenceDate: new Date('2026-02-03T00:00:00.000Z'),
    totalOrders: 48,
    grossRevenue: 5760,
    totalCosts: 4200,
  },
  {
    referenceDate: new Date('2026-02-04T00:00:00.000Z'),
    totalOrders: 51,
    grossRevenue: 6630,
    totalCosts: 5300,
  },
  {
    referenceDate: new Date('2026-02-05T00:00:00.000Z'),
    totalOrders: 30,
    grossRevenue: 3000,
    totalCosts: 3400,
  },
  {
    referenceDate: new Date('2026-02-06T00:00:00.000Z'),
    totalOrders: 60,
    grossRevenue: 8400,
    totalCosts: 6100,
  },
  {
    referenceDate: new Date('2026-02-07T00:00:00.000Z'),
    totalOrders: 72,
    grossRevenue: 10080,
    totalCosts: 7200,
  },
  {
    referenceDate: new Date('2026-02-08T00:00:00.000Z'),
    totalOrders: 68,
    grossRevenue: 9520,
    totalCosts: 6900,
  },
  {
    referenceDate: new Date('2026-02-09T00:00:00.000Z'),
    totalOrders: 40,
    grossRevenue: 4400,
    totalCosts: 3700,
  },
  {
    referenceDate: new Date('2026-02-10T00:00:00.000Z'),
    totalOrders: 38,
    grossRevenue: 4560,
    totalCosts: 4800,
  },
  {
    referenceDate: new Date('2026-02-11T00:00:00.000Z'),
    totalOrders: 55,
    grossRevenue: 7700,
    totalCosts: 6000,
  },
  {
    referenceDate: new Date('2026-02-12T00:00:00.000Z'),
    totalOrders: 62,
    grossRevenue: 8680,
    totalCosts: 6400,
  },
  {
    referenceDate: new Date('2026-02-13T00:00:00.000Z'),
    totalOrders: 29,
    grossRevenue: 2900,
    totalCosts: 3500,
  },
  {
    referenceDate: new Date('2026-02-14T00:00:00.000Z'),
    totalOrders: 80,
    grossRevenue: 12000,
    totalCosts: 8500,
  },
  {
    referenceDate: new Date('2026-02-15T00:00:00.000Z'),
    totalOrders: 76,
    grossRevenue: 11020,
    totalCosts: 8000,
  },
  {
    referenceDate: new Date('2026-02-16T00:00:00.000Z'),
    totalOrders: 33,
    grossRevenue: 3630,
    totalCosts: 3100,
  },
  {
    referenceDate: new Date('2026-02-17T00:00:00.000Z'),
    totalOrders: 44,
    grossRevenue: 5720,
    totalCosts: 4500,
  },
  {
    referenceDate: new Date('2026-02-18T00:00:00.000Z'),
    totalOrders: 50,
    grossRevenue: 6500,
    totalCosts: 5200,
  },
  {
    referenceDate: new Date('2026-02-19T00:00:00.000Z'),
    totalOrders: 37,
    grossRevenue: 4070,
    totalCosts: 4600,
  },
  {
    referenceDate: new Date('2026-02-20T00:00:00.000Z'),
    totalOrders: 58,
    grossRevenue: 8120,
    totalCosts: 5900,
  },
  {
    referenceDate: new Date('2026-02-21T00:00:00.000Z'),
    totalOrders: 74,
    grossRevenue: 10360,
    totalCosts: 7600,
  },
  {
    referenceDate: new Date('2026-02-22T00:00:00.000Z'),
    totalOrders: 69,
    grossRevenue: 9660,
    totalCosts: 7100,
  },
  {
    referenceDate: new Date('2026-02-23T00:00:00.000Z'),
    totalOrders: 31,
    grossRevenue: 3410,
    totalCosts: 3000,
  },
  {
    referenceDate: new Date('2026-02-24T00:00:00.000Z'),
    totalOrders: 47,
    grossRevenue: 6110,
    totalCosts: 4800,
  },
  {
    referenceDate: new Date('2026-02-25T00:00:00.000Z'),
    totalOrders: 53,
    grossRevenue: 6890,
    totalCosts: 5500,
  },
  {
    referenceDate: new Date('2026-02-26T00:00:00.000Z'),
    totalOrders: 36,
    grossRevenue: 3960,
    totalCosts: 4200,
  },
  {
    referenceDate: new Date('2026-02-27T00:00:00.000Z'),
    totalOrders: 59,
    grossRevenue: 8260,
    totalCosts: 6000,
  },
  {
    referenceDate: new Date('2026-02-28T00:00:00.000Z'),
    totalOrders: 82,
    grossRevenue: 12300,
    totalCosts: 9000,
  },
];

async function main() {
  console.log('Seed em andamento.');

  for (const entry of dailySalesData) {
    await prisma.dailySale.upsert({
      where: { referenceDate: entry.referenceDate },
      update: entry,
      create: entry,
    });
  }

  console.log(`Seed concluído: ${dailySalesData.length} registros de vendas diárias.`);
}

main()
  .catch((error) => {
    console.error('Seed falhou:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
