"use client"

import { Database } from "@tableland/sdk";
import { uuid } from "uuidv4";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Schema, tableName } from "@/data/database.data";

  
const ArticleWrite = () => {

    //const [tableName,setTableName] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const [title,setTitle] = useState("")
    const [subtitle,setSubtitle] = useState("")
    const [article,setArticle] = useState("")
    const { connector, isConnected } = useAccount()


    useEffect(()=>{
        /*const startTable = async() =>{
            const db = new Database<Schema>();
            const prefix: string = "datahack_articles_table";
            const { meta: create } = await db
            .prepare(`CREATE TABLE ${prefix} (id text primary key, owner text, title text, subtitle text, article text);`)
            .run();
            console.log(create);
            return create.txn?.name
        }

        startTable()
            .then((res)=>{
                setTableName(res ?? "isim yok")
            })*/
    },[])

    const writeArticle = async() => {
        if(title === "" || subtitle === "" || article === ""){
            setErrorMessage("Please all fields")
        }else{
            const db = new Database<Schema>();
            const account = await connector?.getAccount()
            const id = uuid().toString()
            console.log("account",account,"title",title,"id",id,"subtitle",subtitle,"article",article);
            const { meta: insert } = await db
                .prepare(`INSERT INTO ${tableName} (id, owner, title, subtitle, article) VALUES (?, ?, ?, ?, ?);`)
                .bind(id,account,title,subtitle,article)
                .run();
            await insert.txn?.wait();
            console.log(insert.txn)
        }
    }

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Write your Article</h2>
                    {errorMessage}
                </div>

                <div className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label htmlFor="company" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Title</label>
                        <input name="company" value={title} onChange={(event)=>setTitle(event.target.value)} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Subtitle</label>
                        <input name="email" value={subtitle} onChange={(event)=>setSubtitle(event.target.value)} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Article*</label>
                        <textarea name="message" value={article} onChange={(event)=>setArticle(event.target.value)} className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></textarea>
                    </div>

                    <div className="flex items-center justify-between sm:col-span-2">
                        <button onClick={()=>writeArticle()} className="inline-block rounded-lg w-full bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Send</button>
                    </div>

                    <p className="text-xs text-gray-400">By signing up to our newsletter you agree to our <a href="#" className="underline transition duration-100 hover:text-indigo-500 active:text-indigo-600">Privacy Policy</a>.</p>
                </div>
            </div>
        </div>
    )

}

export default ArticleWrite