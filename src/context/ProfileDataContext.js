// 98 index.js
// 97

// In this challenge, we’ll create the Context.Provider for our profileData so that it is more accessible throughout the app.

// At the moment each of the PopularProfiles components makes its own API request, and contains its own version of the profiles state. Given that we need to access profile data in several places around our application, it would make sense for all our profile data to be in sync across all the components that need to access it. So in order to have one source of truth for our profile data state, we should move it into a context provider.

import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "../context/CurrentUserContext";
import { axiosReq } from "../api/axiosDefaults";


export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({
        // we will use the pageProfile later!
        pageProfile: { results: [] },
        // We’ll pass the useState hook an  object that has a popularProfiles attribute.
        // We’ll set popularProfiles to an object  with an empty results array inside.
        popularProfiles: { results: [] },
      });
    
      //   Now we have our profileData object defined,
      // we’ll need to destructure the  popularProfiles attribute from it.
    //   We won’t use the destructured popularProfiles because, eventually, we’ll pass the entire profileData object as the value prop in the ProfileDataContext.Provider. But we’ll need the useState and useEffect hooks here, so that the data is fetched on mount.
    //   const { popularProfiles } = profileData; dont need
      const currentUser = useCurrentUser();
    
      useEffect(() => {
        const handleMount = async () => {
          try {
            // As you can see here, we’re fetching them in the  descending order of how many followers they have,
            // so the most followed profile will be at the top
            const { data } = await axiosReq.get(
              "/profiles/?ordering=-followers_count"
            );
            setProfileData((prevState) => ({
              // Inside, we’ll spread the previous  state, which you’ll remember
              // will eventually include the pageProfile  data as well as our popularProfiles.
              ...prevState,
              popularProfiles: data,
            }));
          } catch (err) {
            console.log(err);
          }
        };
    
        handleMount();
      }, [currentUser]);

      return (
        <ProfileDataContext.Provider value={profileData}>
          <SetProfileDataContext.Provider value={setProfileData}>
            {children}
          </SetProfileDataContext.Provider>
        </ProfileDataContext.Provider>
      );
}