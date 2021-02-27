import React from "react";

class Watson extends React.Component {
  componentDidMount() {
    window.watsonAssistantChatOptions = {
      integrationID: "befc330d-8f52-4ff1-9b52-af811e567cfd", // The ID of this integration.
      region: "us-south", // The region your integration is hosted in.
      serviceInstanceID: "14f1e653-7513-49cf-a2f5-8bf6804d316d", // The ID of your service instance.
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
    // window.watsonAssistantChatOptions = {
    //   integrationID: "5aacc5ef-b8b7-4610-b21a-ec113c5c2798", // The ID of this integration.
    //   region: "us-south", // The region your integration is hosted in.
    //   serviceInstanceID: "01bf79b3-722c-4965-bcba-9d9c8fc09f4e", // The ID of your service instance.
    //   onLoad: function (instance) {
    //     instance.render();
    //   },
    // };
    // setTimeout(function () {
    //   const t = document.createElement("script");
    //   t.src =
    //     "https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js";
    //   document.head.appendChild(t);
    // });
  }

  render() {
    return (
      <div id="watson">
        <p>
          Okay - click that chat bubble in the bottom right hand corner then!
        </p>
      </div>
    );
  }
}

export default Watson;
