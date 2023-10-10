import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      include: {
        games: true,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    console.log(error, 'ERROR');
    return null;
  }
};

export default getCurrentUser;