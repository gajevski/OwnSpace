import NextAuth from "next-auth";
import { NextApiHandler } from 'next'
import { NextApiRequest, NextApiResponse } from "next";
import { options } from "./options";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    return await NextAuth(req, res, options);
};

export default handler;
