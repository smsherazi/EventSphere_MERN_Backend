import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

export const verifyPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}