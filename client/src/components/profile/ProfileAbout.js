import React, { Component } from 'react'
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {



    render() {
        const {profile } =this.props;
    // get first name
    const firstname = profile.user.name.trim().split(' ')[0];
    //get skills
    const skills = profile.skills.map((skill,index) =>(
        <div key={index} className='p-3'>
        <i fa fa-check /> {skill}
         </div>
    ) )

        return (
            <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-light mb-3">
                <h3 className="text-center text-info">{firstname}'s Bio</h3>
                <p className="lead">{isEmpty(profile.bio) ? <span> {firstname} does not have a bio</span> : (
                    <span> {profile.bio}</span>
                )}
                </p>
                <hr />
                <h3 className="text-center text-info">Skill Set</h3>
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {skills}
                  </div>
                </div>
              </div>
            </div>
          </div>

        )
    }
}
export default ProfileAbout;