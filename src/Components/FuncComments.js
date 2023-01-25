import React, {useEffect, useState} from "react";
import axios from "axios";
function FuncComments() {
    const [comments,setComments]= useState([]);
    const [data,setData]= useState([]);
    const [currentUser,setCurrentUser]= useState('');
    const [search,setSearch] = useState("");
    const [page,setPage]= useState(1);
    function filter(userId,page) {
        return      data.filter((item,index)=>(item.userId == userId || !userId))
            .filter((item,index)=> index>=(page-1)*10 && index<page*10)
    }
    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/comments").then(res=>{
            setComments(res.data.filter((item,index)=>index>=0 && index <10 ))
            setData(res.data)
        })

    },[])
    function onNext() {
        setPage(prevState => prevState+1)
    }
    function onPrev() {
        setPage(prevState => prevState -1)
    }
    useEffect(()=>{
        const res = filter(currentUser,page)
        setComments(res)
    },[page])
    return(
        <div>
            <div className="row">
                <h3 className="text-center">Comments Search  Pagination</h3>
                <div className="row">
                    <div className="col-md-12">
                        <table border className={"table"}>
                            <thead>
                            <tr>
                                <th>N</th>
                                <th>Name
                                    <br/>
                                    <input type="text" placeholder="Search your name" onChange={(e)=>setSearch(e.target.value)}/></th>
                                <th>Email
                                </th>
                                <th>Body
                                    <br/>
                                    <input type="text" placeholder="Search your body" onChange={(e)=>setSearch(e.target.value)}/></th>
                            </tr>
                            </thead>
                            {comments.filter((item)=>{
                                if(search === ""){return item}
                                else if (item.name.toLowerCase().includes(search.toLowerCase())){return item}
                                else if (item.body.toLowerCase().includes(search.toLowerCase())){return item}
                            }).map((item,index)=>{
                                return(
                                    <tbody key={index}>
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.body}</td>
                                    </tr>
                                    </tbody>
                                )
                            })}
                        </table>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <button className="btn btn-dark" type="button" onClick={onPrev}>
                        {"<<"} prev
                    </button>
                </div>
                <div className="col-md-1">
                    <h2>                    {page}
                    </h2>                </div>
                <div className="col-md-4">
                    <button className="btn btn-dark" type="button" onClick={onNext}>
                        {">>"} next
                    </button>
                </div>
            </div>
        </div>
    )
}
export default FuncComments;
