import { createConnection, getConnectionOptions } from "typeorm"
import * as path from "path"
import * as fs from "fs"
import { User } from "./entity/user"


export const createDbConnection = async () => {
        try {
                
                const connection = await createConnection();

                console.log("[DB] Connection instaurated");

                return connection;
        } catch (e) {
                console.error("[ERROR] DB:",e.message);
        }
}