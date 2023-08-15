import { PrismaClient } from '@prisma/client'
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { required, validate } from '../../../../utils/validationArray';
import { hash } from 'bcrypt';

const prisma = new PrismaClient()

export default async function handler(req, res) {

    switch (req.method) {
        case 'POST':
            return createWarehouse_items(req, res);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }

}



async function createWarehouse_items(req, res) {
    const { warehouse_items } = req.body;

    // const validation = validate([
    //     [required(driver_id|| ""), 'driver id is required'],
    //     [required(to_wid || ""), 'to warehouse id is required'],
    //     [required(from_wid || ""), 'from warehouse id is required'],
    //     [required(status || ""), 'status is required'],
    //     [required(date || ""), 'date is required']
    // ]);

    // if (!validation.isValid) {
    //     return res.status(400).json({
    //         message: 'Validation failed',
    //         errors: validation.errors
    //     });
    // }


    const warehouse_item = await prisma.warehouse_items.createMany({
        data: warehouse_items
    });
    return res.status(200).json({
        warehouse_items: warehouse_item,
        message: 'OK'
    });
}