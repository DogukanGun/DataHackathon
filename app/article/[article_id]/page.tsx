"use client"

import ArticleContent from "@/components/article/content/ArticleContent"
import { Schema, tableName } from "@/data/database.data"
import { Database } from "@tableland/sdk"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const Article = () =>{

    const path = useParams()
    const [article,setArticle] = useState<Schema>()

    useEffect(()=>{
        const db = new Database<Schema>();
        db.prepare(`SELECT * FROM ${tableName} WHERE id = ?1`)
          .bind(path.article_id)
          .all()
          .then((res)=>{
            setArticle(res.results[0])
          });
        
    },[])

    return(
        <>
            { article && 
                <ArticleContent article={article}/>
            }
        </>
    )
}

export default Article