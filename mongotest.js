import connectToMongo from './server/connect.cjs';

export default async function Main(){
    try{
        const client = await connectToMongo();
        console.log("connected")
    } catch(e){
        console.error(e)
    }


    Main()
}