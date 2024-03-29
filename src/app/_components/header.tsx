"use client";

import { Avatar, Button, Col, Dropdown, Flex } from "antd";
import { SettingFilled } from "@ant-design/icons";
import Link from "next/link";
import CgProfile from "@react-icons/all-files/cg/CgProfile";

import useSessionState from "~/Auth/useSession";
const items = [
  {
    key: "0",
    label: (
      <Link
        href={{
          pathname: "/clip/add",
        }}
      >
        إنطق كلمه بصوتك
      </Link>
    ),
  },
  {
    key: "1",
    label: (
      <Link
        href={{
          pathname: "/word/add",
        }}
      >
        أضف كلمه
      </Link>
    ),
  },
  {
    key: "3",
    label: (
      <Link
        href={{
          pathname: "/admin/words",
        }}
      >
        راجع كلمات (مسؤول)
      </Link>
    ),
  },
  {
    key: "4",
    label: (
      <Link
        href={{
          pathname: "/admin/clips",
        }}
      >
        راجع نطق (مسؤول)
      </Link>
    ),
  },
];
const menus = {
  PESANT: items.slice(0, 2),
  admin: items,
};
export default function Header() {
  const session = useSessionState();

  console.log(session);

  return (
    <Flex className="h-20 w-full">
      <Flex className="mx-auto w-full max-w-4xl items-center gap-3 p-3">
        <Col className="h-full">
          <CgProfile.CgProfile className="flex items-center justify-center rounded-full border text-4xl hover:bg-slate-200" />
        </Col>

        <Col className="flex w-full justify-center">
          <Link
            href={{
              pathname: "/",
            }}
            className="flex aspect-square !h-full items-center justify-center"
          >
            Quolha
          </Link>
        </Col>

        <Col className="h-full">
          <Dropdown
            menu={{
              items: menus.admin,
            }}
          >
            <Button
              className="flex aspect-square !h-full items-center justify-center rounded-full border p-4 hover:bg-slate-200"
              icon={<SettingFilled />}
            />
          </Dropdown>
        </Col>
      </Flex>
    </Flex>
  );
}
