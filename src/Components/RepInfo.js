import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";

const categorizeOfficial = (official) => {
  const chamberGovernmentType =
    official.office?.chamber?.government?.type || "";
  const districtType = official.office?.district?.district_type || "";
  const officeTitle = (official.office?.title || "").toLowerCase();

  const ocdId = official.office?.district?.ocd_id || "";

  if (
    chamberGovernmentType === "FEDERAL" ||
    districtType === "FEDERAL" ||
    districtType === "NATIONAL" ||
    (ocdId && ocdId.includes("country:us") && !ocdId.includes("state")) ||
    officeTitle.includes("president") ||
    officeTitle.includes("vice president") ||
    (officeTitle.includes("senator") && !officeTitle.includes("state")) ||
    (officeTitle.includes("representative") &&
      !officeTitle.includes("state")) ||
    officeTitle.includes("congress")
  ) {
    return "national";
  }
  else if (
    chamberGovernmentType === "STATE" ||
    districtType === "STATE" ||
    districtType === "STATE_EXEC" ||
    districtType === "STATE_UPPER" ||
    districtType === "STATE_LOWER" ||
    (ocdId &&
      ocdId.includes("state:") &&
      !ocdId.includes("place:") &&
      !ocdId.includes("county:")) ||
    officeTitle.includes("governor") ||
    officeTitle.includes("attorney general") ||
    officeTitle.includes("state treasurer") ||
    officeTitle.includes("state senator") ||
    officeTitle.includes("state representative") ||
    officeTitle.includes("state assembly") ||
    (official.office?.representing_state && !official.office?.representing_city)
  ) {
    return "state";
  }
  else if (
    chamberGovernmentType === "LOCAL" ||
    districtType === "LOCAL_EXEC" ||
    districtType.includes("LOCAL") ||
    districtType.includes("COUNTY") ||
    districtType.includes("CITY") ||
    officeTitle.includes("mayor") ||
    officeTitle.includes("council") ||
    officeTitle.includes("alderman") ||
    officeTitle.includes("commissioner") ||
    officeTitle.includes("supervisor") ||
    official.office?.representing_city
  ) {
    return "local";
  }
  else {
    return "local";
  }
};

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
  categorySection: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontWeight: "bold",
    fontSize: 24,
    margin: "20px 0 10px 10px",
    borderBottom: "2px solid #3f51b5",
    paddingBottom: 5,
    width: "fit-content",
  },
  repContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  noReps: {
    margin: "10px 0 10px 10px",
    fontStyle: "italic",
  },
}));

const RepInfo = ({ repInfo }) => {
  const classes = useStyles();
  const officials = repInfo?.details || [];
  const error = repInfo?.error || "";

  const nationalOfficials = officials.filter(
    (off) => categorizeOfficial(off) === "national"
  );
  const stateOfficials = officials.filter(
    (off) => categorizeOfficial(off) === "state"
  );
  const localOfficials = officials.filter(
    (off) => categorizeOfficial(off) === "local"
  );


  const renderOfficialCard = (official) => {
    const name = official.first_name + " " + official.last_name;
    const twitter =
      official.identifiers &&
      official.identifiers.find((id) => id.identifier_type === "TWITTER");
    const email = official.email_addresses?.[0] && "No email available";

    return (
      <Card key={name} elevation={10} className={classes.card}>
        <CardHeader className={classes.header} title={name} />
        <CardContent>
          <Typography variant="h6" component="p">
            {official.office?.title || "Unknown Position"}
          </Typography>
          <Typography variant="h6" component="p">
            {official.party || "Party Unknown"}
          </Typography>

          <Typography variant="h6" component="p">
            {twitter && (
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
            )}
          </Typography>

          <Typography variant="h6" component="p">
            {email ? (
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
  };

  const renderCategory = (title, officials) => (
    <div className={classes.categorySection}>
      <h2 className={classes.categoryTitle}>{title}</h2>
      <div className={classes.repContainer}>
        {officials.length > 0 ? (
          officials.map(renderOfficialCard)
        ) : (
          <p className={classes.noReps}>
            No representatives found at this level.
          </p>
        )}
      </div>
    </div>
  );

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
          {renderCategory("Local", localOfficials)}
          {renderCategory("State", stateOfficials)}
          {renderCategory("National", nationalOfficials)}
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
