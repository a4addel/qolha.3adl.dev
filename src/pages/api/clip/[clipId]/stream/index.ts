import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "@backend/db";
import Codes from "http-status-codes";
import ValidateInput from "@backend/utils/validate.yup";
import { createReadStream } from "node:fs";
import { join } from "path";
import { Schema$API$StreamClip } from "@schema/clip/stream-clip";

const route = nextConnect();

route.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: Input, errors } = ValidateInput(Schema$API$StreamClip, req);

    if (errors.length > 0)
        return res.status(Codes.BAD_REQUEST).send({
            message: errors,
        });

    const clip = await prisma.clip.findFirst({
        where: {
            id: Input.query.clipId,
        },
        select: {
            clipName: true,
            id: true,
        },
    });

    if (!clip) {
        return res.status(Codes.NOT_FOUND).send({
            message: ["clip Not Found"],
        });
    }

    console.log(clip.clipName);

    const stream = createReadStream(join(process.cwd(), "files", "clips", clip.clipName));

    stream.on("error", (error) => {
        console.log(error);

        return res.status(Codes.INTERNAL_SERVER_ERROR).send({
            message: ["Faild To stream the Clip"],
        });
    });
    stream.pipe(res);
});

export default route;
