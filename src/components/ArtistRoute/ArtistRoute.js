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
      <img src={artist.profile.images[0].url} />
      <div>{artist.profile.name}</div>
      <div>
        <strong>{artist.profile.followers.total}</strong> followers
      </div>
      <div>Tags</div>
      <div>{artist.profile.genres}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default ArtistRoute;
