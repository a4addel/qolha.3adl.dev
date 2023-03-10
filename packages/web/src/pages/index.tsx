import { Col, Row, Menu, Collapse, Typography } from "antd";
import React from "react";
import Header from "@ui/header";
import PageContainer from "@ui/PageContainer";
import TargetWord from "@ui/TargetWord";
import { GetServerSideProps as G } from "next/types";
import { z } from "zod";
import AudioHero from "@ui/AudioHero";

const quertSchema = z.object({
  q: z.string().uuid(),
  word: z.string(),
});

export const getServerSideProps: G = async (ctx) => {
  
  if (!ctx.query.q && !ctx.query.word) {
    return {
      props: {
        home: true,
      },
    };
  }
  // const isValid = quertSchema.safeParse(ctx.query);
  // if (!isValid.success) {
  //   return {
  //     props: {
  //       error: true,
  //       msg: isValid.error.errors,
  //     },
  //   };
  // }

  
  /**
   *  const word = await Axios({
   *    mathod: "GET",
   *    url: "Backend_URL" + "/words/:wordID"
   *  })
   */
  const word = {
    ar: "أنا",
    en: "I",
    id: Math.random().toString(),
    clips: [
      {
        path: "/ssssssssssssssssssssssssssssssssss",
        id: Math.random().toString(),
      },
    ],
  };
  if (!word?.id) {
    return {
      props: {
        error: true,
      },
    };
  }

  return {
    props: {
      word: word,
    },
  };
};

export default function Page(props: any) {
  const isHome = !!props.home;
  const isError = !!props.error;
  const isWord = !!props.word;

  return (
    <>
      <Row className="flex flex-col">
        <Header isSearch={true} />
        <PageContainer>
          {isError && <TargetWord word="حدثَ خطاََ ما." />}

          {isHome && (
            <>
              <Typography.Title className="!text-4xl !sm:text-5xl !md:text-6xl !lg:text-7xl block w-full">قُلها</Typography.Title>

              <Typography.Paragraph className="block w-full">قاموس صوتي للكلمات العربية</Typography.Paragraph>

              <Typography.Text className="block w-full">كيف بدئنا ؟</Typography.Text>

              <Typography.Text className="block w-full">لما رأيت معناة أصدقائي الاجانب في تعلم العربية خاصة عندما يتعبق الامر بالنطق قررت أن ابني هذا الموقع لتسهيل الامر عليهم،</Typography.Text>

              <Typography.Text className="block w-full">
                كيف تساعدنا ؟
                <Typography.Text className="block w-full">
                  إذا أردت مساعدتنا عن طريق المساهمة في نطق الكلمات <Typography.Link href="/contribute">إضغط هُنا</Typography.Link>
                </Typography.Text>
              </Typography.Text>
            </>
          )}

          {isWord && <AudioHero key="1" word={props.word} />}
        </PageContainer>
      </Row>
    </>
  );
}
