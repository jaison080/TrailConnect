import { PrismaClient } from '@prisma/client'
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { required, validate } from '../../../../utils/validationArray';
import { hash } from 'bcrypt';

const prisma = new PrismaClient()

export default async function handler(req, res) {

    switch (req.method) {
        case 'GET':
            return getSteps(req, res);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }

}

async function getSteps(req, res) {
    const steps = await prisma.transport_steps.findMany({
        where: {
            transport_id: req.query.id,
          },
        select: {
            ID : true,               
            transport : true,        
            transport_id  : true,    
            warehouse : true,        
            warehouse_id  : true,    
            status  : true,          
            current_latitude : true,  
            current_longitude : true,
            Start_location : true,   
            End_location  : true,    
            date  : true            
        }
    });
    return res.status(200).json({
        steps: steps,
        message: 'OK'
    });
}

