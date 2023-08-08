import { Button, FormControl, FormHelperText, Input, Flex } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { ChangeEvent } from "react";
import { trpc } from "@utils/trpc";
import { useToast } from "@chakra-ui/react";
import { InferType } from "yup";
import * as yup from "yup";
import { log } from "console";

const g = yup.object().shape({
    word: yup.string().required(),
});

export default function AddWord() {
    const appendWord = trpc.word.insertWord.useMutation({
        onError(error, variables, context) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        },
        onSuccess(data, variables, context) {
            toast({
                title: "Word Added",
                description: data.ar,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        },
        retry: false
    });
    const toast = useToast();

    return (
        <Formik
            validationSchema={g}
            initialValues={{ word: "" } as InferType<typeof g>}
            enableReinitialize={true}
            onSubmit={async (values, actions) => {
                if (appendWord.isLoading) return;
                
                await appendWord.mutateAsync(values);
                
                actions.resetForm();
            }}

        >
            {(form) => (

                <Flex as={Form} width={"full"} direction="column" gap={2} mx="auto" my={3}>
                    <Field name="word">
                        {({ field }: any) => (
                            <FormControl>
                                <Input  {...field} id="word" placeholder="Word" />
                            </FormControl>
                        )}
                    </Field>
                    <Flex justify="center">
                        <Button colorScheme="blue" variant="solid" title="Add Word" onClick={() => form.handleSubmit()} type="submit">
                            Add Word
                        </Button>
                    </Flex>
                </Flex>

            )}
        </Formik>
    );
}

