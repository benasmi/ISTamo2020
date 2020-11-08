import React from 'react'
import NewsCard from "../components/NewsCard";
import Typography from "@material-ui/core/Typography";


export default function NewsPage1(){
    return (
        <div>
            <div>
                <Typography variant={'h3'}>
                    Naujienos
                </Typography>
            </div>

            <div style={{marginTop: 32}}>
                <NewsCard onLike={()=>{
                    alert("Vartotojas paspaudė patinka")
                }} />
            </div>
        </div>
    )
}