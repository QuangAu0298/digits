import { prisma } from './lib/prisma';
import { Role, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);
  // config.defaultAccounts.forEach(async (account) => {
  //   const role = account.role as Role || Role.USER;
  //   console.log(`  Creating user: ${account.email} with role: ${role}`);
  //   await prisma.user.upsert({
  //     where: { email: account.email },
  //     update: {},
  //     create: {
  //       email: account.email,
  //       password,
  //       role,
  //     },
  //   });
  //   // console.log(`  Created user: ${user.email} with role: ${user.role}`);
  // });
  for (const account of config.defaultAccounts) {
    const role = account.role as Role || Role.USER;
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
  }
  for (const data of config.defaultData) {
    const condition = data.condition as Condition || Condition.good;
    console.log(`  Adding stuff: ${JSON.stringify(data)}`);
     
    await prisma.stuff.upsert({
      where: { id: config.defaultData.indexOf(data) + 1 },
      update: {},
      create: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        condition,
      },
    });
  }
  // config.defaultContacts.forEach(async (contact, index) => {
  //   console.log(`  Adding Contact: ${contact.firstName} ${contact.lastName}`);
  //   await prisma.contact.upsert({
  //     where: { id: index },
  //     update: {},
  //     create: {
  //       firstName: contact.firstName,
  //       lastName: contact.lastName,
  //       image: contact.image,
  //       address: contact.address,
  //       description: contact.description,
  //       owner: contact.owner,
  //     },
  //   });
  // });
  for (const [index, contact] of config.defaultContacts.entries()) {
    console.log(`  Adding Contact: ${contact.firstName} ${contact.lastName}`);
    await prisma.contact.upsert({
      where: { id: index },
      update: {},
      create: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        image: contact.image,
        address: contact.address,
        description: contact.description,
        owner: contact.owner,
      },
    });
  }

}
main()
  .then(() => {
    prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
