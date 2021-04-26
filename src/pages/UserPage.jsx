import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const UserPage = () => {
  const { loggedInUser } = useContext(UserContext);

  let welcomeMessage = 'Inte inloggad';
  if (loggedInUser) {
    welcomeMessage = 
      <div>
        Inloggad som: { loggedInUser.firstName }
      </div>
  }
  return ( 
    <div>
      { welcomeMessage }
    </div>
   );
}
 
export default UserPage;