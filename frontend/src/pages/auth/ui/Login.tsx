import { useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';

import { Field } from 'shared/ui';

import { useLoginMutation } from '../model/api';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginUser, { isLoading }] = useLoginMutation();

    const handleSubmit = async () => {
        try {
            await loginUser({
                email,
                password,
            }).unwrap();

            // navigate('/lessons');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Flex direction="column" gap={5} w="full">
                <Field
                    w="full"
                    label="Email"
                    placeholder="example@tatarcha.com"
                    variant="subtle"
                    size="md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Field
                    w="full"
                    label="Пароль"
                    placeholder="Введите ваш пароль"
                    variant="subtle"
                    size="md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Flex>

            <Button
                w="full"
                size="lg"
                onClick={handleSubmit}
                loading={isLoading}
            >
                Войти
            </Button>
        </>
    );
};
