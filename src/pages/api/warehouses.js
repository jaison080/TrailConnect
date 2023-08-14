import { PrismaClient } from '@prisma/client'
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { required, validate } from '../../utils/validationArray';
import { hash } from 'bcrypt';

const prisma = new PrismaClient()

export default async function handler(req, res) {

    switch (req.method) {
        case 'GET':
            return getWarehouses(req, res);
        case 'POST':
            return createWarehouse(req, res);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }

}

async function getWarehouses(req, res) {
    const warehouses = await prisma.warehouse.findMany({
        select: {
            ID: true,
            name: true,
            location: true 
        }
    });
    return res.status(200).json({
        warehouses: warehouses,
        message: 'OK'
    });
}

async function createWarehouse(req, res) {
    const { name, location } = req.body;

    const validation = validate([
        [required(name || ""), 'Name is required'],
        [required(location || ""), 'Location is required']
    ]);

    if (!validation.isValid) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: validation.errors
        });
    }


    const warehouse = await prisma.warehouse.create({
        data: {
            name,
            location
        }
    });
    return res.status(200).json({
        warehouse: warehouse,
        message: 'OK'
    });
}