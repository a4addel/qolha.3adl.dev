import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { v4 } from "uuid";
import { db } from "~/server/db";
 import { api } from "~/trpc/server";
import { env } from "~/env";
import { client } from "~/server/supabase";
import { headers } from "next/headers";
import { getUserFromJWT } from "~/server/api/trpc";

export async function POST(request: NextRequest) {
  const session = await getUserFromJWT(request.headers)
  if (session.error || !session.data.user) {
    return new NextResponse();
  }
  
  const formData = await request.formData();

  const file = formData.get("file") as Blob | null;
  const wordId = formData.get("word_id") as string | null;
  if (file === null) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 },
    );
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  console.log(session);

  try {
    const supbase_storage = await client.storage
      .from("clips")
      .upload(`/clips/${wordId}${v4()}.mp3`, buffer);
    if (supbase_storage.error) {
      throw supbase_storage.error;
    }
    const publicUrl = client.storage
      .from("clip")
      .getPublicUrl(supbase_storage.data.path);

    await db.clip.create({
      data: {
        supabase_path: supbase_storage.data.path,
        supabase_public_url: publicUrl.data.publicUrl,
        word_id: wordId || "",
        // @ts-ignore
        user_id: session?.data?.user.id || "",
         
      },
    });
    await db.word.update({
      data: {
        number_of_clips: {
          increment: 1,
        },
      },
      where: {
        id: wordId || "",
      },
    });

    return NextResponse.json(await api.word.getaWordThatNeedClips.query());
  } catch (error) {
    return NextResponse.json({ error });
  }
}
