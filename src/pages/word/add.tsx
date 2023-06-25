import { WhatsAppOutlined } from "@ant-design/icons";
import { Schema$Client$InsertWord } from "@schema/word/insert-word";
import PageContainer from "@ui/PageContainer";
import Header from "@ui/header";
import { Row, Col, Input, Button, Form } from "antd";
import useAxios from "axios-hooks";
import { Formik, FieldConfig, Field, ErrorMessage, FormikHelpers } from "formik";
import { InferType } from "yup";
import { showNotification } from "../contribute";

export default function AddWord() {
    const [data, refetch] = useAxios({}, { manual: true });

    async function submitWord(e: any, reset: FormikHelpers<any>) {
        await refetch({
            url: "/api/word/insert",
            method: "POST",
            data: e,
        });
        showNotification({
            message: "نجحت العملية",
            destroyAfter: 600,
            type: "success",
        });
        reset.resetForm();
    }
    return (
        <>
            <Header isSearch={false} />
            <PageContainer>
                <Formik onSubmit={(data, form) => submitWord(data, form)} initialValues={{ word: "", description: "" } as InferType<typeof Schema$Client$InsertWord>} validationSchema={Schema$Client$InsertWord}>
                    {(form) => (
                        <Form>
                            <Row className="w-full h-full">
                                <Form.Item required className="w-full" label="الكلمة العربية">
                                    <Field {...({ name: "word" } as FieldConfig)} as={Input} />
                                    <ErrorMessage name="word" />
                                </Form.Item>
                                <Form.Item required label="وصف" className="w-full">
                                    <Field {...({ name: "description" } as FieldConfig)} as={Input.TextArea} />
                                    <ErrorMessage name="description" />
                                </Form.Item>
                                <Col className="w-full">ssss</Col>

                                <Form.Item className="w-full">
                                    <Button onClick={() => form.handleSubmit()} htmlType="submit" type="default">
                                        ADD
                                    </Button>
                                </Form.Item>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </PageContainer>
        </>
    );
}
