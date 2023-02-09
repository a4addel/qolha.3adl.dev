import PageContainer from "../../components/PageContainer";
import { Button, Grid, Input, Row, Typography } from "antd";
import { signIn } from "next-auth/react";

import Header from "../../components/header";
import { FcGoogle } from "react-icons/fc";
import { Field, Formik } from "formik";

import axios from "axios";

const LoginPage = () => {
  return (
    <>
      <Header isSearch={false} />
      <PageContainer>
        <Typography.Title>الدخول</Typography.Title>
        <Button onClick={() => signIn("google")} className="w-full h-auto">
          <FcGoogle className="block mx-auto text-5xl" />
        </Button>
      </PageContainer>
    </>
  );
};

export default LoginPage;
