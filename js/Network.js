var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Network {
    static saveJson(url, json, loginHash, password) {
        return __awaiter(this, void 0, void 0, function* () {
            CryptoWarper.encrypt(password, json).then(function (encriptionData) {
                var data = new SerializedData();
                data.encriptedData = encriptionData;
                data.version = Controller.currentVersion;
                var json = "";
                var contentType = "application/json";
                if (Controller.localhosted) {
                    json = JSON.stringify(data);
                    contentType = "text/plain";
                }
                else {
                    var requestData = new PostRequestData();
                    requestData.appKey = "file";
                    requestData.messageKey = "notepadData";
                    requestData.login = Controller.getTextAreaValue("loginTextArea").trim();
                    requestData.password = "afghknjaophfpeowhfpohawe";
                    requestData.message = JSON.stringify(data);
                    json = JSON.stringify(requestData);
                }
                fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': contentType },
                    body: json
                }).then(function (body) { return body.text(); }).then(function (data) {
                    console.log(data);
                    //if (data == "ok") {
                    //    console.log("data saved");
                    //}
                    //else {
                    //    alert("страница потеряла актуальность, перезагрузите чтобы вносить изменения");
                    //    Controller.currentVersion = -1000;
                    //}
                });
            });
        });
    }
    static updateLastChangeTime(url, time, login) {
        return __awaiter(this, void 0, void 0, function* () {
            var requestData = new PostRequestData();
            requestData.appKey = "file";
            requestData.messageKey = "notepadData";
            requestData.login = login;
            requestData.password = "afghknjaophfpeowhfpohawe";
            requestData.message = time + "";
            var json = JSON.stringify(requestData);
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: json
            }).then(function (body) { return body.text(); }).then(function (data) {
                console.log(data);
            });
        });
    }
    static sendRequest(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return fetch(url)
                .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.text();
            });
        });
    }
    static generateReadUrl(login, appKey, messageKey) {
        return "https://www.sbitravel.com/rest/messages/read_message?login=" + login + "&password=afghknjaophfpeowhfpohawe&appKey=" + appKey + "&messageKey=" + messageKey;
    }
    static generateWriteUrl(login, appKey, messageKey, message) {
        return "https://www.sbitravel.com/rest/messages/send_message?login=" + login + "&password=afghknjaophfpeowhfpohawe&appKey=" + appKey + "&messageKey=" + messageKey + "&message=" + message;
    }
}
class PostRequestData {
}
//# sourceMappingURL=Network.js.map