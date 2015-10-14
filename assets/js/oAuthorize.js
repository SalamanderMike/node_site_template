var callbackResponse = (document.URL).split("#")[1],
    responseParameters = (callbackResponse).split("&"),
    parameterMap = [];

for(var i = 0; i < responseParameters.length; i++) {
    parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
}

if(parameterMap.access_token !== undefined && parameterMap.access_token !== null) {
    var imgur = {
        oauth: {
            access_token: parameterMap.access_token,
            expires_in: parameterMap.expires_in,
            account_username: parameterMap.account_username
        }
    };
    window.localStorage.setItem("imgur", JSON.stringify(imgur));
    window.location.href = "http://localhost/index.html#/secure";
} else {
    alert("Problem authenticating");
}
