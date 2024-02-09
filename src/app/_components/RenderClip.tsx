"use client";

import { Col, Flex, Button, Popover, Typography, ButtonProps } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useSize } from "react-use";
import { useRef } from "react";
import { api } from "~/trpc/server";
import { useAtom, atom } from "jotai";

type words = {
  word: string;
  clips: {
    path: string;
    user: {
      name: string;
      country: string;
    };
  }[];
}[];

const data: words = [
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      }, {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      }, {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
  {
    word: "قال",
    clips: [
      {
        path: "path",
        user: {
          name: "احمد",
          country: "مصر",
        },
      },
    ],
  },
];
const val = atom<words>(data as words);

const sampleData = {
  idx: 1,
  word: "كلمه",
  approvedat: new Date().toISOString(),
  contributer: "Ahsssssssssssmad",
  clipPath: "sss",
};



const WordContributor = ({
  wordIDX,
  clipIDX,
}: {
  wordIDX: number;
  clipIDX: number;
}) => {
  const [s] = useAtom(val);
  return (
    <Col className="flex items-center">
      {s[wordIDX]?.clips[clipIDX]?.user.name} من  {s[wordIDX]?.clips[clipIDX]?.user.country}
    </Col>
  );
};

const ClipItemList = ({
  clipIDX,
  wordIDX,
}: {
  clipIDX: number;
  wordIDX: number;
}) => {
  const [s] = useAtom(val);

  return (
    <Flex className="w-full">
      <Button
        className=" !h-full !aspect-square flex justify-center items-center"
      >
        <PlayCircleOutlined className="text-1xl shadow-xl rounded-full !flex !justify-center !items-center" />
      </Button>
      <WordContributor wordIDX={wordIDX} clipIDX={clipIDX} />
    </Flex>
  );
};

function RenderClips({ wordIDX }: { wordIDX: number }) {
  const [s] = useAtom(val);

  return (
    <Flex className="flex-col w-full h-full max-w-xl overflow-y-scroll gap-2">
      {s[wordIDX]?.clips.map((e, clipIDX) => {
        return <ClipItemList wordIDX={wordIDX} clipIDX={clipIDX} />;
      })}
    </Flex>
  );
};

const WordListItem = ({ wordIDX }: { wordIDX: number }) => {
  const [word] = useAtom(val);
  console.log("RenderClips");

  return (
    <Flex className="p-2 shadow-sm border">
      <Col className="flex  !text-4xl">
        <Popover
          placement="bottom"
          title={
            <Typography className="text-center">
              <h2>{word[wordIDX]?.word}</h2>
            </Typography>
          }
          className="!w-full max-w-4xl"
          overlayStyle={{ width: 400 }} // Set the width to 400px

          content={<RenderClips wordIDX={wordIDX} />}

        >
          <Button

            className=" !h-full !aspect-square flex justify-center items-center"
          >
            <PlayCircleOutlined className="text-1xl shadow-xl rounded-full !flex !justify-center !items-center" />
          </Button>
        </Popover>
      </Col>

      <Col className="flex justify-start items-center w-full flex-grow-1  !text-4xl">
        <Typography className=" !text-4xl px-4">
          {word[wordIDX]?.word}
        </Typography>
      </Col>
    </Flex>
  );
};

const WordList = () => (
  <Flex className="!w-full justify-center">
    <Flex className="w-full max-w-4xl flex-col gap-3 p-4">
      {Array.from({ length: 10 }, () => sampleData).map((wordData, index) => (
        <WordListItem wordIDX={index} />
      ))}
    </Flex>
  </Flex>
);

export default function Word() {
  return <WordList />;
}
