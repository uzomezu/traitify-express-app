import { getMyProfile, getAllAssessments } from "../modules/assessment.controller.js";

const {useState, useEffect} = React;

const Profile = (props) => {

    console.log(props.userData);
    return(
        <>
        <div>
            <h1>Welcome Back, {props.userData.username}!</h1>
        </div>
        </>
    );
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            me: {}
        }
    }

    async componentDidMount() {
        if(localStorage.authtoken) {
            const myProfile = await getMyProfile();
            this.setState({
                me: myProfile
            })
            const userId = myProfile.id;

            const assessments = await getAllAssessments(userId);

            console.log(assessments)
        } else {
            console.log('not logged in yet')
        }
    }


    render(){
        return(
            <Profile userData={this.state.me}/>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));