import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@material-ui/core";

import { connect } from "react-redux";
import "react-tabulator/lib/styles.css";
import { ReactTabulator } from "react-tabulator";

const RepInfo = (props) => {
  const repInfo = props.repInfo.details || {};
  const offices = repInfo.offices || [];
  const officials = repInfo.officials || [];
  const error = props.repInfo.error || "";

  return (
    <div>
      {error.length ? (
        <div id="rep-error">
          There was a problem looking up your representatives. Please make sure
          you entered your address correctly.{" "}
        </div>
      ) : (
        <div>
          <p>Here are your representatives:</p>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Office</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Twitter</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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

                return (
                  <TableRow key={index}>
                    <TableCell>
                      {official.photoUrl ? (
                        <img
                          className="rep-img"
                          src={official.photoUrl}
                          alt={`${official.name}`}
                        />
                      ) : (
                        "No Image Available"
                      )}
                    </TableCell>
                    <TableCell>{official.name}</TableCell>
                    <TableCell>{office.name}</TableCell>
                    <TableCell>
                      {official.emails ? (
                        <a href={`mailto: ${official.emails[0]}`}>
                          <img
                            id="email"
                            src="https://i.pinimg.com/originals/8f/c3/7b/8fc37b74b608a622588fbaa361485f32.png"
                            alt="email logo"
                          />
                          {official.emails[0]}
                        </a>
                      ) : (
                        "No email available"
                      )}
                    </TableCell>
                    <TableCell>
                      {" "}
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
                    </TableCell>
                    <TableCell>
                      {twitter ? (
                        <a href={`https://twitter.com/${twitter.id}`}>
                          <img
                            id="twitter"
                            src="https://www.pinclipart.com/picdir/big/74-740310_transparent-background-twitter-logo-clipart.png"
                            alt="twitter logo"
                          />
                          {twitter.id}
                        </a>
                      ) : (
                        "No Twitter Found"
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>{" "}
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
