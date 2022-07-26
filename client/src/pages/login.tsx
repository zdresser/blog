import firebase from "firebase";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import CenterPiece from "../components/CenterPiece";
import ErrorText from "../components/ErrorText";
import LoadingComponent from "../components/LoadingComponent";
import { Providers } from "../config/firebase";
import logging from "../config/logging";
import UserContext from "../contexts/user";
import IPageProps from "../interfaces/page";
import { signInWithSocialMedia as SocialMediaPopup } from "../modules/auth";

const Login: React.FC<IPageProps> = (props) => {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const userContext = useContext(UserContext);
  const history = useHistory();
  const isLogin = window.location.pathname.includes("login");

  const SignInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
    if (error !== "") setError("");
    setAuthenticating(true);
    SocialMediaPopup(provider).then(async (result) => {
      logging.info(result);
      let user = result.user;
      if (user) {
        let uid = user.uid;
        let name = user.displayName;
        if (name) {
          try {
            let fire_token = await user.getIdToken();
            /**if we get a token, auth with backend */
          } catch (error) {
            setError("Invalid token");
            logging.error(error);
            setAuthenticating(false);
          }
        } else {
          /**
           * We can set these manually with a new form
           * For example, the Twitter provider sometimes
           * does not provide a username as some users sign
           * up with a phone number.  Here you could ask
           * them to provide a name that would be displayed
           * on this website.
           * */
          setError("The identify provider did not include a display name.");
          setAuthenticating(false);
        }
      } else {
        setError(
          "The social media provider does not have enough information. Please try a different provider."
        );
        setAuthenticating(false);
      }
    });
  };
  return (
    <CenterPiece>
      <Card>
        <CardHeader>{isLogin ? "Login" : "Sign Up"}</CardHeader>
        <CardBody>
          <ErrorText error={error} />
          <Button
            block
            disabled={authenticating}
            onClick={() => SignInWithSocialMedia(Providers.google)}
            style={{
              backgroundColor: "#ea4335",
              borderColor: "#ea4335",
            }}>
            <i className='fab fa-google mr-2'></i> Sign {isLogin ? "in" : "up"}{" "}
            with Google
          </Button>
          {authenticating && <LoadingComponent card={false} />}
        </CardBody>
      </Card>
    </CenterPiece>
  );
};

export default Login;
