import { getCurrentUser } from "../services/session";

type User = Awaited<ReturnType<typeof getCurrentUser>>

const MyProfile = ( { currentUser }: { currentUser: User }) => {
  if (!currentUser) return null;
  return (
    <div data-testid="user-profile" className="border rounded border-blue-100 shadow hover:bg-blue-50/50 p-3 my-2">
      <h3>My Profile</h3>
      <p data-testid="user-name" className="m-2"><span className="text-gray-700 text-sm font-bold mb-1">Name: </span>{currentUser.name}</p>
      <p data-testid="user-username" className="m-2"><span className="text-gray-700 text-sm font-bold mb-1">Username: </span> {currentUser.username}</p>
    </div>
  );
};

export default MyProfile;