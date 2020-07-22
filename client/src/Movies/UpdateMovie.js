import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import axios from 'axios'


const initialItem = {
    id:"",
    title:"",
    director:"",
    metascore:"",
    stars:""
}

const UpdateMovie = (props) => {

    const location = useLocation();
    const params = useParams()
    const { push } = useHistory();
    const [item, setItem] = useState(initialItem)

    useEffect(() => {
        if (location.state){
            setItem(location.state)
        }else{
            axios.get(`http://localhost:5000/api/movies/${params.id}`)
                .then(res =>{
                    console.log("updateMovie GET request ",res)
                    setItem(res.data)
                 })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [])

    const changeHandler = e =>{
        e.persist();
        let value = e.target.value;

        setItem({
            ...item,
            [e.target.name]: value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${item.id}`, item)
            .then(res => {
                console.log('handlesubmit',res)
                // const newMovieArr = props.movieList.filter(v => v.id !== item.id)
                const newMovieArr = props.movieList
                props.setMovieList(newMovieArr);
                alert("Movie Updated!")
                push(`/movies/${item.id}`)
            })
            .catch(err => {
                console.log(err)
            })
    }



    return(
        <div>
            <h2>Update Movie</h2>
            <form>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value={item.title}
                />
                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={item.director}
                />
                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value={item.metascore}
                />
                <button onClick={handleSubmit}>Update</button>
            </form>
        </div>
    )
} 

export default UpdateMovie