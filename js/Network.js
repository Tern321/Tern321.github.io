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
    static saveJson(url, json, password) {
        return __awaiter(this, void 0, void 0, function* () {
            CryptoWarper.encrypt(password, json).then(function (encriptionData) {
                var data = new SerializedData();
                data.encriptedData = encriptionData;
                data.version = Controller.currentVersion;
                console.log(data);
                //console.log("json data " + JSON.stringify(data));
                //data.json = json;
                fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }).then(function (body) { return body.text(); }).then(function (data) {
                    if (data == "ok") {
                        console.log("data saved");
                    }
                    else {
                        alert("страница потеряла актуальность, перезагрузите чтобы вносить изменения");
                        Controller.currentVersion = -1000;
                    }
                });
                //return body.text();
                //CryptoWarper.decrypt("pass123", data).then(function (json: string) {
                //    console.log(json);
                //});
            });
        });
    }
}
//# sourceMappingURL=Network.js.map