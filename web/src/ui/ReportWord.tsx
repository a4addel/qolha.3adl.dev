import { Modal, Button, Select, Typography } from "antd";
import React from "react";
import { useToggle } from "react-use";
import { reasons_for_the_report_word } from "../pages/api/resport/word/[wordID]";

export default function ReportWord({ wordID }: { wordID: string }) {
  const [open, toggle] = useToggle(false);
  return (
    <>
      <Button danger onClick={() => toggle(true)}>
        ابلغ
      </Button>
      <Modal open={open} title="ابلغ عن الكلمة" destroyOnClose={true} onCancel={() => toggle(false)} onOk={() => toggle(false)}>
        <Typography.Text>ما سبب الابلاغ ؟</Typography.Text>
        <Select className="mx-2" defaultValue="اختر سبب الابلاغ" style={{ width: 250 }} options={reasons_for_the_report_word.map((e) => ({ value: e, lable: e.toUpperCase() }))}></Select>

        <Button danger={true} className="mx-2">
          إبلاغ
        </Button>
      </Modal>
    </>
  );
}
