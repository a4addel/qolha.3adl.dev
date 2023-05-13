import Header from "@ui/header";
import PageContainer from "@ui/PageContainer";
import { GetServerSideProps as GSSP } from "next/types";
import { List, Alert, Typography } from "antd";
import Loading from "@ui/Loading";
import { useSession } from "next-auth/react";

export const getServerSideProps: GSSP = async (ctx) => {
    try {
        // const words = await prisma.word.findMany({
        //     where: {
        //         userId: getQueryItem(ctx.query.userID)
        //     },
        //     take: 100,
        //     select: {
        //         id: true, _count: true, accepted: true, ar: true
        //     }
        // });
        return {
            props: {
                words: Array.from({ length: 55 }, () => ({ ar: "أنا", id: Math.random().toString() })) as Array<{ id: string; ar: string }>,
            },
        };
    } catch (e) {
        return {
            redirect: {
                destination: "/error",
                permanent: false,
            },
        };
    }
};

export default function UserWordsPage({ words }: any) {
    const user = useSession();
    if (user.status === "loading") return <Loading />;
    return (
        <>
            <Header isSearch={true} />
            <PageContainer>
                <Typography.Title className="text-4xl">اصوات ساهم بها المستخدم</Typography.Title>
                <List className="gap-2 flex flex-col" dataSource={words} renderItem={(e: { ar: string; id: string }) => <Alert className="my-2" message={e?.ar} type="info" />} />
            </PageContainer>
        </>
    );
}
