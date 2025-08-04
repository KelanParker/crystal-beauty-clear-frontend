import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
    "https://kxdevraoaloduutlzcko.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4ZGV2cmFvYWxvZHV1dGx6Y2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMTExODIsImV4cCI6MjA2OTg4NzE4Mn0.jiZMDcsivcc4OJ3c5NEqmTqeZy42-mn2V-MqZBKwFfc"
);

export default function mediaUpload(file){
    const promise = new Promise(
        (resolve,reject)=>{
            if(file == null){
                reject("No file selected")
            }
            const timeStamp = new Date().getTime()
            const newFileName = timeStamp+file.name

            supabase.storage.from("site-images").upload(newFileName, file, {
                cacheControl: "3600",
                upsert: false,
            }).then(
                ()=>{
                    const url = supabase.storage.from("site-images").getPublicUrl(newFileName).data.publicUrl
                    resolve(url)
                }
            ).catch(
                (error)=>{
                    console.log(error)
                    reject("File uploaded failed")
                }
            )
        }
    )
    return promise;
}