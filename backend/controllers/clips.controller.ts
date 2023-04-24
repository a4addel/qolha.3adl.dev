import { InternalException } from "../utils/exception";
import { Request, Response } from "express";

import Codes from "http-status-codes";
import { createReadStream } from "node:fs";
import getQueryItem from "../utils/getQueryItem";
import { join } from "node:path";
import prisma from "../utils/prismadb";
import { v4 } from "uuid";
import butters from "a-promise-wrapper";
import * as sequelize from "../../db";

export async function streamClip(req: Request, res: Response) {
    const clip = await butters(sequelize.Clip.findByPk(getQueryItem(req.query.clipID), {
        attributes: []
    }));
        if (clip.error) return InternalException(res, "Internal Server Error");
        if (!clip.data) return res.sendStatus(Codes.NOT_FOUND).send("clip Not Found")
        const stream = createReadStream(join(process.cwd(), "files", "clips", clip.data.clipName));

        stream.on("error", (error) => {
            return InternalException(res, error);
        });
        stream.pipe(res);
}
export async function getClipThatNeedsToBeReviewed(req: Request, res: Response) {
    const clips = await  butters(sequelize.Clip.findAll({
        limit: 5,
        where: {
            reject: false,
            accept: false,

        }, 
        include: [
            {
                model: sequelize.User,
                attributes:["id", "email", "image"]
            },
            {
                model: sequelize.Word,
                attributes:["id", "ar"]
            }
        ],
        attributes: ["clipName","id"]
    }));

    if (clips.error) return res.sendStatus(Codes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    
    res.sendStatus(Codes.OK).send(clips.data)
}

export async function acceptClip(req: Request, res: Response) {
    try {
        const clipStatus = await prisma?.clip.update({
            where: {
                id: getQueryItem(req.query.clipID),
            },
            data: {
                accepted: true,
                rejected: false,
            },
        });
        return res.status(Codes.OK).json(clipStatus);
    } catch (error) {
        return InternalException(res, error);
    }
}

export async function rejectClip(req: Request, res: Response) {
    try {
        const clipStatus = await prisma?.clip.update({
            where: {
                id: getQueryItem(req.query.clipID),
            },
            data: {
                accepted: false,
                rejected: true,
            },
        });
        return res.status(Codes.OK).json(clipStatus);
    } catch (error) {
        return InternalException(res, error);
    }
}

export async function appendRate(req: Request, res: Response) {
    try {
        const clipRate = await prisma?.rate.findFirst({
            where: {
                AND: {
                    clipID: getQueryItem(req.query.clipID),
                    // @ts-ignore
                    userID: req.session.id,
                },
            },
        });

        const newClipRate = await prisma?.rate.upsert({
            create: {
                clipID: getQueryItem(req.query.clipID),
                // @ts-ignore
                userID: req.session.id,
                rate: Number(getQueryItem(req.body.rate)),
                id: v4(),
            },
            update: {
                rate: Number(getQueryItem(req.body.rate)),
            },
            where: {
                id: clipRate?.id || "",
            },
        });
    } catch (error) {}
}
