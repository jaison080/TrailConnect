import { PrismaClient } from '@prisma/client'
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { required, validate } from '../../utils/validationArray';
import { hash } from 'bcrypt';

const prisma = new PrismaClient()

export default async function handler(req, res) {

    switch (req.method) {
        case 'GET':
            return getitems(req, res);
        case 'POST':
            return createitem(req, res);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }

}

async function getitems(req, res) {
    const items = await prisma.item.findMany({
        select: {
            ID: true,
            name: true,
            image: true,
            priority: true
        }
    });

    return res.status(200).json({
        items: items,
        message: 'OK'
    });
}

async function createitem(req, res) {
    const { name, image, priority } = req.body;
    
    console.log(priority)
    const validation = validate([
        [required(priority || ""), 'Priority is required'],
        [required(name || ""), 'Name is required'],
        [required(image || ""), 'Image is required'],

    ]);

    if (!validation.isValid) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: validation.errors
        });
    }


    const item = await prisma.item.create({
        data: {
            name,
            image,
            priority: parseInt(priority)
        }
    });
    return res.status(200).json({
        item: item,
        message: 'OK'
    });
}