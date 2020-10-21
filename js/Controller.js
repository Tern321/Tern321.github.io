var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Controller {
    static createTopicFromContention() {
        var selectedcontention = Controller.selectedcontention();
        selectedcontention.topic = !selectedcontention.topic;
        Model.updateTopicsFor(selectedcontention.parentTopic());
        Controller.saveUpdatedData();
        if (selectedcontention.topic) {
            Controller.topicId = selectedcontention.id;
        }
        UIDrawer.drawUI(false);
    }
    static changeContention() {
        var selectedcontention = Controller.selectedcontention();
        var textArea = document.getElementById("argumentTextArea");
        var text = textArea.value.trim();
        if (text.length == 0) {
            return;
        }
        selectedcontention.text = textArea.value;
        textArea.value = "";
        Controller.saveUpdatedData();
        UIDrawer.drawUI(false);
    }
    static copyContentionText() {
        var selectedcontention = Controller.selectedcontention();
        var textArea = document.getElementById("argumentTextArea");
        textArea.value = selectedcontention.text;
    }
    static selectedcontention() {
        return Model.contentionsMap.get(Controller.selectedContentionId);
    }
    static changeContentionColor(color) {
        var selectedcontention = Controller.selectedcontention();
        selectedcontention.color = color;
        Controller.saveUpdatedData();
        UIDrawer.drawUI(false);
    }
    static deleteContention() {
        //console.log("removeContention " + Controller.selectedContentionId);
        Model.removeContention(Controller.selectedContentionId);
        Controller.saveUpdatedData();
        UIDrawer.drawUI(false);
    }
    static moveContention(targetContentionId) {
        var testParents = Controller.selectedcontention();
        if (Model.contentionForId(targetContentionId).parentContentionId == Controller.selectedContentionId) {
            //console.log("moveContentionToTop");
            Model.moveContentionToTop(Model.contentionForId(targetContentionId));
            console.log("moveContention");
            var archiveContentionId = Model.archiveIdForContention(Controller.selectedContentionId);
            if (Model.contentionsMap.has(archiveContentionId)) {
                Model.moveContentionToTop(Model.contentionForId(archiveContentionId));
                console.log("parent contains archive");
            }
        }
        else {
            // �������� ��� �� �� ���������� ������� � ������
            while (testParents && testParents.parentContentionId != "-1") {
                if (testParents.id == targetContentionId) {
                    console.log("error contention move");
                    return;
                }
                testParents = testParents.parentContention();
            }
            Model.moveContention(targetContentionId, Controller.selectedcontention().id);
        }
        Controller.saveUpdatedData();
        UIDrawer.drawUI(false);
    }
    static addContentionList() {
        if (!Controller.selectedContentionId) {
            Controller.selectedContentionId = Controller.topicId;
        }
        var textArea = document.getElementById("argumentTextArea");
        textArea.value.split(/\r?\n/).forEach(function (line) {
            Model.addContention(line, Controller.selectedContentionId);
        });
        textArea.value = "";
        textArea.focus();
        Controller.saveUpdatedData();
        UIDrawer.drawUI(false);
    }
    static addContention() {
        if (!Controller.selectedContentionId) {
            Controller.selectedContentionId = Controller.topicId;
        }
        var textArea = document.getElementById("argumentTextArea");
        Model.addContention(textArea.value.split("\n").join("<br>"), Controller.selectedContentionId);
        textArea.value = "";
        textArea.focus();
        Controller.saveUpdatedData();
        UIDrawer.drawUI(false);
    }
    static addLink() {
        if (!Controller.selectedContentionId) {
            Controller.selectedContentionId = Controller.topicId;
        }
        var textArea = document.getElementById("argumentTextArea");
        var lines = textArea.value.split(/\r?\n/);
        Model.addContention("<a href=\"" + lines[0].trim() + "\" target=\"_blank\">link</a> " + lines[1], Controller.selectedContentionId);
        textArea.value = "";
        textArea.focus();
        Controller.saveUpdatedData();
        UIDrawer.drawUI(false);
    }
    static selectContention(e) {
        this.selectContentionById(e.getAttribute("id"));
    }
    static selectContentionById(contentionId) {
        UIDrawer.deselectElement(document.getElementById(this.selectedContentionId));
        UIDrawer.selectElement(document.getElementById(contentionId));
        this.selectedContentionId = contentionId;
    }
    static collapceSelectedContention() {
        var cn = Controller.selectedcontention();
        cn.collapce = !cn.collapce;
        Controller.saveUpdatedData();
        UIDrawer.drawUI(false);
    }
    static addSelectedToArchive() {
        this.addToArchive(this.selectedContentionId);
    }
    static addToArchive(contentionId) {
        var cn = Model.contentionsMap.get(contentionId);
        var archiveContention = Model.archiveForContention(cn.parentContention());
        Model.moveContention(cn.id, archiveContention.id);
        Controller.saveUpdatedData();
        UIDrawer.drawUI(false);
    }
    static collapceContention(contentionId) {
        var cn = Model.contentionsMap.get(contentionId);
        cn.collapce = !cn.collapce;
        Controller.saveUpdatedData();
        UIDrawer.drawUI(false);
    }
    static loadJson(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(url)
                .then(function (body) { return body.text(); })
                .then(function (data) { Model.decriptJson(data, Controller.getPassword()); })
                .catch(function (body) { Model.parseJson(""); });
        });
    }
    static moveToTopic(topicId) {
        Controller.topicId = topicId;
        UIDrawer.drawUI(false);
    }
    static viewAll() {
        Controller.topicId = "root";
        UIDrawer.drawUI(true);
    }
    static getPassword() {
        var textArea = document.getElementById("passwordTextArea");
        return textArea.value;
    }
    static updatePassword() {
        localStorage.setItem("password", this.getPassword());
    }
    static saveUpdatedData() {
        Controller.currentVersion++;
        var list = [];
        Model.rootContention().recursiveAddChilds(list);
        var json = JSON.stringify(list);
        //console.log(json);
        var url = "https://localhost:44380/Home/saveUdatedData";
        Network.saveJson(url, json, this.getPassword());
        // sand request on server
    }
    static reload() {
        var url = "https://localhost:44380/Home/json";
        Controller.loadJson(url);
    }
    static contentionIsVisible(contentionId) {
        return document.getElementById(contentionId) != undefined;
    }
    static moveContentionSelection(keyCode) {
        var leftKeyCode = 37;
        var upKeyCode = 38;
        var rightKeyCode = 39;
        var downKeyCode = 40;
        //switch
        if (keyCode == leftKeyCode) {
            var contentionIdToSelect = this.selectedcontention().parentContentionId;
            if (contentionIdToSelect && this.contentionIsVisible(contentionIdToSelect)) {
                this.selectContentionById(contentionIdToSelect);
            }
        }
        if (keyCode == rightKeyCode) {
            var contentionIdToSelect = this.selectedcontention().childs[0];
            if (contentionIdToSelect && this.contentionIsVisible(contentionIdToSelect)) {
                this.selectContentionById(contentionIdToSelect);
            }
        }
        if (keyCode == upKeyCode) {
            var previosContention = this.selectedcontention().previosContention();
            if (previosContention) {
                this.selectContentionById(previosContention.id);
            }
            else {
                var offset = 0;
                var contention = this.selectedcontention();
                while (contention && !previosContention) {
                    contention = contention.parentContention();
                    previosContention = contention.previosContention();
                    offset++;
                }
                contention = previosContention;
                while (contention.childs.length > 0 && offset > 0 && this.contentionIsVisible(contention.childs[contention.childs.length - 1])) {
                    contention = Model.contentionForId(contention.childs[contention.childs.length - 1]);
                    offset--;
                }
                if (contention) {
                    this.selectContentionById(contention.id);
                }
            }
        }
        if (keyCode == downKeyCode) {
            var nextContention = this.selectedcontention().nextContention();
            if (nextContention) {
                this.selectContentionById(nextContention.id);
            }
            else {
                var offset = 0;
                var contention = this.selectedcontention();
                while (contention && !nextContention) {
                    contention = contention.parentContention();
                    nextContention = contention.nextContention();
                    offset++;
                }
                contention = nextContention;
                while (contention.childs.length > 0 && offset > 0 && this.contentionIsVisible(contention.childs[0])) {
                    contention = Model.contentionForId(contention.childs[0]);
                    offset--;
                }
                if (contention) {
                    this.selectContentionById(contention.id);
                }
            }
        }
    }
    static moveContentionUp(up) {
        this.shouldSaveContentionOrder = true;
        var parentContention = this.selectedcontention().parentContention();
        var index = parentContention.childs.indexOf(this.selectedContentionId);
        if (up) {
            if (index > 0) {
                // UIDrawer.switchElements
                var secondElementId = parentContention.childs[index - 1];
                UIDrawer.switchElements(document.getElementById(this.selectedContentionId), document.getElementById(secondElementId));
                parentContention.childs[index] = secondElementId;
                parentContention.childs[index - 1] = this.selectedContentionId;
            }
        }
        else {
            if (index < parentContention.childs.length - 1) {
                var secondElementId = parentContention.childs[index + 1];
                UIDrawer.switchElements(document.getElementById(secondElementId), document.getElementById(this.selectedContentionId));
                parentContention.childs[index] = secondElementId;
                parentContention.childs[index + 1] = this.selectedContentionId;
            }
        }
    }
    static saveContentionOrder() {
        if (this.shouldSaveContentionOrder) {
            this.shouldSaveContentionOrder = false;
            Controller.saveUpdatedData();
            UIDrawer.drawUI(false);
        }
    }
}
Controller.topicId = "root";
Controller.currentVersion = 11;
Controller.changeSelectedContention = false;
Controller.shouldSaveContentionOrder = true;
window.onload = () => {
    console.log("on load");
    var textArea = document.getElementById("passwordTextArea");
    textArea.value = localStorage.getItem("password");
    enableInput();
    Controller.reload();
};
//# sourceMappingURL=Controller.js.map