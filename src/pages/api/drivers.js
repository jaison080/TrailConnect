import { PrismaClient } from '@prisma/client'
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { required, validate } from '../../utils/validationArray';
import { hash } from 'bcrypt';

const prisma = new PrismaClient()

export default async function handler(req, res) {

    switch (req.method) {
        case 'GET':
            return getDrivers(req, res);
        case 'POST':
            return createDriver(req, res);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }

}

async function getDrivers(req, res) {
    const drivers = await prisma.driver.findMany({
        select: {
            ID: true,
            Name: true,
            Phone: true,
            Email: true
        }
    });
    return res.status(200).json({
        drivers: drivers,
        message: 'OK'
    });
}

async function createDriver(req, res) {
    const { Name, Phone, Email, Password } = req.body;

    const validation = validate([
        [required(Name || ""), 'Name is required'],
        [required(Email || ""), 'Email is required'],
        [required(Phone || ""), 'Phone is required'],
        [required(Password || ""), 'Password is required'],
        [isEmail(Email || ""), 'Invalid Email'],
        [isMobilePhone(Phone || ""), 'Invalid Phone Number'],
        [!(await prisma.driver.findUnique({
            where: {
                Email: Email
            }
        })), 'Email already exists']
    ]);

    if (!validation.isValid) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: validation.errors
        });
    }

    const hashedPassword = await hash(Password, 10);

    const driver = await prisma.driver.create({
        data: {
            Name,
            Phone,
            Email,
            Password_Hash: hashedPassword
        }
    });
    return res.status(200).json({
        driver: driver,
        message: 'OK'
    });
}