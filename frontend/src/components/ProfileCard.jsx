import React, { useEffect, useState, useContext } from "react";
import jwt_decode from "jwt-decode"

import { fetchData } from "../../helpers/common";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import UserContext from '../context/user'

const ProfileCard = () => {
  const userDetails = useContext(UserContext)
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');

    const getUserProfiles = async (user_id) => {
      const { ok, data } = await fetchData('user-profiles/user/', userDetails.toucan, "POST", {
        user_id: user_id
      })

      if (ok) {
        setName(data.display_name)
        setDescription(data.description)
      } else {
        console.log(data)
      }
    }

  // please don't scold me
  // i will work on this someday
  // really
  // just not now

  // const socialLinks = [
  //   { link: "https://twitter.com/ShouldHaveCat" },
  //   { link: "https://www.youtube.com/channel/UCekRiBgmEaCx77PKtoVH2bw" },
  //   { link: "https://www.twitch.tv/epulzegaming" },
  // ];

  // const addDomain = () => {
  //   socialLinks.map((socialLink) => {
  //     var domain = new URL(socialLink.link);
  //     domain = domain.hostname;
  //     domain = domain.replace("www.", "");
  //     domain = domain.replace(/[^.]*$/, "");
  //     domain = domain.replace(".", "");
  //     socialLink.domain = domain;
  //   });
  //   console.log(socialLinks);
  // };

  // useEffect(() => {
  //   addDomain();
  // }, []);

    useEffect(()=> {
      if (userDetails.toucan) {
        const decodedUserDetails = jwt_decode(userDetails.toucan)
        setUsername(decodedUserDetails.username)
        getUserProfiles(decodedUserDetails.id)
      }
    }, [userDetails.toucan])

  return (
    <div className="w-80 text-white rounded-lg bg-indigo-950 border border-solid border-1 border-zinc-800">
      <div className="flex flex-col items-center pt-6 pb-10">
        {/* profile header */}
        <div className="flex flex-col items-center py-3">
          <div className="avatar placeholder">
            <div className="w-24 mb-1 rounded-full ring ring-secondary ring-2 ring-offset-base-100 ring-offset-4">
              <span className="text-3xl uppercase">{username.charAt(0)}</span>
            </div>
          </div>
          <h5 className="mb-1 text-xl font-medium text-base-content">
            {name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{`@${username}`}</span>
        </div>

        {/* profile description */}
        <div className="px-6 py-2 m-0 h-fit text-sm font-thin text-center">
          {description}
        </div>

        {/* social media links */}
        <div className="flex items-center justify-between">
          {/* { socialLinks.map((link)=> {
            return (
              <a href={link.link}><FontAwesomeIcon icon={icon({name: 'twitter', style: 'brands'})} /></a>
            )
          })} */}
          {/* <button onClick={addDomain}>a</button> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
