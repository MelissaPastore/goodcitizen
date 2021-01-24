const Welcome = () => {
  return (
    <div id="welcome">
      <img
        id="home-img"
        alt="statue-of-liberty"
        src="https://images.unsplash.com/photo-1561841898-46de669ae06b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
      />
      <div className="welcome">
        <h2 id="welcome-head">
          Get the information you need to be an engaged citizen.
        </h2>
        <p>Find your elected officials.</p>
        <p>See how your members of Congress voted on important issues.</p>
        <p>Find out about upcoming elections and find your polling place.</p>
      </div>
    </div>
  );
};

export default Welcome;
