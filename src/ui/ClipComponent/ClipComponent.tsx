import { Button, ButtonGroup, Image } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons"; // Please note that the PlayIcon might not exist in Chakra UI Icons.
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useAudio } from "react-use";
import NextImage from "next/image";
import NextLink from "next/link";

export default function ClipComponent({ number, ar, username, clipId, userId }: { number: number; ar: string; username: string; clipId: string; userId: string }) {
    const rej = trpc.clip.reject.useMutation();
    const acc = trpc.clip.accept.useMutation();
    const [disabled, setDisabled] = useState(false);
    const session = useSession();
    const [audio, state, controls] = useAudio({
        src: `/api/clip/${clipId}/stream`,
    });

    const handlePlayClick = () => {
        controls.play();
    };

    const handleAcceptClick = async () => {
        await acc.mutateAsync({ clipId: clipId });
        setDisabled(true);
        controls.pause();
    };

    const handleRejectClick = async () => {
        await rej.mutateAsync({ clipId: clipId });
        setDisabled(true);
        controls.pause();
    };

    return (
        <tr className={`flex p-1 justify-between ${number % 2 === 0 ? "bg-slate-200" : ""}`}>
            <td className="self-center">
                <span>{ar}</span>
            </td>
            <td align="right" width="100%" className="flex-block self-center gap-1 px-1">
                <NextLink href={`/dashboard/users/${userId}`}>
                    <span className="inline-block px-1">{username}</span>
                </NextLink>
            </td>

            {audio}

            <td>
                <ButtonGroup>
                    <Button size="sm" colorScheme="blue" disabled={true} onClick={handlePlayClick}>
                        play
                    </Button>

                    <Button
                        disabled={disabled}
                        onClick={handleAcceptClick}
                        colorScheme="green"
                        size="sm"
                        // @ts-ignore
                        display={session.status === "authenticated" && ["owner", "admin"].includes(session.data?.user?.role || "") ? "inline-flex" : "none"}
                    >
                        accept
                    </Button>

                    <Button
                        disabled={disabled}
                        onClick={handleRejectClick}
                        colorScheme="red"
                        size="sm"
                        leftIcon={<DeleteIcon />}
                        // @ts-ignore
                        display={session.status === "authenticated" && ["owner", "admin"].includes(session.data?.user?.role || "") ? "inline-flex" : "none"}
                    >
                        reject
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    );
}
