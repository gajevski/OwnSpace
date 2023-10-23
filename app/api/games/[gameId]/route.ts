import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { Game } from "@/app/models/game";

interface GameResponse {
  game: Game;
}

export async function GET(req: NextApiRequest, res: NextApiResponse<NextResponse>) {
  const id: string = req.url?.split("games/")?.[1] ?? '';
  const gameId: string = String(id);

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 400 });
    }

    const game: Game | null = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
    });

    if (!game) {
      return new NextResponse('Game not found', { status: 404 });
    }

    const gameResponse: GameResponse = {
      game,
    };

    return new NextResponse(
      JSON.stringify(gameResponse)
    );
  } catch (error) {
    console.error('Error fetching game details:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
