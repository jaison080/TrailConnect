import { PrismaClient } from '@prisma/client'
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { required, validate } from '../../../../utils/validationArray';
import { hash } from 'bcrypt';

const prisma = new PrismaClient()

export default async function handler(req, res) {

    switch (req.method) {
        case 'POST':
            return createstep(req, res);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }

}

async function createstep(req, res) {
    const { steps } = req.body;

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

     let Steps  = steps.map(step => {
        return {
            ...step,
            date: new Date(step.date)
        }
    });
    const step = await prisma.transport_steps.createMany({
        data: Steps
    });
    return res.status(200).json({
        step: step,
        message: 'OK'
    });
}