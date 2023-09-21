"use client"
import CoinSelecter from "@/components/coinselecter/CoinSelecter";
import CustomTable from "@/components/table/CustomTable";
import axios from "axios";
import { useEffect, useState } from "react";
import { Database } from "@tableland/sdk";
import { Token, Uniswap, uniswapQuery } from "@/data/database.uniswap";
import dotenv from "dotenv"
const Dashboard = () => {

    const [uniswapData, setUniswapData] = useState<Token[]>([])
    const [token0,setToken0] = useState("");
    const [token1,setToken1] = useState("");
    const uniswapTable = "datahack_token_table_314159_314"
    const db = new Database<Token>();

    const saveToken = async (tokens: Token[]) => {
        const queryArray = []
        for (let index = 0; index < tokens.length; index++) {
            const query = db
                .prepare(`INSERT INTO ${uniswapTable} (id, name, symbol, decimal) VALUES (?, ?, ?, ?);`)
                .bind(tokens[index].id, tokens[index].name, tokens[index].symbol, tokens[index].decimals)
            queryArray.push(query)
        }
        await db.batch(queryArray);
    }

    const getUniswapFromGraph = () => {
        dotenv.config()
        axios.post(process.env.NEXT_PUBLIC_GRAPH_URL, {
            query: uniswapQuery,
        })
            .then((response: Uniswap) => {
                console.log(response)
                const tokens = response.data.data.tokens
                //saveToken(tokens)
                setUniswapData(tokens)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const checkUniswapTokensAndLoad = () => {
        db.prepare(`SELECT * FROM ${uniswapTable}`)
            .all()
            .then((res) => {
                if (res.results.length == 0) {
                    getUniswapFromGraph()
                } else {
                    setUniswapData(res.results)
                }
            });
    }

    useEffect(() => {

        /*const startTable = async () => {
            const db = new Database<Token>();
            const prefix: string = "datahack_token_table";
            const { meta: create } = await db
                .prepare(`CREATE TABLE ${prefix} (id text primary key, name text, symbol text, decimal int);`)
                .run();
            console.log(create);
            return create.txn?.name
        }
        startTable()
            .then((res) => {
                console.log(res);
            })*/
        if (uniswapData.length == 0) {
            checkUniswapTokensAndLoad()
        }
        if(token0 !== "" && token1 !== ""){
            //send request
        }
    },[token0,token1])

    return (
        <>
            <div className="w-full flex justify-items-stretch">
                <CoinSelecter onChange={(value)=>{setToken0(value)}} data={uniswapData} />
                <CoinSelecter onChange={(value)=>{setToken1(value)}} data={uniswapData} />
            </div>
            <div className="mt-10 w-full">
                <CustomTable />
            </div>
        </>
    )
}

export default Dashboard;