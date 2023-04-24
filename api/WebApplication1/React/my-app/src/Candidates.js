import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Candidates extends Component{

        constructor(props){
            super(props);

            this.state ={
                candidates:[],
                skill:[],
                modalTitle:"",
                CandidateId: 0,
                CandidateEmail:"",
                CandidateName:"",
                CandidateBirthday:"",
                CandidatePhone:"",
                SkillName:"",

                CandidateNameFilter:"",
                CandidateSkillFilter:"",
                candidatesWithoutFilter:[]
            }
        }

        FilterFn(){
            var CandidateNameFilter=this.state.CandidateNameFilter;
            var CandidateSkillFilter=this.state.CandidateSkillFilter;

            var filteredData=this.state.candidatesWithoutFilter.filter(
                function(el){
                    return el.CandidateName.toString().toLowerCase().includes(
                        CandidateNameFilter.toString().trim().toLowerCase()
                    )&&
                    el.SkillName.toString().toLowerCase().includes(
                        CandidateSkillFilter.toString().trim().toLowerCase()
                    )
                }
            );

            this.setState({candidates:filteredData});

        }

        changeCandidateNameFilter = (e)=>{
            this.state.CandidateNameFilter=e.target.value;
            this.FilterFn();
        }

        changeCandidateSkillFilter = (e)=>{
            this.state.CandidateSkillFilter=e.target.value;
            this.FilterFn();
        }

        refreshList(){
            fetch(variables.API_URL+'skill')
            .then(response=>response.json())
            .then(data=>{
                this.setState({skill:data});
            });

            fetch(variables.API_URL+'candidates')
            .then(response=>response.json())
            .then(data=>{
                this.setState({candidates:data,candidatesWithoutFilter:data});
            });
        }

        componentDidMount(){
            this.refreshList();
        }

        changeCandidateName =(e)=>{
            this.setState({CandidateName:e.target.value});
        }

        changeCandidateBirthday =(e)=>{
            this.setState({CandidateBirthday:e.target.value});
        }

        changeCandidatePhone =(e)=>{
            this.setState({CandidatePhone:e.target.value});
        }

        changeCandidateEmail =(e)=>{
            this.setState({CandidateEmail:e.target.value});
        }

        changeSkillName =(e)=>{
            this.setState({SkillName:e.target.value});
        }

        addClick(){
            this.setState({
                modalTitle:"Add Candidate",
                CandidateId: 0,
                CandidateEmail:"",
                CandidateName:"",
                CandidateBirthday:"",
                CandidatePhone:"",
                SkillName:""
            });
        }

        editClick(cnd){
            this.setState({
                modalTitle:"Edit Skill",
                CandidateId: cnd.CandidateId,
                SkillName:cnd.SkillName,
                CandidateName:cnd.CandidateName,
                CandidateBirthday:cnd.CandidateBirthday,
                CandidateEmail:cnd.CandidateEmail,
                CandidatePhone:cnd.CandidatePhone
            });
        }

        createClick(){
            fetch(variables.API_URL+'candidates',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    CandidateName:this.state.CandidateName,
                    CandidateBirthday:this.state.CandidateBirthday,
                    CandidateEmail:this.state.CandidateEmail,
                    CandidatePhone:this.state.CandidatePhone,
                    SkillName:this.state.SkillName
                })
            })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
            })
        }

        updateClick(){
            fetch(variables.API_URL+'candidates',{
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    CandidateId:this.state.CandidateId,
                    CandidateName:this.state.CandidateName,
                    CandidateBirthday:this.state.CandidateBirthday,
                    CandidateEmail:this.state.CandidateEmail,
                    CandidatePhone:this.state.CandidatePhone,
                    SkillName:this.state.SkillName
                })
            })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
            })
        }

        deleteClick(id){
            if(window.confirm('Are you sure?')){
            fetch(variables.API_URL+'candidates/'+id,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
            })
            }
        }

        render(){
            const {
                candidates,
                skill,
                modalTitle,
                CandidateId,
                CandidateName,
                CandidateBirthday,
                CandidateEmail,
                CandidatePhone,
                SkillName
            }=this.state;
            
        return( 
   <div>

                <button type="button"
                className="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.addClick()}>
                    Add Candidate
                </button>
                <table className="table table-striped">
                <thead>
                <tr> 
                    <th>
                        Candidate Id
                    </th>

                    <th>
                        Candidate Email
                    </th>

                    <th>
                        <input className="form-control m-2"
                        onChange={this.changeCandidateNameFilter}
                        placeholder="Filter"/>

                        Candidate Name
                    </th>

                    <th>
                        Candidate Birthday
                    </th>

                    <th>
                        Candidate Phone
                    </th>

                    <th>
                        <input className="form-control m-2"
                        onChange={this.changeCandidateSkillFilter}
                        placeholder="Filter"/>

                        Skill Name
                    </th>

                    <th>
                        Options
                    </th>
                </tr>
                </thead>   

                <tbody>
                    {candidates.map(cnd=>
                        <tr key={cnd.CandidateId}>
                            <td>{cnd.CandidateId}</td>
                            <td>{cnd.CandidateEmail}</td>
                            <td>{cnd.CandidateName}</td>
                            <td>{cnd.CandidateBirthday}</td>
                            <td>{cnd.CandidatePhone}</td>
                            <td>{cnd.SkillName}</td>
                            <td>{cnd.Options}</td>
                            <td>
                            <button type="button"
                            className="btn btn-light mr-1"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={()=>this.editClick(cnd)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </button>

                            <button type="button"
                            className="btn btn-light mr-1"
                            onClick={()=>this.deleteClick(cnd.CandidateId)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                </svg>
                            </button>
                            </td>
                        </tr>
                    )}
                </tbody>
                </table>

 <div className= "modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
 <div className= "modal-dialog modal-lg modal-dialog-centered">
 <div className="modal-content">
   <div className="modal-header">
      <h5 className="modal-title">{modalTitle}</h5>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
      ></button>
   </div>

               <div className="modal-body">
                     <div className="input-group mb-3">
                     <span className="input-group-text">Candidate Name</span>
                     <input type="text" className="form-control"
                     value={CandidateName}
                     onChange={this.changeCandidateName}/>
                    </div>

                    <div className="input-group mb-3">
                     <span className="input-group-text">Candidate Birthday</span>
                     <input type="date" className="form-control"
                     value={CandidateBirthday}
                     onChange={this.changeCandidateBirthday}/>
                    </div>

                    <div className="input-group mb-3">
                     <span className="input-group-text">Candidate Email</span>
                     <input type="text" className="form-control"
                     value={CandidateEmail}
                     onChange={this.changeCandidateEmail}/>
                    </div>

                    <div className="input-group mb-3">
                     <span className="input-group-text">Candidate Phone</span>
                     <input type="text" className="form-control"
                     value={CandidatePhone}
                     onChange={this.changeCandidatePhone}/>
                    </div>

                    <div className="input-group mb-3">
                     <span className="input-group-text">Skill Name</span>
                     <select multiplay className="form-control"
                     onChange={this.changeSkillName}
                     value={SkillName}>
                        {skill.map(skl=><option key={skl.SkillId}>
                            {skl.SkillName}
                        </option>)}
                      </select>
                    </div>

                    {CandidateId==0?
                    <button type="button"
                    className="btn btn-primary float-start"
                    onClick={()=>this.createClick()}
                    >Create</button>
                    :null}

                    {CandidateId!=0?
                    <button type="button"
                    className="btn btn-primary float-start"
                    onClick={()=>this.updateClick()}
                    >Update</button>
                    :null}
               </div>
</div>
</div>
</div>

</div>
        )
    }
}