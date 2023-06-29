import prisma from "@db";
import { Clip } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "src/server/trpc";
import { Maybe } from "yup";

const getClipThatNeedsRevision = publicProcedure.query(async (opts) => {
    let clip = await prisma.clip.findFirst({
        where: {
            accept: false,
        },
        select: {
            id: true,
            word: {
                select: {
                    ar: true,
                },
            },
            clipName: true,
        },
    });

    let RandomClips = await prisma.clip.findMany({
        where: {
            accept: false,
        },
        take: 5,
        select: {
            id: true,
            word: {
                select: {
                    ar: true,
                },
            },
        },
    });


    
    return { clip, RandomClips };
});

export default getClipThatNeedsRevision;
