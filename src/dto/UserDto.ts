interface UserDto {
    username: string;
    password?: string; // Optional field
    role: string[]; // Optional field
    description: string; // Optional field
}

export { UserDto };
