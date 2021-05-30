import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    margin: 15,
    borderRadius: 10,
    fontFamily: "Fjalla One",
  },
  header: {
    fontWeight: "bold",
    fontSize: 70,
  },
  card: {
    width: 350,
    margin: 10,
    fontFamily: "Fjalla One",
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
            {/* <Table stickyHeader={true}>
            <TableHead style={{ color: "#5386e4" }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Office</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Twitter</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody> */}
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
                  </CardContent>
                  <CardContent>
                    <Typography variant="h6" component="p">
                      {official.party}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="h6" component="p">
                      {twitter ? (
                        <a
                          href={`https://twitter.com/${twitter.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {" "}
                          <img
                            id="twitter"
                            src="https://www.pinclipart.com/picdir/big/74-740310_transparent-background-twitter-logo-clipart.png"
                            alt="twitter logo"
                          />
                        </a>
                      ) : (
                        "No Twitter available"
                      )}
                    </Typography>
                  </CardContent>
                  <CardContent>
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
                  </CardContent>
                </Card>
                // <TableRow key={index}>
                //   <TableCell>{official.name}</TableCell>
                //   <TableCell>{office.name}</TableCell>
                //   <TableCell>
                //     {official.emails ? (
                //       <a href={`mailto: ${official.emails[0]}`}>
                //         <img
                //           id="email"
                //           src="https://i.pinimg.com/originals/8f/c3/7b/8fc37b74b608a622588fbaa361485f32.png"
                //           alt="email logo"
                //         />
                //         {official.emails[0]}
                //       </a>
                //     ) : (
                //       "No email available"
                //     )}
                //   </TableCell>
                //   <TableCell>
                //     {" "}
                //     {official.phones ? (
                //       <div>
                //         <img
                //           id="phone"
                //           src="https://www.pinclipart.com/picdir/big/129-1293919_small-phone-icon-blue-clipart.png"
                //           alt="email logo"
                //         />
                //         {official.phones[0]}
                //       </div>
                //     ) : (
                //       "No phone number available"
                //     )}
                //   </TableCell>
                //   <TableCell>
                //     {twitter ? (
                //       <a href={`https://twitter.com/${twitter.id}`}>
                //         <img
                //           id="twitter"
                //           src="https://www.pinclipart.com/picdir/big/74-740310_transparent-background-twitter-logo-clipart.png"
                //           alt="twitter logo"
                //         />
                //         {twitter.id}
                //       </a>
                //     ) : (
                //       "No Twitter available"
                //     )}
                //   </TableCell>
                //   <TableCell>
                //     {congress && (
                //       <Link to={`/records/${official.name}/${chamber}`}>
                //         Click to see recent voting history
                //       </Link>
                //     )}
                //   </TableCell>
                // </TableRow>
              );
            })}
          </div>
          {/* </TableBody>
          </Table>{" "} */}
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
