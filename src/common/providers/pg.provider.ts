import {Client} from "pg"

export const pgProvider =[{
    provide: 'POSTGRES_CONNECTION',
    useFactory: async() => {
        const client = new Client({
            host: '',
            port:5432,
            user:'postgres',
            password:'1234',
            database:'gids6081_db'
        });

        await client.connect();

        return client;
    }
}]