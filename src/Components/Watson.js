import React, { useEffect } from "react";

const Watson = () => {
  useEffect(() => {
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
      t.id = "watson";
      document.head.appendChild(t);
    });
  }, []);

  return (
    <div id="watson">
      <p>Okay - click that chat bubble in the bottom right hand corner then!</p>
    </div>
  );
};

export default Watson;
