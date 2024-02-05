"use client";

import { useState } from "react";
import useKey from "@reecelucas/react-use-hotkeys";
import { Button } from "antd";
import { api } from "~/trpc/react";
import { notification } from "antd";

export default function MyCombobox() {
  const [word, setWord] = useState("");

  const wordApi = api.word.createWord.useMutation({
    onSuccess: () => {
      notification.success({
        message: "تم اضافه الكلمه بنجاح",
        placement: "topRight",
        duration: 2000,
      });
      setWord("");
    },
  });

  function submit() {
    if (wordApi.isLoading) return;
    wordApi.mutate({ text: word });
  }
  useKey("Enter", () => {
    submit();
  });

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="h-1/3 flex flex-end items-end m-5 flex-grow-0">
        <input
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              wordApi.mutate({ text: word });
            }
            return true;
          }}
          className="h-28 text-center font-bold text-4xl w-full border align-bottom max-w-4xl block mx-auto"
          value={word}
        />
      </div>
      <div className="h-2/3 flex-grow-0">
        <Button
          loading={wordApi.isLoading}
          onClick={() => submit()}
          shape="round"
          size="large"
          className=" font-rubik max-w-80 w-9/12 !h-28 !block mx-auto bg-slate-500 !text-4xl rounded"
        >
          ادخل
        </Button>
        {wordApi.error?.message}
      </div>
    </div>
  );
}
