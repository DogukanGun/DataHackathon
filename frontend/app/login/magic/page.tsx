"use client"
import EmailOTP from "@/components/auth/EmailOTP"
import { useState } from "react"

const LoginWithMatic = () => {
    const [token,setToken] = useState("")
    return (
        <>
            <div className={`max-w-[100%] grid grid-cols-1 grid-flow-row auto-rows-fr gap-5 p-4 mt-8`}>


                <EmailOTP token={token} setToken={setToken} />

            </div>
        </>
    )
}

export default LoginWithMatic