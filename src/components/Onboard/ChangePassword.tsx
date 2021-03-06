/**
 * Change Password component
 *
 * Description: form component that upon submission changes the password for the currently authenticated account. This component is available to all users at the route of '/change-password'. The form submission is required upon the first user login
 */
import { changePassword, getUserData } from 'scripts/Datastore';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Input } from 'reactstrap';
import { RootState } from 'store/rootReducer';
import AuthCheck from 'components/Control/AuthCheck';
import { Animated } from 'react-animated-css';

export default function ChangePassword() {
    // the UID for the currently logged in user
    const currentUser = useSelector((state: RootState) => state.auth.userUID);
    const history = useHistory();

    // If no account is logged in the user is redirected to the home page
    if (currentUser === null || currentUser === undefined) {
        // redirect flag redirects the user to the change password page after logging in
        return <AuthCheck />;
    }

    /**
     * handleResetPassword
     * @param event synthetic event
     *
     * verifies the two input fields match before resetting the password
     */
    const handleResetPassword = (event: any) => {
        event.preventDefault(); // prevents default form submission
        const currentPassword = event.currentTarget[0].value;
        const password1 = event.currentTarget[1].value;
        const password2 = event.currentTarget[2].value;
        if (password1 !== password2) {
            alert('passwords must match');
        } else {
            changePassword(currentPassword, password1)?.then(
                () => {
                    getUserData(currentUser as string).then((userData) => {
                        // if the current user is the Owner, they are directed to the register users page, otherwise the dashboard
                        if (userData.userGroup === 'Owner') {
                            history.push('/app/usermanagement');
                        } else {
                            history.push('/app/dashboard');
                        }
                    });
                },
                (error) => {
                    alert(error);
                }
            );
        }
    };

    return (
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
            <div className="h-screen changePassword">
                <div className="card">
                    <h1 className="text-center">Change Your Password</h1>
                    <form onSubmit={handleResetPassword}>
                        <Input
                            required
                            type="password"
                            name="oldPassword"
                            id="oldPassword"
                            placeholder="current password"
                        />
                        <Input
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="new password"
                        />
                        <Input
                            required
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="confirm password"
                        />
                        <Button type="submit" value="Submit">
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </Animated>
    );
}
