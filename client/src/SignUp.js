import React from 'react';
import {Link} from "react-router-dom";
import "./views/signup.css";
import GroupInfo from './GroupInfo';




function SignUp(props) {
    




// export default class SignUp extends Component {
//     constructor(props) {
//         super(props);
//         this.initialState = {
//             inputs: {
//                 traveler_name: "",
//                 username: "",
//                 email: "",
//                 password: "",
                

//             }
//         }
//         this.state = this.initialState;
//         this.handleSubmit= this.handleSubmit.bind('this');
//         this.handleChange = this.handleChange.bind('this');
    
//   const handleChange = (e) => {
//      this.setState ({
//          inputs: e.target.value
//      })
//      const handleSubmit = (e) => {
//          e.preventDefault();
//          this.props.signup(this.state.inputs);

     
    // }}
    // }
        // render(props) {
        //     // const { signup, handleChange, handleSubmit}= this.props;  
        //     <div>
        //         <GroupInfo/>
        //     </div>
            return (
                 
                <div>
                    
                        <div class="background-signup-page">

                            <img src="http://collaborate.netlify.com/assets/travel.gif" alt="travel site" />
                            <div class="signup-container">
                                <form  id="sign-up-form">
                                    <div class="signup-header">
                                        <h1 className="signup-h1">Sign Up for Free</h1>
                                    </div>
                                    <input class="traveler-name" type="text" name="traveler-name" placeholder="Name*" required="" />
                                    <input class="username-selection-input" name="traveler-username" type="text" placeholder="User Name*" required="" />
                                    <input type="text" name="email" placeholder="Email Address*" required="" />
                                    <input type="text" name="signup-password" placeholder="Set a password*" required="" />
                                    <Link to="/groupinfo" id="signup-btn">  <button type="submit" class="sign-up-button">Get Started</button></Link>
                                </form>
                            </div>
                        </div>
                  
                </div>

            )
        }
        export default SignUp