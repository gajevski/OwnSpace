import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const id = req.url.split("games/")[1];
  const gameId = String(id);

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 400 });
    }

    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
    });

    if (!game) {
      return new NextResponse('Game not found', { status: 404 });
    }

    return new NextResponse(
      JSON.stringify({
        game,
      })
    );
  } catch (error) {
    console.error('Error fetching game details:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
