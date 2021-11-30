import { getMyProfile, getAllAssessments } from "../modules/assessment.controller.js";

const {useState, useEffect} = React;

const Profile = (props) => {
    return(
        <>
        <h1>Profile Page</h1>
        </>
    );
}

class App extends React.Component{
    constructor(props){
        super(props)
    }

    async componentDidMount() {
        if(localStorage.authtoken) {
            const myProfile = await getMyProfile();

            const userId = myProfile.id;

            const assessments = await getAllAssessments(userId);

            console.log(assessments)
        } else {
            console.log('not logged in yet')
        }
    }


    render(){
        return(
            <Profile/>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));