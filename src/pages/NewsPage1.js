import React from 'react'
import NewsCard from "../components/NewsCard";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';

export default function NewsPage1(){
    let history = useHistory();
    return (
        <div>
            <div>
                <Typography variant={'h3'}>
                    Naujienos
                </Typography>
                <Button
                    startIcon={<AddIcon/>}
                    color='primary'
                    onClick={()=>{
                    history.push('/app/news/create')
                }}>
                    Sukurti naujieną
                </Button>



            </div>

            <div style={{marginTop: 32}}>
                <NewsCard
                    onLike={()=>{
                        alert("Vartotojas paspaudė patinka")
                    }}
                    onEdit={(id)=>{
                        history.push(`/app/news/${1}`)
                    }}
                />
            </div>
        </div>
    )
}