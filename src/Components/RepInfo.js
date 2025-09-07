import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";

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

  media: {
    paddingTop: "1%",
    height: 100,
    width: 100,
    alignContent: "center",
  },
  card: {
    margin: 10,
    height: 300,
    width: 300,
    borderRadius: 10,
  },
}));

const RepInfo = ({ repInfo }) => {
  const classes = useStyles();
  const officials = repInfo?.details || [];
  const error = repInfo?.error || "";

  return (
    <div>
      {error.length ? (
        <div id="rep-error">
          There was a problem looking up your representatives. Please make sure
          you entered your address correctly.{" "}
        </div>
      ) : !officials || officials.length === 0 ? (
        <div id="loading">
          Please enter an address to find your representatives.
        </div>
      ) : (
        <div id="rep-info">
          <p>Here are your representatives:</p>
          <div id="rep-container">
            {officials.map((official, index) => {
              const name = official.first_name + " " + official.last_name;
              const twitter =
                official.identifiers &&
                official.identifiers.find(
                  (id) => id.identifier_type === "TWITTER"
                );

              return (
                <Card key={name} elevation={10} className={classes.card}>
                  {" "}
                  <CardHeader className={classes.header} title={name} />
                  <CardContent>
                    <Typography variant="h6" component="p">
                      {official.office.title}
                    </Typography>

                    <Typography variant="h6" component="p">
                      {official.party}
                    </Typography>

                    <Typography variant="h6" component="p">
                      {twitter ? (
                        <a
                          href={`https://twitter.com/${twitter.identifier_value}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            id="twitter"
                            src="https://www.pinclipart.com/picdir/big/74-740310_transparent-background-twitter-logo-clipart.png"
                            alt="twitter logo"
                          />
                          {twitter.identifier_value}{" "}
                        </a>
                      ) : (
                        "No Twitter available"
                      )}
                    </Typography>

                    <Typography variant="h6" component="p">
                      {official.email_addresses &&
                      official.email_addresses.length > 0 ? (
                        <a href={`mailto:${official.email_addresses[0]}`}>
                          <img
                            id="email"
                            src="https://i.pinimg.com/originals/8f/c3/7b/8fc37b74b608a622588fbaa361485f32.png"
                            alt="email logo"
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                          {official.email_addresses[0]}
                        </a>
                      ) : (
                        "No email available"
                      )}
                    </Typography>

                    <Typography variant="h6" component="div">
                      {official.addresses &&
                      official.addresses.length > 0 &&
                      official.addresses[0].phone_1 ? (
                        <div>
                          <img
                            id="phone"
                            src="https://www.pinclipart.com/picdir/big/129-1293919_small-phone-icon-blue-clipart.png"
                            alt="phone logo"
                          />
                          {official.addresses[0].phone_1}
                        </div>
                      ) : (
                        "No phone number available"
                      )}
                    </Typography>
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
