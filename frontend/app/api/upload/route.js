export async function POST(req){

    const data = await req.formData() ;
    if(data.get('file')){
        console.log('We have a file .' , data.get('file'));
    }
    return Response.json(true);
}