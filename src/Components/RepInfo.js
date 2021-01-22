import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@material-ui/core";

import { connect } from "react-redux";

const RepInfo = (props) => {
  const repInfo = props.repInfo;
  const offices = repInfo.offices;
  const officials = repInfo.officials;

  return (
    <div>
      <div>
        <p>Here are your representatives:</p>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Office</TableCell>
              <TableCell>Email</TableCell>
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
                      "No Email Available"
                    )}
                  </TableCell>
                  <TableCell>
                    {twitter ? (
                      <a href={`https://twitter.com/${twitter.id}`}>
                        <img
                          id="twitter"
                          src="https://www.logolynx.com/images/logolynx/43/430c07f27af3fda19373042528edbe3d.jpeg"
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    repInfo: state.repInfo,
  };
};

export default connect(mapStateToProps)(RepInfo);
