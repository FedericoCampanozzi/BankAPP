export class EnvironmentVariable {
    public static host = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        },
        baseURL: 'http://localhost:8080/api/',
        data : {

        }
    };
    public static user;
    public static isClient;
}