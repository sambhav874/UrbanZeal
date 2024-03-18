export function dbDateTime(str){
    return str.replace('T',' ').substring(0,16);
}