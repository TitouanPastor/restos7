import dotenv from 'dotenv';

// load environment variables
dotenv.config();



// import prisma client
import { PrismaClient } from '@prisma/client';

// create an instance of PrismaClient
const prisma = new PrismaClient();

// create a new person with his name and surname
const person = await prisma.person.create({
    data: {
        name: 'John',
        surname: 'Doe',
    },
});

// log the created person
console.log(person);

// select all persons
const persons = await prisma.person.findMany();

// log all persons
console.log(persons);