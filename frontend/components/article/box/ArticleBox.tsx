import { Schema } from "../../../data/database.data";
import { useRouter } from "next/navigation";

interface ArticleBoxProps {
    article: Schema
}

const ArticleBox = (
    props: ArticleBoxProps
) => {

    const router = useRouter()
    
    const handlerOnClick = () =>{
        router.push("/article/"+props.article.id)
    }

    return (
        <div>
            <p onClick={()=>handlerOnClick()} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.article.title}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">{props.article.subtitle}</p>
            </p>
        </div>
    )
}

"/article/"

export default ArticleBox