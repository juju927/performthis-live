import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import pfp from "../images/pfp.jpg";

const ProfileCard = () => {
  const [name, setName] = useState("Joanna Banana");
  const [username, setUsername] = useState("jojobu");
  const [description, setDescription] = useState(
    "weeee i like chocolate and sleeping and doing this and that and that and this and many many things and WA"
  );

  const socialLinks = [
    { link: "https://twitter.com/ShouldHaveCat" },
    { link: "https://www.youtube.com/channel/UCekRiBgmEaCx77PKtoVH2bw" },
    { link: "https://www.twitch.tv/epulzegaming" },
  ];

  const addDomain = () => {
    socialLinks.map((socialLink) => {
      var domain = new URL(socialLink.link);
      domain = domain.hostname;
      domain = domain.replace("www.", "");
      domain = domain.replace(/[^.]*$/, "");
      domain = domain.replace(".", "");
      socialLink.domain = domain;
    });
    console.log(socialLinks);
  };

  useEffect(() => {
    addDomain();
  }, []);

  return (
    <div className="w-80 text-white rounded-lg bg-indigo-950 border border-solid border-1 border-zinc-800">
      <div className="flex flex-col items-center pt-6 pb-10">
        {/* profile header */}
        <div className="flex flex-col items-center py-3">
          <div className="avatar">
            <div className="w-24 mb-1 rounded-full ring ring-secondary ring-2 ring-offset-base-100 ring-offset-4">
              <img src={pfp} />
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
          <button onClick={addDomain}>a</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
