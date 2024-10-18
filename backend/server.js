// import prisma client
import { PrismaClient } from '@prisma/client';

// create an instance of PrismaClient
const prisma = new PrismaClient();

// select all persons
const persons = await prisma.User.findMany();

// log all persons
console.log(persons);

// for every person, log their posts
for (const person of persons) {
  console.log(person.posts);
}

const posts = await prisma.Post.findMany({include: {user: true}});

// log all posts
console.log(posts);

// for every post, log its author
