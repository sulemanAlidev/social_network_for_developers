import React, { Component } from 'react';
import { connect } from "react-redux";
import TextfieldGroup from '../common/TextfieldGroup';


 class CreateProfile extends Component {
     constructor(props){
         super(props);
        this.state={
            displaySocialInputs:false,
            handle:'',
            company:'',
            website:'',
            location:'',
            status:'',
            skills:'',
            githubusername:'',
            bio:'',
            twitter:'',
            facebook:'',
            linkedin:'',
            instagram:'',
            youtube:'',
            errors:{}


        }
         
     }
    render() {
        return (
            <div className='create-profile'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 m-auto'>
                        <h1 className='display-4 text-center '>Create Your Profile</h1>
                         <p className='lead text-center '>
                          Let's get some information to make your profile stand out</p>
                         <smal className='d-block pb-3'> * = required fields </smal>
                         </div>
                    </div>
                </div>
            </div>
        )
    }
}
const  mapStateToProps = (state)=>({
    errors:state.errors,
    profile:state.profile
})
export default connect(mapStateToProps) (CreateProfile);