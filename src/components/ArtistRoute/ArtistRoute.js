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
  const artist = useSelector((state) => state.artists.currentArtist);
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

  if (artistStatus.status === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <Wrapper>
      <div>Artist: {artist.profile.name}</div>
      <img src={artist.profile.image[0].url} />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default ArtistRoute;
