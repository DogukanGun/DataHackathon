import { Schema } from "@/data/database.data"

interface ArticleBoxProps {
    article: Schema
}

const ArticleContent = (
    props:ArticleBoxProps
) => {
    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-md px-4 md:px-8">
                <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6">{props.article.title}</h1>

                <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
                    {props.article.article}
                </p>

            </div>
        </div>
    )
}

export default ArticleContent