import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex } from '@chakra-ui/react';

import { useLoginMutation } from 'shared/api/auth';
import { setUserInfo } from 'shared/lib';
import { Field } from 'shared/ui';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const [loginUser, { isLoading }] = useLoginMutation();

    const handleSubmit = async () => {
        try {
            const userData = await loginUser({
                email,
                password,
            }).unwrap();

            setUserInfo(userData);

            navigate('/home');
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
