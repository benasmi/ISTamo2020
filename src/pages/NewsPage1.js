import React, {useEffect, useState} from 'react'
import NewsCard from "../components/NewsCard";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import API from "../networking/api";
import Cookies from 'js-cookie';

export default function NewsPage1(){
    let history = useHistory();

    const [news, setNews] = useState([]);

    useEffect(()=>{
        API.News.getNews().then(response=>{
            setNews(response)
        }).catch(err=>{

        })
    },[])


    function renderNews() {
        return news.map(row=>{
            const {title, content, insertion_date} = row;
            return (
                <NewsCard
                    title={title}
                    content={content}
                    date={insertion_date}
                    onLike={()=>{
                        alert("Vartotojas paspaudė patinka")
                    }}
                    onEdit={(id)=>{
                        history.push(`/app/news/${1}`)
                    }}
                />
            )
        })

    }

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
                {renderNews()}
            </div>
        </div>
    )
}