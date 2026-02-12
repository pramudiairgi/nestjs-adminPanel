import { config } from 'dotenv'
import { DataSource } from 'typeorm'

config()

export  default new DataSource({
    type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? '3306'),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        synchronize: false,
        entities: ['dist/**/entities/*.entity{.ts,.js}'],
        migrations: ['dist/src/migrations/*{.ts,.js}']
})