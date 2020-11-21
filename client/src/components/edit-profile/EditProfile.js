import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import TextfieldGroup from '../../components/layout/common/TextfieldGroup';
import TextAreaFieldGroup from '../../components/layout/common/TextAreaFieldGroup';
import SelectListGroup from '../../components/layout/common/SelectListGroup';
import InputGroup from '../../components/layout/common/InputGroup';
import {createProfile, getCurrentProfile} from '../../redux/actions/profileActions';
import isEmpty from '../../validation/is-empty';


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
     componentDidMount(){
         this.props.getCurrentProfile();

     }
     static getDerivedStateFromProps(nextProps){

        if(!nextProps.errors){

            return{
                errors:nextProps.errors
            }
        }

        if(nextProps.profile.profile){
            const profile =nextProps.profile.profile;
            // brings skills array to comma separated value 

            const skillsCSV = profile.skills.join(',');
            // if profilr field does noot exist , make empty strings 
            profile.company = !isEmpty(profile.company) ? profile.company : ''; 
            profile.website = !isEmpty(profile.website) ? profile.website : ''; 
            profile.location = !isEmpty(profile.location) ? profile.location : ''; 
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : ''; 
            profile.bio = !isEmpty(profile.bio) ? profile.bio : ''; 

            profile.social = !isEmpty(profile.social) ? profile.social : {};

            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : 
            '';
            // set component field state 
            
            return{
               
                handle: nextProps.profile.profile.handle,
                company:profile.company,
                website:profile.website,
                location:profile.location,
                status:profile.status,
                skills:skillsCSV, 
                githubusername:profile.githubusername,
                bio:profile.bio,
                twitter:profile.twitter,
                facebook:profile.facebook,
                linkedin:profile.linkedin,
                instagram:profile.instagram,
                youtube:profile.youtube,
            }}
     } 
     onSubmit =(e)=>{
         e.preventDefault();
        const profileData ={
            handle:this.state.handle,
            company:this.state.company,
            website:this.state.website,
            location:this.state.location,
            status:this.state.status,
            skills:this.state.skills,
            githubusername:this.state.githubusername,
            bio:this.state.bio,
            twitter:this.state.twitter,
            facebook:this.state.facebook,
            linkedin:this.state.linkedin,
            instagram:this.state.instagram,
            youtube:this.state.youtube,

        }
        this.props.createProfile(profileData,this.props.history)
     }
     onChange= (e)=>{
        this.setState({[e.target.name]:e.target.value })
     }
    render() {
        const {errors,displaySocialInputs} =this.state;
      
        let socialInputs;
        if(displaySocialInputs){
            socialInputs=(
                <div>
                    <InputGroup 
                        placeholder='Twitter  profile URL'
                        name='twitter'
                        icon='fab fa-twitter'
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />
                    <InputGroup 
                        placeholder='Twitter  profile URL'
                        name='twitter'
                        icon='fab fa-twitter'
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />
                    <InputGroup 
                        placeholder='Facebook Page URL'
                        name='facebook'
                        icon='fab fa-facebook'
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                    <InputGroup 
                        placeholder='LinkedIn  profile URL'
                        name='linkedin'
                        icon='fab fa-linkedin'
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />
                    <InputGroup 
                        placeholder='Youtube channel URL'
                        name='youtube'
                        icon='fab fa-youtube'
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />
                     <InputGroup 
                        placeholder='Instagram Page URL'
                        name='instagram'
                        icon='fab fa-instagram'
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                </div>
            )
        }else{

        }
        //select options for status 
        const options =[
            {label: '* Select Professional Status',value:0 },
            {label: 'Developer ', value:"Developer" },
            {label: 'Junior Developer ', value:"Junior Developer" },
            {label: 'Senior Developer ', value:"Senior Developer" },
            {label: 'Manager ', value:"Manager" },
            {label: 'Student or Learning ', value:"Student or Learning" },
            {label: 'Instructor or teacher  ', value:"Instructor or teacher " },
            {label: 'Intern ', value:"Intern" },
            {label: 'Other ', value:"Other" },

        ];
        return (
            <div className='create-profile'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 m-auto'>
                        <h1 className='display-4 text-center '>Edit your Profile</h1>
                        
                         <small className='d-block pb-3'> * = required fields </small>
                         <form onSubmit={this.onSubmit}>
                             <TextfieldGroup 
                                 placeholder = '* Profile Handle'
                                 name="handle"
                                 value={this.state.handle}
                                 onChange={this.onChange}
                                 error ={errors.handle}
                                 info="A Unique handle for your profile URL. It can be your full name,
                                 nick name "
                             />
                              <SelectListGroup 
                                 placeholder = 'Status'
                                 name="status"
                                 value={this.state.status}
                                 onChange={this.onChange}
                                 options={options}
                                 error ={errors.status}
                                 info="Give us an idea of where you are at in your career"
                             />
                              <TextfieldGroup 
                                 placeholder = 'Company'
                                 name="company"
                                 value={this.state.company}
                                 onChange={this.onChange}
                                 error ={errors.company}
                                 info="Could be your own company or one you work for"
                             />
                              <TextfieldGroup 
                                 placeholder = 'Website'
                                 name="website"
                                 value={this.state.website}
                                 onChange={this.onChange}
                                 error ={errors.website}
                                 info="Could be your own website or a company one  "
                             />
                              <TextfieldGroup 
                                 placeholder = 'Location'
                                 name="location"
                                 value={this.state.location}
                                 onChange={this.onChange}
                                 error ={errors.location}
                                 info="City or city and state suggested (eg. Lahore,Pakistan)"
                             />
                             <TextfieldGroup 
                                 placeholder = '* Skills'
                                 name="skills"
                                 value={this.state.skills}
                                 onChange={this.onChange}
                                 error ={errors.skills}
                                 info="Please use comma separated values (eg. html,css,bootstrap)"
                             />
                              <TextfieldGroup 
                                 placeholder = 'Github Username'
                                 name="githubusername"
                                 value={this.state.githubusername}
                                 onChange={this.onChange}
                                 error ={errors.githubusername}
                                 info="If you want your latest repos and Githyb Links "
                             />
                             <TextAreaFieldGroup 
                                 placeholder = 'Short Bio'
                                 name="bio"
                                 value={this.state.bio}
                                 onChange={this.onChange}
                                 error ={errors.bio}
                                 info="Tell us littel about yourself  "
                             />
                             <div className='mb-3'>
                                 <button 
                                 type='button'
                                 onClick ={()=>{
                                     this.setState(prevState => ({
                                         displaySocialInputs: !prevState.displaySocialInputs
                                     }))
                                 }} className='btn btn-light'>Add Social Network Links</button>
                                 <span className='text-muted'>Optional</span>
                             </div>
                             {socialInputs}
                             <input type='submit' value='submit' className='btn btn-info btn-block mt-4'></input>
                         </form>
                         </div>
                    </div>
                </div>
            </div>
        )
    }
}
const  mapStateToProps = (state)=>({
    profile:state.profile,
    errors:state.errors
})
export default connect(mapStateToProps,{createProfile,getCurrentProfile}) (withRouter(CreateProfile));