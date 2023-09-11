"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Schema, tableName } from "../data/database.data";
import { Database } from "@tableland/sdk";

const Messages = () => {

    const [allArticles,setAllArticles] = useState<Schema[]>([])

    useEffect(()=>{
        const db = new Database<Schema>();
        db.prepare<Schema>(`SELECT * FROM ${tableName};`).all()
            .then((res)=>{
                console.log(res);
                
                setAllArticles(res.results)
            })

    },[])

    return (
        <>
            <div className="w-full">
                <div className="bg-white py-6 sm:py-8 lg:py-12">
                    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                        <div className="flex flex-col items-center justify-between gap-4 rounded-lg bg-gray-100 p-4 sm:flex-row md:p-8">
                            <div>
                                <h2 className="text-xl font-bold text-indigo-500 md:text-2xl">Write Your Article</h2>
                                <p className="text-gray-600">Noone will know who you are</p>
                            </div>

                            <Link href="/article/write"><p className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Start Now</p></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                { 
                    allArticles.map((article)=>{
                        return <p className="text-black">{article.title}</p>
                    })
                }
            </div>
        </>

    )

}

export default Messages