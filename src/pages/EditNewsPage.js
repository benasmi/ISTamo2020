import React from 'react'
import {useParams} from "react-router";


export default function EditNewsPage(){
    let { id } = useParams();
    return (
        <div>
            Redaguojama naujiena {id}
        </div>
    )
}