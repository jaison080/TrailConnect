import { PrismaClient } from '@prisma/client'
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { required, validate } from '../../../utils/validationArray';
import { hash } from 'bcrypt';

const prisma = new PrismaClient()

export default async function handler(req, res) {

    switch (req.method) {
        case 'GET':
            return getTransports(req, res);
        case 'POST':
            return createTransport(req, res);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }

}

async function getTransports(req, res) {
    const transports = await prisma.transport.findMany({
        select: {
            ID: true,
            driver_id: true,
            to_wid: true,
            from_wid: true,
            status: true,
            date: true
        }
    });
    return res.status(200).json({
        transports: transports,
        message: 'OK'
    });
}

async function createTransport(req, res) {
    const { driver_id, to_wid, from_wid, status, date } = req.body;

    const validation = validate([
        [required(driver_id|| ""), 'driver id is required'],
        [required(to_wid || ""), 'to warehouse id is required'],
        [required(from_wid || ""), 'from warehouse id is required'],
        [required(status || ""), 'status is required'],
        [required(date || ""), 'date is required']
    ]);

    if (!validation.isValid) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: validation.errors
        });
    }


    const transport = await prisma.transport.create({
        data: {
            driver_id,
            to_wid,
            from_wid,
            status,
            date: new Date(date)
        }
    });
    return res.status(200).json({
        transport: transport,
        message: 'OK'
    });
}