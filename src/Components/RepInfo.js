import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    margin: 15,
    borderRadius: 10,
  },
  header: {
    fontWeight: "bold",
    fontSize: 70,
  },
  card: {
    margin: 10,
    height: 300,
    width: 375,
  },
}));

const RepInfo = ({ repInfo }) => {
  const classes = useStyles();
  const details = repInfo.details || {};
  const offices = details.offices || [];
  const officials = details.officials || [];
  const error = repInfo.error || "";

  return (
    <div>
      {error.length ? (
        <div id="rep-error">
          There was a problem looking up your representatives. Please make sure
          you entered your address correctly.{" "}
        </div>
      ) : (
        <div id="rep-info">
          <p>Here are your representatives:</p>
          <div id="rep-container">
            {officials.map((official, index) => {
              let office = offices.find((office) => {
                return office.officialIndices.includes(index);
              });
              let twitter;
              official.channels
                ? (twitter = official.channels.find((channel) => {
                    return channel.type === "Twitter";
                  }))
                : (twitter = undefined);

              let senate = office.name === "U.S. Senator";
              let house = office.name === "U.S. Representative";
              let congress = senate || house;
              let chamber;
              if (senate) {
                chamber = "senate";
              } else if (house) {
                chamber = "house";
              }

              return (
                <Card key={official.name} className={classes.card}>
                  {" "}
                  <CardHeader
                    className={classes.header}
                    title={official.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="p">
                      {office.name}
                    </Typography>

                    <Typography variant="h6" component="p">
                      {official.party}
                    </Typography>

                    <Typography variant="h6" component="p">
                      {twitter ? (
                        <a
                          href={`https://twitter.com/${twitter.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            id="twitter"
                            src="https://www.pinclipart.com/picdir/big/74-740310_transparent-background-twitter-logo-clipart.png"
                            alt="twitter logo"
                          />
                          {twitter.id}{" "}
                        </a>
                      ) : (
                        "No Twitter available"
                      )}
                    </Typography>

                    <Typography variant="h6" component="p">
                      {official.emails ? (
                        <a href={`mailto: ${official.emails[0]}`}>
                          <img
                            id="email"
                            src="https://i.pinimg.com/originals/8f/c3/7b/8fc37b74b608a622588fbaa361485f32.png"
                            alt="email logo"
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                          {official.emails[0]}
                        </a>
                      ) : (
                        "No email available"
                      )}
                    </Typography>

                    <Typography variant="h6" component="div">
                      {official.phones ? (
                        <div>
                          <img
                            id="phone"
                            src="https://www.pinclipart.com/picdir/big/129-1293919_small-phone-icon-blue-clipart.png"
                            alt="email logo"
                          />
                          {official.phones[0]}
                        </div>
                      ) : (
                        "No phone number available"
                      )}
                    </Typography>

                    {congress && (
                      <Link to={`/records/${official.name}/${chamber}`}>
                        Click to see recent voting history
                      </Link>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    repInfo: state.repInfo,
  };
};

export default connect(mapStateToProps)(RepInfo);
