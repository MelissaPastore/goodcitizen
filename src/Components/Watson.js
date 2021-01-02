import React from "react";

class Watson extends React.Component {
  componentDidMount() {
    window.watsonAssistantChatOptions = {
      integrationID: "5aacc5ef-b8b7-4610-b21a-ec113c5c2798", // The ID of this integration.
      region: "us-south", // The region your integration is hosted in.
      serviceInstanceID: "01bf79b3-722c-4965-bcba-9d9c8fc09f4e", // The ID of your service instance.
      onLoad: function (instance) {
        instance.render();
      },
    };
    setTimeout(function () {
      const t = document.createElement("script");
      t.src =
        "https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js";
      document.head.appendChild(t);
    });
  }

  render() {
    return (
      <div id="watson">
        <h1>
          Okay - click that chat bubble in the bottom right hand corner then!
        </h1>
      </div>
    );
  }
}

export default Watson;
