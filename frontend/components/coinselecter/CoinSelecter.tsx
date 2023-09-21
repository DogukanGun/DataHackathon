import { Token } from "@/data/database.uniswap";

interface CoinSelecterProps{
    data:Token[]
    onChange:(value:string)=>void
}
const CoinSelecter = (props:CoinSelecterProps) => {
    const changeSelectValue = (event: React.FormEvent<HTMLSelectElement>) => {
        var safeSearchTypeValue: string = event.currentTarget.value;
        props.onChange(safeSearchTypeValue)
    }

    return (
        <>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select onChange={changeSelectValue} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                { 
                    props.data.map((token)=>{
                        return <option value={token.id}>{token.name}</option>
                    })
                }
            </select>
        </>
    )
}

export default CoinSelecter;