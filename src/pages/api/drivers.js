import { PrismaClient } from '@prisma/client'

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