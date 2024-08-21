import React from "react"

export default function Button({props}: any)
{
    return <button className="text-white size-100 bg-slate-600 rounded-md h-11 w-20 cursor-pointer hover:bg-green-500 transition ease-in-out hover:drop-shadow ">{props}</button>
}