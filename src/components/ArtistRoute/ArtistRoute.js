import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import {
  requestArtistProfile,
  receiveArtistProfile,
  requestArtistProfileError,
} from "../../actions";

const ArtistRoute = () => {
  const accessToken = useSelector((state) => state.auth.token);
  console.log(accessToken);
  const currentArtist = useSelector((state) => state.artists);
  const { id } = useParams();

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!accessToken) {
      return;
    }
    dispatch(requestArtistProfile());

    fetchArtistProfile(accessToken, id).then((json) =>
      dispatch(receiveArtistProfile(json))
    );
  }, [accessToken, id]);

  if (currentArtist.status === "loading") {
    return <h1>Loading...</h1>;
  }

  return accessToken;
};

export default ArtistRoute;
