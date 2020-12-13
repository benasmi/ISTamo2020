import React, {useEffect, useState} from 'react'
import API from "../networking/api";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";

export default function RatingsPage(){


    const [user, setUser] = useState({name: '', surname: ''});
    const [others, setOthers] = useState({mine: '', averages: []});

    useEffect(()=>{
        API.Users.getMe().then(response=>{
            setUser(response)
        }).catch(err=>{

        });

        API.Marks.getRatings().then(ratings=>{
            ratings.averages.sort((a,b) => (parseFloat(a.average) < parseFloat(b.average))? 1 : -1);
            setOthers(ratings);
        }).catch(err=>{

        })


    },[])

    return (
        <div>
            <Typography variant='h3'>
                Reitingai
            </Typography>
            <div style={{marginTop: 32}}>
                <Typography variant='h5'>
                    {user.name} {user.surname} vidurkis - {others.mine}
                </Typography>
            </div>
            <div style={{marginTop: 64}}>
                <Typography variant='h5'>
                    Visi mokiniai
                </Typography>
            </div>
            <div style={{display:'flex', flexDirection: 'column', marginTop: 8}}>
                {
                    others.averages.map((row, idx)=>{
                        return <div >
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
                                {row.id===user.id ? <Avatar>{idx+1}</Avatar> : <Avatar>{idx+1}</Avatar>}
                            <Typography style={{marginLeft: 8, fontSize: row.id === user.id ? 24 : 16}}><b>{row.id === user.id ? `${user.name}  ${user.surname}` : 'Anonimas'}</b></Typography>
                                <Typography style={{marginLeft: 16, fontSize: row.id === user.id ? 24 : 16}}><b>{parseFloat(row.average).toPrecision(3)}</b></Typography>
                            </div>
                            <Divider style={{marginTop: 6, marginBottom: 6}}/>
                        </div>

                    })
                }
            </div>
        </div>
    )
}