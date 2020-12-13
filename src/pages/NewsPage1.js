import React, {useCallback, useContext, useEffect, useState} from 'react'
import NewsCard from "../components/NewsCard";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import API from "../networking/api";
import Cookies from 'js-cookie';
import {ToastContext} from "../contexts/ToastContext";
import TextField from "@material-ui/core/TextField";
import { debounce, throttle } from 'lodash';
import {makeStyles} from "@material-ui/core/styles";



const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
    },
    form: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column'
    },
    submit: {
        display: 'flex',
        margin: theme.spacing(3, 0, 2),
    }

}));

export default function NewsPage1(){
    let history = useHistory();
    const classes = useStyles();

    const {addConfig} = useContext(ToastContext);
    const [news, setNews] = useState([]);

    const [loading, setLoading] = useState(true);
    const [searchConfig, setSearchConfig] = useState({
        keyword: '',
        dateStart: '2017-05-24',
        dateEnd: '2021-05-24'
    });


    const handleChange = (text) => {
        setSearchConfig({
            ...searchConfig,
            keyword: text
        });
    };

    const debouncedKeyword = useCallback(
        debounce((newKeyword) => {
            console.log(newKeyword);
            getNews(newKeyword)
        }, 500),
        [],
    );

    useEffect(()=>{
        getNews();
    },[])


    useEffect(()=>{
        getNews();
    },[searchConfig.dateEnd, searchConfig.dateStart]);




    function getNews(keyword){
        let title = keyword ? keyword : searchConfig.keyword;
        API.News.getNews(`?title=${title}&insertion_date_from=${searchConfig.dateStart}&insertion_date_to=${searchConfig.dateEnd}`).then(response=>{
            setNews(response)
        }).catch(err=>{

        })
    }

    function manageUpvote(id, upvoted){
        const currentNew = news.find(row => row.id === id);
        API.News.upvoteNew({id: currentNew.id, fk_userId: currentNew.fk_userId}).then(response=>{

        }).catch(err=>{
            addConfig(false, "Klaida!")
        });

        setNews(old=>{
            return old.map(row=>{
                if(row.id === id){
                    row.upvotesCount = upvoted ? row.upvotesCount - 1 : row.upvotesCount + 1;
                    row.upvoted = !row.upvoted;
                }
                return row;
            })
        })
    }

    function renderNews() {
        return news.map(row=>{
            const {title, content, insertion_date, id, upvotesCount, upvoted} = row;
            return (
                <NewsCard
                    upvotesCount={upvotesCount}
                    upvoted={upvoted}
                    id={id}
                    title={title}
                    content={content}
                    date={insertion_date}
                    onLike={manageUpvote}
                    onEdit={(id)=>{
                        history.push(`/app/news/${id}`)
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

            <div className={classes.submit}>
                <TextField id="standard-basic" label="Ieškoti naujienų" onChange={event=>{
                    handleChange(event.target.value)
                    debouncedKeyword(event.target.value);
                }} />

                <div>
                <TextField
                    style={{marginLeft: 16}}
                    id="date"
                    label="Nuo"
                    type="date"
                    defaultValue={searchConfig.dateStart}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={event=>{
                        setSearchConfig({
                            ...searchConfig,
                            dateStart: event.target.value
                        })
                    }}
                />

                <TextField
                    style={{marginLeft: 16}}
                    id="date"
                    label="Iki"
                    type="date"
                    defaultValue={searchConfig.dateEnd}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={event=>{
                        setSearchConfig({
                            ...searchConfig,
                            dateEnd: event.target.value
                        })
                    }}
                />
                </div>

            </div>

            <div style={{marginTop: 32}}>
                {renderNews()}
            </div>
        </div>
    )
}