export class UtilityFunctions {
    public static getRandomCharWithNumber(): string {
        const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        return alphabet.charAt(randomIndex);
    }
    public static getRandomChar(): string {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        return alphabet.charAt(randomIndex);
    }

    public static getFakeName(lenght: number): string {
        let name = "";
        for(let i=0;i<lenght;i++){
            name += UtilityFunctions.getRandomChar();
        }
        return name;
    }

    public static getFakeCardNumber(lenght: number): string {
        let name = "";
        for(let i=0;i<lenght;i++){
            name += UtilityFunctions.getRandomCharWithNumber();
        }
        return name;
    }

    public static getFakeNumber(): number {
        return Math.floor(Math.random() * 100000);
    }
}