import bcrypt from 'bcrypt'

export const hashPassword = async(password) => {
    try {
        const saltRounds=10;
        const hashPassword = await bcrypt.hashSync(password,saltRounds);
        return hashPassword;
    } catch (error) {
        console.log(error);
    }
}

export const comparePassword = async(password,hashedPassword) => {
    return bcrypt.compareSync(password,hashedPassword)
}
