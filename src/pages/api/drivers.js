import { PrismaClient } from '@prisma/client'
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { required, validate } from '../../utils/validationArray';

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
    const drivers = await prisma.driver.findMany();
    return res.status(200).json({
        drivers: drivers,
        message: 'OK'
    });
}

async function createDriver(req, res) {
    const { Name, Phone, Email } = req.body;

    const validation = validate([
        [required(Name), 'Name is required'],
        [required(Email), 'Email is required'],
        [required(Phone), 'Phone is required'],
        [isEmail(Email), 'Invalid Email'],
        [isMobilePhone(Phone), 'Invalid Phone Number'],
        [!prisma.driver.findUnique({ where: { Email } }), 'Email already exists']
    ]);

    if (!validation.isValid) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: validation.errors
        });
    }

    const driver = await prisma.driver.create({
        data: {
            Name,
            Phone,
            Email
        }
    });
    return res.status(200).json({
        driver: driver,
        message: 'OK'
    });
}