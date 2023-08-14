import { PrismaClient } from '@prisma/client'
import isEmail from 'validator/lib/isEmail';
import { required, validate } from '../../utils/validationArray';
import { hash } from 'bcrypt';

const prisma = new PrismaClient()

export default async function handler(req, res) {

    switch (req.method) {
        case 'GET':
            return getAdmins(req, res);
        case 'POST':
            return createAdmin(req, res);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }

}

async function getAdmins(req, res) {
    const admins = await prisma.admin.findMany({
        select: {
            ID: true,
            Name: true,
            Email: true
        }
    });
    return res.status(200).json({
        admins: admins,
        message: 'OK'
    });
}

async function createAdmin(req, res) {
    const { Name, Email, Password } = req.body;

    const validation = validate([
        [required(Name), 'Name is required'],
        [required(Email), 'Email is required'],
        [required(Password), 'Password is required'],
        [isEmail(Email), 'Invalid Email'],
        [!(await prisma.admin.findUnique({
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

    const admin = await prisma.admin.create({
        data: {
            Name,
            Email,
            Password_Hash: hashedPassword
        },
        select: {
            ID: true,
            Name: true,
            Email: true
        }
        
    });
    return res.status(200).json({
        admin: admin,
        message: 'OK'
    });
}