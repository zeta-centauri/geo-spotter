import { useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';

import { Field } from 'shared/ui';

import { useRegisterMutation } from '../model/api';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const [registerUser, { isLoading }] = useRegisterMutation();

    const handleSubmit = async () => {
        try {
            const formattedBirthdate = new Date(birthdate).toISOString();

            await registerUser({
                email,
                password,
                username,
                birthdate: formattedBirthdate,
            }).unwrap();
            // navigate('/lessons');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Flex direction="column" gap={5} w="full">
                <Field
                    w="full"
                    label="Ваше имя"
                    placeholder="Амир Зиннатуллин"
                    variant="subtle"
                    size="md"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
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
                <Field
                    w="full"
                    label="Дата рождения"
                    type="date"
                    variant="subtle"
                    size="md"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
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
