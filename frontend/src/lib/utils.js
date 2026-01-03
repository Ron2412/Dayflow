/**
 * Generates an employee ID in the format: OI[F2][L2][YEAR][SERIAL]
 * Example: OIJODO2022001
 */
export const generateEmployeeId = (firstName, lastName, year, serial) => {
    const companyPrefix = 'OI';
    const f2 = firstName.substring(0, 2).toUpperCase().padEnd(2, 'X');
    const l2 = lastName.substring(0, 2).toUpperCase().padEnd(2, 'X');
    const serialStr = serial.toString().padStart(3, '0');

    return `${companyPrefix}${f2}${l2}${year}${serialStr}`;
};

/**
 * Generates a random temporary password
 */
export const generateTempPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 10; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};
