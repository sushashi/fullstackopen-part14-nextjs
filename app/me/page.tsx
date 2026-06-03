import { redirect } from "next/navigation";
import { getCurrentUser } from "../services/session";
import { getReadingListByUser } from "../services/users";
import ReadingList from "./ReadingList";
import API from "./API";
import MyProfile from "./MyProfile";

const Me = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/login");

  const readingList = await getReadingListByUser(currentUser.username);

  return (
    <div>
      <h2>Me Page</h2>
      <MyProfile currentUser={currentUser} />
      <ReadingList readingList={readingList} />
      <API currentUser={currentUser} />
    </div>
  );
};

export default Me;