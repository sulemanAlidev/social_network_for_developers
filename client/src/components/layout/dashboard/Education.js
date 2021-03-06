import React, { Component } from 'react'
import { connect } from "react-redux";
import Moment from "react-moment";
import {deleteEducation} from '../../../redux/actions/profileActions'






class Education extends Component {


    onhandleDelete=(id)=>{

        this.props.deleteEducation(id);


    }


    render() {
        const education = this.props.education.map(edu => 
            
            <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
                <Moment format="DD-MM-YYYY">{edu.from}</Moment> <b>TO</b>{' '}
                {edu.to === null ? ("Now" ): ( <Moment format="DD-MM-YYYY">{edu.to}</Moment>)  }

            </td>
            <td> 
            <button onClick={ ()=> this.onhandleDelete(edu._id)} className='btn btn-danger' >Delete</button>
            </td>
        </tr>
            
            
            )



        return (
            <div>
            <h4>Education Credentials </h4>

            <table className='table'>

            <thead>
                <tr>
                    <th>School</th>
                    <th>Degree</th>
                    <th>Years</th>
                    <th></th>
                </tr>
                {education}

            </thead>
           
            </table>
            
                
            </div>
        )
    }
}
export default connect(null, {deleteEducation})(Education);