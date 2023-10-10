import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 400 });
    }

    const newGame = await prisma.game.create({
      data: {
        user: { connect: { id: currentUser.id } },
        image: "game_image_url",
        title: "Game Title",
        description: "Game Description",
      },
    });

    return new NextResponse(
      JSON.stringify({
        image: newGame.image,
        title: newGame.title,
        description: newGame.description,
      })
    );
  } catch (error) {
    console.error('Error creating a new game:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const currentUser = await getCurrentUser();
    const userId = currentUser.id;

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 400 });

    }

    const games = await prisma.game.findMany({
      where: {
        userId,
      },
    });

    return new NextResponse(
      JSON.stringify({
        games
      })
    );
  } catch (error) {
    console.error('Error fetching games:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
