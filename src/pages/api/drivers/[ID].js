import { PrismaClient } from '@prisma/client'
import { required, validate } from 'src/utils/validationArray';
import { compare } from 'bcrypt';

const prisma = new PrismaClient()

export default async function handler(req, res) {

    switch (req.method) {

        /**
         * Intended to be used by admin users
         */
        case 'DELETE':
            return deleteDriver(req, res);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }

}

/**
 * Authenticated function, expects Authorization header
 * Authorization: Basic base64(username:password)
 */
async function deleteDriver(req, res) {
    const { ID } = req.query;
    const validation = validate([
        [required(ID), 'ID is required'],
    ]);

    if (!validation.isValid) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: validation.errors
        });
    }

    const userPass = Buffer.from(req.headers.authorization.split(' ')[1], 'base64').toString('utf-8').split(':');
    const email = userPass[0];
    const password = userPass[1];

    const admin = await prisma.admin.findUnique({
        where: {
            Email: email
        }
    });

    if (!admin) {
        return res.status(401).json({
            message: 'Unauthorized, Admin Email not found'
        });
    }

    if (!await compare(password, admin.Password_Hash)) {
        return res.status(401).json({
            message: 'Unauthorized, Wrong Password'
        });
    }

    const driver = await prisma.driver.findUnique({
        where: {
            ID: ID
        }
    });

    if (!driver) {
        return res.status(404).json({
            message: 'Driver not found'
        });
    }

    await prisma.driver.delete({
        where: {
            ID: ID
        }
    });
    return res.status(200).json({
        message: 'OK'
    });
}