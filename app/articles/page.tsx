"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Schema, tableName } from "../../data/database.data";
import { Database } from "@tableland/sdk";
import ArticleBox from "@/components/article/box/ArticleBox";

const Messages = () => {

    const [allArticles, setAllArticles] = useState<Schema[]>([])

    useEffect(() => {
        const db = new Database<Schema>();
        db.prepare(`SELECT * FROM ${tableName};`).all()
            .then((res) => {
                console.log(res);

                setAllArticles(res.results)
            })

    }, [])

    return (
        <>
            <div className="w-full">
                <div className="bg-white py-4 sm:py-8 lg:py-12">
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
            <div className="bg-white py-4 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <div className="mb-10 md:mb-16">
                        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Articles</h2>
                    </div>
                    <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
                        {
                            allArticles.map((article) => {
                                return <ArticleBox article={article}/>
                            })
                        } 
                    </div>
                </div>
            </div>
        </>

    )

}

export default Messages