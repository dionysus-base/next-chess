import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      username: 'player1',
      email: 'player1@example.com',
      password: 'hashed_password1', // Replace with actual hashed password
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'player2',
      email: 'player2@example.com',
      password: 'hashed_password2', // Replace with actual hashed password
    },
  });

  console.log(`Created users: ${user1.username}, ${user2.username}`);

  // Create Game
  const game = await prisma.game.create({
    data: {
      whiteId: user1.id,
      blackId: user2.id,
      state: 'in_progress',
    },
  });

  console.log(`Created game with ID: ${game.id}`);

  // Create Moves
  const moves = [
    { gameId: game.id, playerId: user1.id, notation: 'e2e4', moveOrder: 1 },
    { gameId: game.id, playerId: user2.id, notation: 'e7e5', moveOrder: 2 },
    { gameId: game.id, playerId: user1.id, notation: 'g1f3', moveOrder: 3 },
    { gameId: game.id, playerId: user2.id, notation: 'b8c6', moveOrder: 4 },
  ];

  for (const move of moves) {
    await prisma.move.create({ data: move });
  }

  console.log('Created moves:');
  moves.forEach((move) => console.log(`  ${move.notation}`));

  // Create Notifications
  await prisma.notification.createMany({
    data: [
      { userId: user1.id, message: 'It’s your turn!', isRead: false },
      { userId: user2.id, message: 'Opponent made a move: e2e4', isRead: false },
    ],
  });

  console.log('Created notifications.');
}

main()
  .then(() => {
    console.log('Seeding complete.');
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error('Seeding failed:', e);
    prisma.$disconnect();
    process.exit(1);
  });
