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

    public static getFakeNumberBetween(min: number, max: number): number {
        return  Math.random() * (max - min) + min;
    }

    public static getFakeDate(): Date {
        const year = UtilityFunctions.getFakeNumberBetween(1900,2024);
        const month = UtilityFunctions.getFakeNumberBetween(1,13);
        const day = UtilityFunctions.getFakeNumberBetween(1,26);
        const hour = UtilityFunctions.getFakeNumberBetween(1,25);
        const minute = UtilityFunctions.getFakeNumberBetween(0,61);
        const second = UtilityFunctions.getFakeNumberBetween(0,61);
        return new Date(year, month, day, hour, minute, second);
    }
}