const RepInfo = (props) => {
  const repInfo = props.repInfo;
  const offices = repInfo.offices;
  const officials = repInfo.officials;

  return (
    <div>
      <p>Here are your representatives:</p>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Office</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {officials.map((official, index) => {
            let office = offices.find((office) => {
              return office.officialIndices.includes(index);
            });

            return (
              <tr key={index}>
                <td>
                  {official.photoUrl ? (
                    <img
                      className="rep-img"
                      src={official.photoUrl}
                      alt={`${official.name}`}
                    />
                  ) : (
                    "No Image Available"
                  )}
                </td>
                <td>{official.name}</td>
                <td>{office.name}</td>
                <td>
                  {official.emails ? official.emails[0] : "No email provided"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RepInfo;
