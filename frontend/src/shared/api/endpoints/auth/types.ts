export type RegisterBody = {
    username: string;
    email: string;
    password: string;
    birthdate: string;
};

export type LoginBody = Omit<RegisterBody, 'username' | 'birthdate'>;

export type Tokens = {
    access: string;
    refresh: string;
};

export type User = {
    id: string;
    username: string;
    birthdate: string;
    email: string;
    level: number;
    xp: number;
};
