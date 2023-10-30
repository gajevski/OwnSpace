import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser"

interface UserWithGames {
  id: number;
  games: Game[];
}

interface Game {
  id: number;
  name: string;
  description: string;
}

const getCurrentUserWithGames = async (): Promise<UserWithGames | string | null> => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const userWithGames = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
      include: {
        games: true,
      },
    });

    if (!userWithGames) {
      return 'You have no games';
    }
    return userWithGames;
  } catch (error) {
    return null;
  }
};

export default getCurrentUserWithGames;
