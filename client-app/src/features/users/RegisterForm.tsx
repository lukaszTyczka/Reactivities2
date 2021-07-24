import React from 'react';
import { observer } from 'mobx-react-lite';
import { ErrorMessage, Form, Formik } from 'formik';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button, Header } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import Validationerrors from '../errors/ValidationErrors';

export default observer(function RegisterForm() {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{
                email: '',
                displayName: '',
                username: '',
                password: '',
                confirmPassword: '',
                error: null,
            }}
            onSubmit={(values, { setErrors, setSubmitting }) => {
                userStore.register(values).catch((error) => {
                    setErrors({ error });
                    setSubmitting(false);
                });
            }}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
                confirmPassword: Yup.string()
                    .required()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            })}>
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form onSubmit={handleSubmit} className="ui form error">
                    <Header
                        as="h2"
                        content="Register to Reactivites"
                        textAlign="center"
                        color="teal"
                    />
                    <MyTextInput
                        name="displayName"
                        placeholder="Display name"
                    />
                    <MyTextInput name="username" placeholder="Name" />
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput
                        name="password"
                        placeholder="Password"
                        type="password"
                    />
                    <MyTextInput
                        name="confirmPassword"
                        placeholder="Confirm password"
                        type="password"
                    />
                    <ErrorMessage
                        name="error"
                        render={() => (
                            <Validationerrors errors={errors.error} />
                        )}
                    />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting}
                        positive
                        content="Login"
                        type="submit"
                        fluid
                    />
                </Form>
            )}
        </Formik>
    );
});
