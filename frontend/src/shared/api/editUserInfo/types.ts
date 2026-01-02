export type RegisterBody = {
    username: string;
    email: string;
    password: string;
    birthdate: string;
};

export type LoginBody = Omit<RegisterBody, 'username' | 'birthdate'>;
