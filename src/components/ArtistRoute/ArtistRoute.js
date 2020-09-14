import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import {
  requestArtistProfile,
  receiveArtistProfile,
  requestArtistProfileError,
} from "../../actions";
import styled from "styled-components";

const ArtistRoute = () => {
  const accessToken = useSelector((state) => state.auth.token);
  console.log(accessToken); //null and then loads
  const artist = useSelector((state) => state.artists.currentArtist);
  console.log(artist); //null and then loads
  const artistStatus = useSelector((state) => state.artists.status);

  const { id } = useParams();

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!accessToken) {
      return;
    }
    try {
      dispatch(requestArtistProfile());
      fetchArtistProfile(accessToken, id).then((json) =>
        dispatch(receiveArtistProfile(json))
      );
    } catch (error) {
      console.log(error);
      dispatch(requestArtistProfileError());
    }
  }, [accessToken, id]);

  if (artistStatus === "loading" || !artist) {
    return <h1>Loading...</h1>;
  }

  return (
    <Wrapper>
      {/* <div>{accessToken}</div> */}
      <Pic src={artist.profile.images[0].url}></Pic>
      <Name>{artist.profile.name}</Name>
      <Followers>
        {artist.profile.followers.total}
        <span> followers</span>
      </Followers>
      <TagTitle>Tags</TagTitle>
      <Tag>
        <TagList>
          {artist.profile.genres.slice(0, 2).map((genre) => (
            <TagItem>{genre}</TagItem>
          ))}
        </TagList>
      </Tag>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 375px;
  height: 812px;

  /* Charcoal */

  background: #0b0f14;
`;

const Pic = styled.img`
  position: absolute;
  width: 175px;
  height: 175px;
  left: 104px;
  top: 59px;
  border-radius: 190.5px;
`;

const Name = styled.div`
  position: absolute;
  width: 268px;
  height: 59px;
  left: 54px;
  top: 173px;
  background: transparent;

  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 59px;
  color: #ffffff;
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75), 0px 4px 4px rgba(0, 0, 0, 0.5),
    4px 8px 25px #000000;
`;

const Followers = styled.div`
  position: absolute;
  width: 93px;
  height: 17px;
  left: 141px;
  top: 257px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  text-transform: lowercase;

  color: #ff4fd8;
`;

const Tag = styled.div`
  position: absolute;
  width: 253px;
  height: 79px;
  left: 61px;
  top: 478px;
`;

const TagTitle = styled.div`
  position: absolute;
  width: 48px;
  height: 26px;
  left: 155px;
  top: 400px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 26px;
  /* identical to box height */

  text-transform: lowercase;

  /* White */

  color: #ffffff;
`;
const TagList = styled.div`
  display: flex;
`;

const TagItem = styled.div`
  /* GrayFade */

  background: rgba(75, 75, 75, 0.4);
  border-radius: 4px;
  padding: 10px;
  margin: 15px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 13px;
  text-transform: lowercase;
`;

export default ArtistRoute;
