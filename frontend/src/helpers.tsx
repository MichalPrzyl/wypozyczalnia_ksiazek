export function shortenString (str: any){
    if (str){
        if (str.length > 20){
            return `${str.slice(0,20)}...`
        }
        return str
    }
}