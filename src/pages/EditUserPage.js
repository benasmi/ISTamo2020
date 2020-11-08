import React, {useState} from 'react'
import {useParams} from "react-router";


export default function EditUserPage(){
    let { id } = useParams();

    return (
        <div>
           Vartotojo {id} peržiūros ir redagavimo langas
        </div>
    );
}