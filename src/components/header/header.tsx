import { Row, Col, Typography, Button } from "antd";
import Search from "../search";
import NextLink from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../../server/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Header({ isSearch }: { isSearch: boolean }) {
  const d = useAuthState(auth);

  return (
    <Row className="w-full flex flex-col">
      <Row className="w-full  bg-slate-600 px-5">
        <Row className="w-full max-w-7xl flex flex-col mx-auto my-2 h-9">
          <Row className="flex flex-row align-middle h-full gap-2">
            <Col className="flex flex-col justify-center">
              <h1>قلها</h1>
            </Col>
            <Col className="flex flex-row justify-center">
              <NextLink className="text-cyan-100" href="/admin/login">
                تسجيل مسؤول
              </NextLink>

              <NextLink className="text-cyan-100" href="/auth">
                تسجيل
              </NextLink>

              {!d[1] && d[0] && (
                <Button onClick={() => signOut(auth)}>خروج</Button>
              )}
            </Col>
          </Row>
        </Row>
      </Row>

      {isSearch && <Search />}
    </Row>
  );
}
