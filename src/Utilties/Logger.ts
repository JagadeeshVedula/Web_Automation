import winston from 'winston';
import path from 'path'

const customFormat = winston.format.combine(
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    winston.format.printf(function(info){
        return `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`;
    })
)

export const logger = winston.createLogger({
    level:'info',
    transports:[
        new winston.transports.Console(
            {
                format:
                    customFormat
                
            }
        ),
        new winston.transports.File(
            {
                get filename() {
                    const errorStack = new Error().stack || '';
                    // Find any .spec.ts or .spec.js file in the execution stack
                    const match = errorStack.match(/([\w-]+\.spec\.[jt]s)/);
                    
                    let logName = 'execution_log.log';
                    if (match && match[1]) {
                        logName = match[1].replace(/\.[jt]s$/, '.log'); // e.g., login.spec.log
                    }
                    
                    return path.join(process.cwd(), "Logs", logName);
                },
                format: customFormat,
                options:{flags:'w'}
            }
        )
    ]
}) 