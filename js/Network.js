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
                if (false) {
                    json = JSON.stringify(data);
                }
                else {
                    var requestData = new PostRequestData();
                    requestData.appKey = "file";
                    requestData.messageKey = "notepadData";
                    requestData.login = "bmsaosdfdffklanfpjawhepfm" + Controller.getTextAreaValue("loginTextArea").trim();
                    requestData.password = "afghknjaophfpeowhfpohawe";
                    requestData.message = JSON.stringify(data);
                    json = JSON.stringify(requestData);
                }
                fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain' },
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
    static loadJson(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(url)
                .then(function (body) { return body.text(); })
                .then(function (data) { Model.decriptJson(data, Controller.getEncriptionKey()); })
                .catch(function (body) {
                console.log("loadJson error");
                Model.parseJson("");
            });
        });
    }
}
class PostRequestData {
}
//# sourceMappingURL=Network.js.map