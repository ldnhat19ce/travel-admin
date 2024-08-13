document.write('<script type="text/javascript" src="../../dwrDefault/interface/ajax_DatabaseAccessor.js"></script>');
document.head.insertAdjacentHTML("beforeend", '<style>'
       							 + '.loader {'
                                  + 'width: 50px;'
                                  + 'aspect-ratio: 1;'
                                  + ' border-radius: 50%;'
                                  + 'background: radial-gradient(farthest-side,#000 94%, #0000) top/8px 8px'
                                  +       ' no-repeat,'
                                  +    'conic-gradient(#0000 30%, #000);'
                                  + '-webkit-mask: radial-gradient('
                                  +   ' farthest-side,'
                                  +    '#0000 calc(100% - 8px),'
                                  +    '#000 0'
                                  + ' );'
                                  + 'animation: l13 1s infinite linear;'
                              + '}'
                              + '@keyframes l13 {'
                              +   ' 100% {'
                              +        'transform: rotate(1turn);'
                              +    '}'
                              + ' }'
                              + '</style>');

var schedule = [
        ["Sunday"],
        ["Monday", new Date(2024, 1, 1, 7, 30), new Date(2024, 1, 1, 12), new Date(2024, 1, 1, 13), new Date(2024, 1, 1, 16, 30)],
        ["Tuesday", new Date(2024, 1, 1, 7, 30), new Date(2024, 1, 1, 12), new Date(2024, 1, 1, 13), new Date(2024, 1, 1, 16, 30)],
        ["Wednesday", new Date(2024, 1, 1, 7, 30), new Date(2024, 1, 1, 12), new Date(2024, 1, 1, 13), new Date(2024, 1, 1, 16, 30)],
        ["Thursday", new Date(2024, 1, 1, 7, 30), new Date(2024, 1, 1, 12), new Date(2024, 1, 1, 13), new Date(2024, 1, 1, 16, 30)],
        ["Friday", new Date(2024, 1, 1, 7, 30), new Date(2024, 1, 1, 12), new Date(2024, 1, 1, 13), new Date(2024, 1, 1, 16, 30)],
        ["Saturday", new Date(2024, 1, 1, 7, 30), new Date(2024, 1, 1, 11, 30)]
    ];

var token = "";
var resultCode01 = "";
var resultCode02 = "";
var resultCode03 = "";
var resultCode04 = "";
var resultCode05 = "";
var resultCode06 = "";
var resultCode99 = "";
var lbl_024 = document.getElementById("lbl_024");
var resultDate = [];
var date1 = "";
var date2 = "";
var loaded = 0;
var hn_date_005 = document.getElementById("hn_date_005");
var grid001Selected = -1;

function formCreate() {
    return true;
}

function formOpen() {
  	settingDefaultDate();

    document.getElementById("tb_001").style.border = "none";

    document.getElementById("lbl_border_001").style.background = "#0a58ca";
    document.getElementById("lbl_border_002").style.background = "#0a58ca";
    document.getElementById("lbl_border_003").style.background = "#0a58ca";
    document.getElementById("lbl_border_004").style.background = "#0a58ca";
    document.getElementById("lbl_border_005").style.background = "#0a58ca";

    document.getElementById("lbl_border_006").style.background = "#0a58ca";
    document.getElementById("lbl_border_007").style.background = "#0a58ca";
    document.getElementById("lbl_border_008").style.background = "#0a58ca";
    document.getElementById("lbl_border_009").style.background = "#0a58ca";
    document.getElementById("lbl_border_010").style.background = "#0a58ca";
    document.getElementById("lbl_border_011").style.background = "#0a58ca";
    document.getElementById("lbl_border_012").style.background = "#0a58ca";
    document.getElementById("lbl_border_013").style.background = "#0a58ca";

    document.getElementById("btn_search").style.display = "none";
    document.getElementById("btn_search2").style.display = "none";
    document.getElementById("btn_search3").style.display = "none";
  	document.getElementById("btn_send").style.display = "none";

    let btn001 = document.getElementById("btn_001");

    let btn002 = document.getElementById("btn_002");

    let btn003 = document.getElementById("btn_003");

    let btnSearch = document.getElementById("btn_search");

    setUpButton(btn001);
    setUpButton(btn002);
    setUpButton(btn003);
    setUpButton(btnSearch);

    resizeDateBtn("date_001_btn");
    resizeDateBtn("date_002_btn");
    resizeDateBtn("time_001_btn");
    resizeDateBtn("time_002_btn");

    changeStyleListLable();

    var tGrid001 = document.getElementById("grid001").value;
    if(typeof(grid001Obj) != "undefined") {

        if(tGrid001.length > 1) {
        	grid001Obj.reload(eval(tGrid001));
        }
    }

  	if (String(activityId) === "requester") {
      getDataLeave(userId, false);
    }

	getNormalProcess();
  	getBrandName();

  	let btn_reload = document.getElementById("btn_reload");
	if(btn_reload !== null && btn_reload !== undefined) {
      	let svgReload = '<svg height="20" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.645 489.645" xml:space="preserve"><path d="M460.656 132.911c-58.7-122.1-212.2-166.5-331.8-104.1-9.4 5.2-13.5 16.6-8.3 27 5.2 9.4 16.6 13.5 27 8.3 99.9-52 227.4-14.9 276.7 86.3 65.4 134.3-19 236.7-87.4 274.6-93.1 51.7-211.2 17.4-267.6-70.7l69.3 14.5c10.4 2.1 21.8-4.2 23.9-15.6 2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25 16.6-23.9 22.9l15.6 123.8c1 10.4 9.4 17.7 19.8 17.7 12.8 0 20.8-12.5 19.8-23.9l-6-50.5c57.4 70.8 170.3 131.2 307.4 68.2 58.1-30 191.5-147.7 103.9-329.6"/></svg>';
      	let encoded = window.btoa(svgReload);
        btn_reload.style.background = "url(data:image/svg+xml;base64,"+encoded+")";
		btn_reload.style.backgroundRepeat = "no-repeat";
      	btn_reload.style.textAlign = "center";
      	btn_reload.style.cursor = "pointer";
      	btn_reload.style.border = "none";
    }

    return true;
}

function formSave() {
    if(typeof(grid001Obj) != "undefined") {
        document.getElementById("grid001").value = grid001Obj.toArrayString();
    }
    return true;
}

function formClose() {
    return true;
}

function formDispatch() {
    //locale
    let tGrid001 = document.getElementById("grid001").value;
    if(tGrid001.length <= 2) {
      alert(translate("msg.uni_form_001.014"));
      return false;
    }

  	clearData();

	if (String(activityId) === "unitmanager") {
      document.getElementById("btn_send").click();
      //return false;
    }

    return true;
}

function btn_send_onClick() {
  let tGrid001 = document.getElementById("grid001").value;
  if (tGrid001 !== null && tGrid001 !== undefined) {
	let xhr = new XMLHttpRequest();
    let data = JSON.stringify({ "data": String(tGrid001) });
    //xhr.withCredentials = true;

    xhr.open("POST", "http://172.16.1.120:8087/api/v1/leave");

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.setRequestHeader("Accept", "*");
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.send(data);

    /*let tGrid001Object = eval(tGrid001);
    if (tGrid001Object !== null && tGrid001Object !== undefined) {
      let arrLeaveDay = [];
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            token = JSON.parse(this.responseText).access_token;
            tGrid001Object.forEach((v) => {
                let tGrid001Object1 = v[3].split(" ");
                let tGrid001Object2 = v[4].split(" ");

                let date_001 = tGrid001Object1[0];
                let date_002 = tGrid001Object2[0];
                let time_001 = tGrid001Object1[1];
                let time_002 = tGrid001Object2[1];

                let date001Split = date_001.split("/");
                let date002Split = date_002.split("/");
                let time001Split = time_001.split(":");
                let time002Split = time_002.split(":");
                let arrDay = getTotalMinutesByEachDay(
                  date001Split,
                  date002Split,
                  time001Split,
                  time002Split
                );
                arrDay.forEach((v2) => {
                  //sendApiLeave(v[7], v[2], v2[0], v2[1], token);
                  console.log(v2);
            	});

          });
        }
      });

      xhr.open("GET", "http://172.16.1.120:8087/api/v1/authentication");

      xhr.send();
    }*/
  }
}

function getDataLeave(uId, isEdit) {
    openLoading();
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
        if(this.responseText !== null && this.responseText !== undefined) {
            resultCode01 = JSON.parse(this.responseText)[0];
            resultCode02 = JSON.parse(this.responseText)[1];
            resultCode03 = JSON.parse(this.responseText)[2];
            resultCode04 = JSON.parse(this.responseText)[3];
            resultCode05 = JSON.parse(this.responseText)[4];
            resultCode06 = JSON.parse(this.responseText)[5];
            drp_001_onchange();
            if(isEdit) {
                updateDate();
            }
        }
        }
    });

    xhr.open("POST", "http://172.16.1.120:8087/api/v1/leave/info/" + uId);

    xhr.send();
}

function btn_001_onclick() {
    var message = validate("add");
    if(message.length > 0) {
        alert(message);
    } else {
        grid001Obj.addRow();

        grid001Obj.clearBinding();

        clearData();

        document.getElementById("grid001").value = grid001Obj.toArrayString();
    }
}

function btn_002_onclick() {
	var message = validate("edit");
    if(message.length > 0) {
       alert(message);
    } else {
      grid001Obj.editRow();

      grid001Obj.clearBinding();

      clearData();

      document.getElementById("grid001").value = grid001Obj.toArrayString();
    }
}

function btn_003_onclick() {
	grid001Obj.deleteRow();

    grid001Obj.clearBinding();

  	clearData();

    document.getElementById("grid001").value = grid001Obj.toArrayString();
}

function clearData() {
    document.getElementById("lbl_date_001").innerHTML = "";
    document.getElementById("lbl_date_002").innerHTML = "";
    document.getElementById("lbl_date_003").innerHTML = "";
    document.getElementById("lbl_024").innerHTML = translate("msg.uni_form_001.013", "0");

    document.getElementById("hn_date_001").value = "";
    document.getElementById("hn_date_002").value = "";
    document.getElementById("hn_date_004").value = "";

    document.getElementById("date_001_txt").value = "";
    document.getElementById("date_002_txt").value = "";
    document.getElementById("time_001_txt").value = "";
    document.getElementById("time_002_txt").value = "";

    document.getElementById("tb_007").value = userId;
    document.getElementById("tb_008").value = userName;

    document.getElementById("hn_leave_absence").value = "";

    let drp_001 = document.getElementById("drp_001");
    drp_001.value = "00";
    grid001Selected = -1;
    changeVisibleDate(false);
}

function drp_001_onchange() {
	checkDateWhenChangeDrp();
  	closeLoading();
}

function date_001_onchange() {
	updateDate();
}

function date_002_onchange() {
	updateDate();
}

function time_001_onchange() {
	updateDate();
}

function time_002_onchange() {
	updateDate();
}

function tb_007_onclick() {
	document.getElementById("btn_search").click();
}

function tb007GetApiLeave() {
    let tb_007 = document.getElementById("tb_007").value;
  	getDataLeave(tb_007, false);
    /*getApiLeave("01", tb_007);
    getApiLeave("02", tb_007);
    getApiLeave("03", tb_007);
    getApiLeave("04", tb_007);
    getApiLeave("05", tb_007);
    getApiLeave("06", tb_007);
    getApiLeave("99", tb_007);*/
}

function btn_reload_onclick() {
	let tb_007 = document.getElementById("tb_007").value;
  	if(tb_007.length > 0) {
      getDataLeave(tb_007, false);
    } else {
      alert(translate("msg.uni_form_001.002"));
    }
}

function tb_008_onclick() {
	document.getElementById("btn_search").click();
}

function tb_011_onclick() {
	document.getElementById("btn_search2").click();
}

function tb_012_onclick() {
	document.getElementById("btn_search2").click();
}

function getLevelUser() {
    var sqlId = "GET_LEVEL_ORG_USER";
    var params = [mainOrgUnitIds];
    var types = [12];
    ajax_DatabaseAccessor.query(sqlId, params, types, (data) => {
        if(data.recordValues[0] !== null && data.recordValues[0] !== undefined) {
            var recordValue = data.recordValues[0][0];

            var levelValue = document.getElementById("hn_001");

            if(recordValue !== null && recordValue !== undefined) {
                levelValue.value = recordValue;
            } else {
                levelValue.value = 5000;
            }
        }
    });
}

function getManagerId() {
    var tb005 = document.getElementById("tb_005").value;
    if(tb005.length > 0) {
        var sqlId = "GET_MANAGER_ID";
        var params = [tb005];
        var types = [12];
        ajax_DatabaseAccessor.query(sqlId, params, types, (data) => {
            var managerId = document.getElementById("hn_002");

            if(data.recordValues[0] !== null && data.recordValues[0] !== undefined) {
                var recordValue = data.recordValues[0][0];
                if(recordValue !== null && recordValue !== undefined) {
                    managerId.value = recordValue;
                } else {
                    managerId.value = "none";
                }
            } else {
                managerId.value = "none";
            }
        });
    }
}

function getNextManagerId() {
    var tb005 = document.getElementById("tb_005").value;
    if(tb005.length > 0) {
        var sqlId = "GET_NEXT_MANAGER_ID";
        var params = [tb005];
        var types = [12];
        ajax_DatabaseAccessor.query(sqlId, params, types, (data) => {
            if(data.recordValues[0] !== null && data.recordValues[0] !== undefined) {
                var recordValue = data.recordValues[0][2];
                var managerId = document.getElementById("hn_003");

                if(recordValue !== null && recordValue !== undefined) {
                    managerId.value = recordValue;
                } else {
                    managerId.value = "none";
                }
            }
        });
    }
}

function getDetailUser() {
    var tb_003 = document.getElementById("tb_003").value;
    if(tb_003.length > 0) {
        var sqlId = "get_detail_user";
        var params = [tb_003];
        var types = [12];
        ajax_DatabaseAccessor.query(sqlId, params, types, (data) => {
            if(data.recordValues[0] !== null && data.recordValues[0] !== undefined) {
                let hn_org_level = document.getElementById("hn_org_level");
                let hn_user_level = document.getElementById("hn_user_level");
                hn_org_level.value = data.recordValues[0][4];
                hn_user_level.value = data.recordValues[0][9];

                //console.log(data.recordValues[0]);
                //var recordValue = data.recordValues[0][2];
                /*var managerId = document.getElementById("hn_003");

                if(recordValue !== null && recordValue !== undefined) {
                managerId.value = recordValue;
                } else {
                managerId.value = "none";
                }*/
            }
        });
    }
}

function getNormalProcess() {
    let tb_003 = document.getElementById("tb_003").value;
    let tb_005 = document.getElementById("tb_005").value;

    if(tb_003.length > 0 && tb_005.length > 0) {
        var sqlId = "get_normal_process_sign_approval";
        var params = [tb_003, tb_005];
        var types = [12, 12];
        ajax_DatabaseAccessor.query(sqlId, params, types, (data) => {
            if(data.recordValues[0] !== null && data.recordValues[0] !== undefined) {
                document.getElementById("hn_new_001").value = data.recordValues[0][0];
                document.getElementById("hn_new_002").value = data.recordValues[0][1];
                document.getElementById("hn_new_003").value = data.recordValues[0][2];
                document.getElementById("hn_new_004").value = data.recordValues[0][3];
                document.getElementById("hn_new_005").value = data.recordValues[0][4];
                document.getElementById("hn_new_006").value = data.recordValues[0][5];
                document.getElementById("hn_new_007").value = data.recordValues[0][6];
                document.getElementById("hn_new_008").value = data.recordValues[0][7];
                document.getElementById("hn_new_009").value = data.recordValues[0][8];
                document.getElementById("hn_new_010").value = data.recordValues[0][9];
                document.getElementById("hn_new_011").value = data.recordValues[0][10];
                document.getElementById("hn_new_012").value = data.recordValues[0][11];
            }
        });
    }
}

function gridRowClick(pGridId) {
  	if (String(pGridId) === "aw36") {
        var tGrid001 = document.getElementById("grid001").value;
        var tData = eval(tGrid001);

        let grid001ColumnIds = [
            "",
            "tb_008",
            "tb_007",
            "hn_date_001",
            "hn_date_002",
            "hn_date_004",
            "hn_leave_absence",
            "drp_001",
            "tarea_001",
            "tb_012",
            "tb_011",
        ];

        grid001Selected = grid001Obj.getRowIndex();
        if (grid001Obj.getRowIndex() > -1) {
            for (var i = 0; i < grid001ColumnIds.length; i++) {
                if (grid001ColumnIds[i] != "") {
                    var tReplaceData = tData[grid001Obj.getRowIndex()][i];
                    tReplaceData = changeSpecialValue(
                        tReplaceData.toString(),
                        1
                    );

                    if (grid001ColumnIds[i] === "hn_date_001") {
                        let hn_date_001 = document.getElementById("hn_date_001");
                        let tReplaceDataSplit = tReplaceData.split(" ");
                        hn_date_001.value = tReplaceData;

                        document.getElementById("date_001_txt").value = tReplaceDataSplit[0];
                        document.getElementById("time_001_txt").value = tReplaceDataSplit[1];
                    }

                    if (grid001ColumnIds[i] === "hn_date_002") {
                        let hn_date_002 = document.getElementById("hn_date_002");
                        let tReplaceDataSplit = tReplaceData.split(" ");
                        hn_date_002.value = tReplaceData;

                        document.getElementById("date_002_txt").value = tReplaceDataSplit[0];
                        document.getElementById("time_002_txt").value = tReplaceDataSplit[1];
                    }

                    if (grid001ColumnIds[i] === "hn_leave_absence") {
                        let hn_leave_absence = document.getElementById("hn_leave_absence");
                        hn_leave_absence.value = tReplaceData;
                    }

                    if (grid001ColumnIds[i] === "drp_001") {
                        if (tReplaceData === "05" || tReplaceData === "06") {
                            changeVisibleDate(true);
                        }
                    }

                  	/*if (grid001ColumnIds[i] === "tb_007") {
                        getDataLeave(tReplaceData);
                    }*/

                    var tElement = document.getElementById(grid001ColumnIds[i]);
                    tElement.value = tReplaceData;

                    FormMgr.toPrettyValue(tElement);
                }
            }
            let tb_007 = document.getElementById("tb_007").value;
            getDataLeave(tb_007, true);
        }
    }
}

function validate(btn) {
    let message = "";
    let tb007 = document.getElementById("tb_007").value;
    let hn_date_004 = document.getElementById("hn_date_004").value;
    let tarea_001 = document.getElementById("tarea_001").value;
    let drp_001 = document.getElementById("drp_001");

    if (drp_001.value === "00") {
        message += translate("msg.uni_form_001.001") + "\n";
    }

    if (tb007.length <= 0) {
        message += translate("msg.uni_form_001.002") + "\n";
    }

    if (hn_date_004.length <= 0) {
        message += translate("msg.uni_form_001.003") + "\n";
    }

    if (tarea_001.length <= 0) {
        message += translate("msg.uni_form_001.004") + "\n";
    }

    let tGrid001 = document.getElementById("grid001").value;
    if (tGrid001 !== null && tGrid001 !== undefined) {
        let tGrid001Object = eval(tGrid001);
        if (tGrid001Object !== null && tGrid001Object !== undefined) {
            let totalTimeByLeaveCode = 0;
            let currentUserId = document.getElementById("tb_007").value;
            let currentLeaveCode = document.getElementById("drp_001").value;
            let currentLeaveTime = Number(
                document.getElementById("hn_date_004").value
            );

            if (btn === "edit") {
                tGrid001Object.forEach((v) => {
                    if (currentUserId === v[2] && currentLeaveCode === v[7] && Number(v[0]) !== (Number(grid001Obj.getRowIndex()) + 1)) {
                        totalTimeByLeaveCode += Number(v[5]);
                    }
                });
            } else {
                let haveCode = false;
                tGrid001Object.forEach((v) => {
                    if (currentUserId === v[2] && currentLeaveCode === v[7]) {
                        totalTimeByLeaveCode += Number(v[5]);
                        haveCode = true;
                    }
                });
                if((currentLeaveCode === "05" || currentLeaveCode === "06") && haveCode) {
                    message += translate("msg.uni_form_001.005") + "\n";
                }
            }

            if(currentLeaveCode !== "05" && currentLeaveCode !== "06") {
                if (Number(document.getElementById("hn_date_005").value) - totalTimeByLeaveCode - currentLeaveTime < 0) {
                    message += translate("msg.uni_form_001.006") + "\n";
                }
            }
        }
    }

    message += validateDate();

    return message;
}

function changeSpecialValue(pValue, pType) {
	if(pValue == null) {
		return "";
	}
	if(pType == '1') {
		pValue = pValue.replace(new RegExp("<#quot>", "gm"), "\'");
		pValue = pValue.replace(new RegExp("<br />", "gm"), "\r");
		pValue = pValue.replace(new RegExp("<#leftQuot>", "gm"), "\[");
		pValue = pValue.replace(new RegExp("<#rightQuot>", "gm"), "\]");
		pValue = pValue.replace(new RegExp("<#slash>", "gm"), "\\");
		pValue = pValue.replace(new RegExp("&lt;", "gm"), "<");
	}
	else if(pType == '2') {
		pValue = pValue.replace(new RegExp("<#quot>", "gm"), "\'");
		pValue = pValue.replace(new RegExp("<br />", "gm"), "\r");
		pValue = pValue.replace(new RegExp("<#leftQuot>", "gm"), "\[");
		pValue = pValue.replace(new RegExp("<#rightQuot>", "gm"), "\]");
		pValue = pValue.replace(new RegExp("<#slash>", "gm"), "\\");

		if( pValue.indexOf("<") > -1 ) {
            if( pValue.indexOf("<a ") > -1 ) {
            }
            else if( pValue.indexOf("<a ") > -1 ) {
            }
            else {
                pValue = pValue.replace(new RegExp("<", "gm"), "&lt;");
            }
        }
	}
	else if(pType == '3') {
		pValue = pValue.replace(new RegExp("'", "gm"), "<#quot>");
		pValue = pValue.replace(new RegExp("\r\n", "gm"), "<br />");
		pValue = pValue.replace(new RegExp("\n", "gm"), "<br />");
		pValue = pValue.replace(new RegExp("\\[", "gm"), "<#leftQuot>");
		pValue = pValue.replace(new RegExp("\\]", "gm"), "<#rightQuot>");
		pValue = pValue.replace(new RegExp("\\\\", "gm"), "<#slash>");
	}
	else if(pType == '4') {
		if(pValue.indexOf('&#') > -1 ) {
			pValue = pValue.replace(new RegExp("&", "gm"), "&amp;");
		}
	}
	return pValue;

}

function updateDate() {
    let date_001 = document.getElementById("date_001_txt").value;
    let date_002 = document.getElementById("date_002_txt").value;
    let time_001 = document.getElementById("time_001_txt").value;
    let time_002 = document.getElementById("time_002_txt").value;
    let drp_001 = document.getElementById("drp_001").value;

    let validated = false;

    if(time_001.length > 0) {
        if(checkTime(time_001, date_001)) {
            validated = true;
        } else {
            validated = false;
            alert(translate("msg.uni_form_001.007"));
            document.getElementById("time_001_txt").value = "";
        }
    }

    if(time_002.length > 0) {
        if(checkTime(time_002, date_002)) {
            validated = true;
        } else {
            validated = false;
            alert(translate("msg.uni_form_001.007"));
            document.getElementById("time_002_txt").value = "";
        }
    }

    if(date_001 === date_002 && time_001 === time_002) {
        alert(translate("msg.uni_form_001.008"));
        document.getElementById("time_002_txt").value = "";
        validated = false;
    }

    if(drp_001 == "00") {
        alert(translate("msg.uni_form_001.009"));
        validated = false;
        document.getElementById("time_002_txt").value = "";
    }

    if(date_001.length > 0 && date_002.length > 0 && time_001.length > 0 && time_002.length > 0 && validated) {
        let date001Split = date_001.split("/");
        let date002Split = date_002.split("/");
        let time001Split = time_001.split(":");
        let time002Split = time_002.split(":");

        let result = getResult(date001Split, date002Split, time001Split, time002Split);
        resultDate = result;
        date1 = date_001;
        date2 = date_002;

        let valid = validateDate();

        if(valid.length <= 0) {
            let lbl_date_001 = document.getElementById("lbl_date_001");
            let lbl_date_002 = document.getElementById("lbl_date_002");
            let lbl_date_003 = document.getElementById("lbl_date_003");

            lbl_date_001.innerHTML = result[0];
            lbl_date_002.innerHTML = result[1];
            lbl_date_003.innerHTML = result[2];

            document.getElementById("hn_date_001").value = date_001 + " " + time_001;
            document.getElementById("hn_date_002").value = date_002 + " " + time_002;

            document.getElementById("hn_date_004").value = time2dec((Number(result[0]) * 8) + result[1] + "h" + result[2] + "m");
        } else {
            alert(valid);
        }
    }
}

function checkTime(time, date) {
  let timeSplit = time.split(":");
  let dateSplit = date.split("/");
  let dateConvert = new Date(dateSplit[0], Number(dateSplit[1]) - 1, dateSplit[2]);

  if((Number(timeSplit[0]) >= 7 && Number(timeSplit[0]) <= 12) || (Number(timeSplit[0]) >= 13 && Number(timeSplit[0]) <= 16)) {
    if((Number(timeSplit[0]) === 12 && Number(timeSplit[1]) > 0) ||
       (Number(timeSplit[0]) === 7 && Number(timeSplit[1]) < 30) ||
       (Number(timeSplit[0]) === 16 && Number(timeSplit[1]) > 30) ||
       dateConvert.getDay() === 0) {
      return false;
    } else {
      if(dateConvert.getDay() === 6 && ((Number(timeSplit[0]) === 11 && Number(timeSplit[1]) > 30) || Number(timeSplit[0]) > 11)) {
        return false;
      }
	  return true;
    }
  } else {
    return false;
  }
}

function getTotalMinutes(date001, date002, time001, time002) {
  	let totalMinutes = 0;

    let startDate = new Date(date001[0], Number(date001[1]) - 1, date001[2], time001[0], time001[1]);
    let endDate = new Date(date002[0], Number(date002[1]) - 1, date002[2], time002[0], time002[1]);

  	if(startDate.getFullYear() === endDate.getFullYear() && startDate.getMonth() === endDate.getMonth() && startDate.getDate() === endDate.getDate()) {
      let startMinutes = 0;
      let endMinutes = 0;

      schedule.forEach((v, index) => {
        if(index === startDate.getDay()) {
          let dateStartFilter = v;
          if(index !== 6 && index !== 0) {
            let newEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), dateStartFilter[4].getHours(), dateStartFilter[4].getMinutes());
            let diff = newEndDate.getTime() - startDate.getTime();
            diff /= 60000;
            if(startDate.getHours() <= 12) {
              diff -= 60;
            }
            startMinutes += diff;
          }

          if(index === 6) {
            let newEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), dateStartFilter[2].getHours(), dateStartFilter[2].getMinutes());
            let diff = newEndDate.getTime() - startDate.getTime();
            diff /= 60000;
            startMinutes += diff;
          }
        }

        if(index === endDate.getDay()) {
          let dateEndFilter = v;
          if(index !== 0 && index !== 6) {
            let newStartDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), dateEndFilter[4].getHours(), dateEndFilter[4].getMinutes());

            let diff = newStartDate.getTime() - endDate.getTime();
            diff /= 60000;
            if(endDate.getHours() <= 12) {
              diff -= 60;
            }
            endMinutes += diff;
          }

          if(index === 6) {
            let newStartDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), dateEndFilter[2].getHours(), dateEndFilter[2].getMinutes());

            let diff = newStartDate.getTime() - endDate.getTime();
            diff /= 60000;
            endMinutes += diff;
          }
        }

      });

      totalMinutes = startMinutes - endMinutes;
    } else {
      schedule.forEach((v, index) => {
        if(index === startDate.getDay()) {
          let dateStartFilter = v;
          if(index !== 6 && index !== 0) {
            let newEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), dateStartFilter[4].getHours(), dateStartFilter[4].getMinutes());
            let diff = newEndDate.getTime() - startDate.getTime();
            diff /= 60000;
            if(startDate.getHours() <= 12) {
              diff -= 60;
            }
            totalMinutes += diff;
          }

          if(index === 6) {
            let newEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), dateStartFilter[2].getHours(), dateStartFilter[2].getMinutes());
            let diff = newEndDate.getTime() - startDate.getTime();
            diff /= 60000;
            totalMinutes += diff;
          }
        }

        if(index === endDate.getDay()) {
          let dateEndFilter = v;
          if(index !== 0) {
            let newStartDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), dateEndFilter[1].getHours(), dateEndFilter[1].getMinutes());

            let diff = endDate.getTime() - newStartDate.getTime();
            diff /= 60000;
            if(endDate.getHours() > 12) {
              diff -= 60;
            }
            totalMinutes += diff;
          }
        }

      });
    }

  	return totalMinutes;
}

function getBetweenDay(date001, date002, time001, time002) {
    let totalBetweenDay = 0;
    let isCompleted = false;
  	let totalSaturday = 0;

    let startDate = new Date(date001[0], Number(date001[1]) - 1, date001[2], time001[0], time001[1]);
    let endDate = new Date(date002[0], Number(date002[1]) - 1, date002[2], time002[0], time002[1]);

  	if(startDate.getDate() !== endDate.getDate() || startDate.getMonth() !== endDate.getMonth()) {
     	startDate.setDate(startDate.getDate() + 1);
    }

    do {
        if(startDate.getDate() !== endDate.getDate() || startDate.getMonth() !== endDate.getMonth()) {
          if(startDate.getDay() !== 0 && startDate.getDay() !== 6) {
            totalBetweenDay += 1;
          }

          if(startDate.getDay() === 6) {
            totalSaturday += 1;
          }

          startDate.setDate(startDate.getDate() + 1);

          isCompleted = false;
        } else {
          isCompleted = true;
        }
    } while(!isCompleted);

    return [totalBetweenDay, totalSaturday];
}

function getResult(date001, date002, time001, time002) {
  	const minutes = getTotalMinutes(date001, date002, time001, time002);
    const hour = Math.floor(minutes / 60);

    let day = Math.floor(hour / 8);

    let hourOver = hour - (day * 8);

    let minuteOver = Math.floor(minutes % 60);

  	let betweenDay = getBetweenDay(date001, date002, time001, time002);

    day += betweenDay[0];

  	if(betweenDay[1] > 0) {
      hourOver += betweenDay[1] * 4;
      if(hourOver === 8) {
        day += 1;
        hourOver = 0;
      }
      if(hourOver > 8) {
        day += Math.floor(hourOver / 8);
        hourOver = Math.floor(hourOver % 8);
      }
    }

    return [day, hourOver, minuteOver, hour, minutes];
}

function time2dec(tIn) {
    if(tIn == '')
        return 0;
    if(tIn.indexOf('h') >= 0 || tIn.indexOf(':') >= 0)
        return hm2dec(tIn.split(/[h:]/));
    if(tIn.indexOf('m') >= 0)
        return hm2dec([0,tIn.replace('m','')]);
    if(tIn.indexOf(',') >= 0)
        return parseFloat(tIn.split(',').join('.')).toFixed(2);
    if(tIn.indexOf('.') >= 0)
        return parseFloat(tIn);
    return parseInt(tIn, 10);
}

function hm2dec(hoursMinutes) {
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return (hours + minutes / 60).toFixed(2);
}

function validateDate() {
    let valid = "";

    let drp_001 = document.getElementById("drp_001").value;
  	if(drp_001 === "01") {
        if(Number(resultDate[4]) < 240) {
            valid += translate("msg.uni_form_001.010") + "\n";
            clearDate();
        }

        if(resultCode01.Result.Remain_hours === 0 || resultCode01.Result.Remain_hours === null || resultCode01.Result.Remain_hours === undefined) {
            valid += translate("msg.uni_form_001.012") + "\n";
            clearDate();
        } else {
            if(Number(resultCode01.Result.Remain_hours) < Number(time2dec((Number(resultDate[0]) * 8) + resultDate[1] + "h" + resultDate[2] + "m"))) {
                valid += translate("msg.uni_form_001.012") + "\n";
                clearDate();
            }
        }
    }

    if(drp_001 === "02") {
        if(Number(resultDate[4]) < 30) {
            valid += translate("msg.uni_form_001.011") + "\n";
            clearDate();
        }

        if(resultCode02.Result.Remain_hours === 0 || resultCode02.Result.Remain_hours === null || resultCode02.Result.Remain_hours === undefined) {
            valid += translate("msg.uni_form_001.012") + "\n";
            clearDate();
        } else {
            if(Number(resultCode02.Result.Remain_hours) < Number(time2dec((Number(resultDate[0]) * 8) + resultDate[1] + "h" + resultDate[2] + "m"))) {
                valid += translate("msg.uni_form_001.012") + "\n";
                clearDate();
            }
        }
    }

   if(drp_001 === "03") {
        if(Number(resultDate[4]) < 30) {
            valid += translate("msg.uni_form_001.011") + "\n";
            clearDate();
        }

        if(resultCode03.Result.Remain_hours === 0 || resultCode03.Result.Remain_hours === null || resultCode03.Result.Remain_hours === undefined) {
            valid += translate("msg.uni_form_001.012") + "\n";
            clearDate();
        } else {
            if(Number(resultCode03.Result.Remain_hours) < Number(time2dec((Number(resultDate[0]) * 8) + resultDate[1] + "h" + resultDate[2] + "m"))) {
                valid += translate("msg.uni_form_001.012") + "\n";
                clearDate();
            }
        }
    }

   if(drp_001 === "04") {
        if(Number(resultDate[4]) < 30) {
            valid += translate("msg.uni_form_001.011") + "\n";
            clearDate();
        }

        if(resultCode04.Result.Remain_hours === 0 || resultCode04.Result.Remain_hours === null || resultCode04.Result.Remain_hours === undefined) {
            valid += translate("msg.uni_form_001.012") + "\n";
            clearDate();
        } else {
            if(Number(resultCode04.Result.Remain_hours) < Number(time2dec((Number(resultDate[0]) * 8) + resultDate[1] + "h" + resultDate[2] + "m"))) {
                valid += translate("msg.uni_form_001.012") + "\n";
                clearDate();
            }
        }
    }

   if (drp_001 === "05") {
        if (Number(resultDate[4]) < 30) {
            valid += translate("msg.uni_form_001.011") + "\n";
            clearDate();
        }

        if (
            resultCode05.Result.Start_date === 0 ||
            resultCode05.Result.Start_date === null ||
            resultCode05.Result.Start_date === undefined
        ) {
            valid += translate("msg.uni_form_001.012") + "\n";
            clearDate();
        } else {
            let date1Converter = date1.replaceAll("/", "-");
            let date2Converter = date2.replaceAll("/", "-");
            if (
                date1Converter !== resultCode05.Result.Start_date ||
                date2Converter !== resultCode05.Result.End_date
            ) {
                valid += "Ngày phép không hợp lệ\n";
                clearDate();
            }
        }
   }

    if (drp_001 === "06") {
        if (Number(resultDate[4]) < 30) {
            valid += translate("msg.uni_form_001.011") + "\n";
            clearDate();
        }

        if (
            resultCode06.Result.Start_date === 0 ||
            resultCode06.Result.Start_date === null ||
            resultCode06.Result.Start_date === undefined
        ) {
            valid += "Phép không khả dụng\n";
            clearDate();
        } else {
            let date1Converter = date1.replaceAll("/", "-");
            let date2Converter = date2.replaceAll("/", "-");
            if (
                date1Converter !== resultCode06.Result.Start_date ||
                date2Converter !== resultCode06.Result.End_date
            ) {
                valid += "Ngày phép không hợp lệ\n";
                clearDate();
            }
        }
   }

  return valid;
}

function clearDate() {
    document.getElementById("time_002_txt").value = "";
    document.getElementById("lbl_date_001").innerHTML = "0";
    document.getElementById("lbl_date_002").innerHTML = "0";
    document.getElementById("lbl_date_003").innerHTML = "0";
}

function changeVisibleDate(disableBtn) {
  document.getElementById("date_001_txt").disabled = disableBtn;
  document.getElementById("date_002_txt").disabled = disableBtn;
  document.getElementById("time_001_txt").disabled = disableBtn;
  document.getElementById("time_002_txt").disabled = disableBtn;
  document.getElementById("date_001_btn").disabled = disableBtn;
  document.getElementById("date_002_btn").disabled = disableBtn;
  document.getElementById("time_001_btn").disabled = disableBtn;
  document.getElementById("time_002_btn").disabled = disableBtn;
}

function resetDate() {
    document.getElementById("date_001_txt").value = "";
    document.getElementById("date_002_txt").value = "";
    document.getElementById("time_001_txt").value = "";
    document.getElementById("time_002_txt").value = "";
    document.getElementById("lbl_date_001").innerHTML = "0";
    document.getElementById("lbl_date_002").innerHTML = "0";
    document.getElementById("lbl_date_003").innerHTML = "0";
    document.getElementById("hn_date_001").value = "";
    document.getElementById("hn_date_002").value = "";
    //document.getElementById("hn_leave_absence").value = "";
    document.getElementById("hn_date_004").value = "";
}

function getUserByOrg() {
    var tSqlId = "get_user_by_org";

    var tParma = ["06000300"];
    var tParmaType = [];
    tParmaType.push(12);
    DWREngine.setAsync(false);
    ajax_DatabaseAccessor.query(tSqlId, tParma, tParmaType, function (data) {});
    DWREngine.setAsync(true);

    return true;
}

function openLoading() {
  let lbl_loading = document.getElementById("lbl_loading");
  lbl_loading.style.top = "0";
  lbl_loading.style.left = "0";
  lbl_loading.style.width = "100%";
  lbl_loading.style.height = "100%";
  lbl_loading.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
  lbl_loading.style.zIndex = "1060";
  lbl_loading.style.backdropFilter = "blur(1px)";
  lbl_loading.innerHTML = "<div style='top:30%;bottom:50%;left:50%;position:fixed'><div class='loader'></div></div>";
}

function closeLoading() {
  let lbl_loading = document.getElementById("lbl_loading");
  lbl_loading.style.top = "0";
  lbl_loading.style.left = "0";
  lbl_loading.style.width = "0";
  lbl_loading.style.height = "0";
  lbl_loading.style.backgroundColor = "unset";
  lbl_loading.style.zIndex = "unset";
  lbl_loading.style.backdropFilter = "unset";
  lbl_loading.innerHTML = "";
}

function changeStyleListLable() {
  changeBackgroundLbl("lbl_005");
  changeDisplayLbl("lbl_005");

  changeBackgroundLbl("lbl_006");
  changeDisplayLbl("lbl_006");

  changeBackgroundLbl("lbl_011");
  changeDisplayLbl("lbl_011");

  changeBackgroundLbl("lbl_013");
  changeDisplayLbl("lbl_013");

  changeBackgroundLbl("lbl_015");
  changeDisplayLbl("lbl_015");
}

function changeBackgroundLbl(id) {
  document.getElementById(id).style.backgroundColor = "rgba( 0, 0, 0, 0.05)";
}

function changeDisplayLbl(id) {
  document.getElementById(id).style.display = "flex";
  document.getElementById(id).style.alignItems = "center";
  document.getElementById(id).style.justifyContent = "center";
}

function resizeDateBtn(id) {
  let element = document.getElementById(id);
  element.style.width = "25px";
  element.style.height = "25px";
}

function setUpButton(btn) {
  btn.style.cursor = "pointer";
  btn.style.background = "#0d6efd";
  btn.style.color = "#fff";
  btn.style.border = "1px solid transparent";
  btn.style.transition = "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out";
  btn.style.fontSize = "1rem";
  btn.style.fontWeight = "400";
  btn.style.lineHeight = "1.5";
  btn.style.textAlign = "center";
  btn.style.textDecoration = "none";
  btn.style.verticalAlign = "middle";

  btn.addEventListener('mouseover', () => {
    btn.style.color = "#fff";
    btn.style.backgroundColor = "#0b5ed7";
    btn.style.borderColor = "#0a58ca";
  });

  btn.addEventListener('mouseout', () => {
    btn.style.background = "#0d6efd";
    btn.style.color = "#fff";
    btn.style.border = "1px solid transparent";
  });
}

function settingDefaultDate() {
  	const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);

  	let currentDate = new Date();
  	let currentDateFormat = currentDate.getFullYear() + "/" + padL(currentDate.getMonth() + 1) + "/" + padL(currentDate.getDate());

  	let date_001_txt = document.getElementById("date_001_txt");
  	date_001_txt.value = currentDateFormat;

  	let date_002_txt = document.getElementById("date_002_txt");
  	date_002_txt.value = currentDateFormat;

  	if(Number(currentDate.getDay()) !== 0) {
      	let time_001_txt = document.getElementById("time_001_txt");
        time_001_txt.value = "07:30";

        /*if(Number(currentDate.getDay()) === 6) {
            let time_002_txt = document.getElementById("time_002_txt");
            time_002_txt.value = "11:30";
        } else {
            let time_002_txt = document.getElementById("time_002_txt");
            time_002_txt.value = "16:30";
        }*/
    }
}

function getBrandName() {
  let sqlId = "SP_GetUserOfBrand";
  let params = [userId];
  let types = [12];
  ajax_DatabaseAccessor.query(sqlId, params, types, (data) => {
    let hn_brandName = document.getElementById("hn_brandName");

    if(data.recordValues[0] !== null && data.recordValues[0] !== undefined && hn_brandName !== null && hn_brandName !== undefined) {
      var recordValue = data.recordValues[0][0];
      if(recordValue !== null && recordValue !== undefined) {
        hn_brandName.value = recordValue;
      } else {
        hn_brandName.value = "none";
      }
    } else {
      hn_brandName.value = "none";
    }
  });
}

function checkDateWhenChangeDrp() {
    let drp_001 = document.getElementById("drp_001");

    if(drp_001.value !== "00") {
        let text = drp_001.options[drp_001.selectedIndex].innerHTML;
        document.getElementById("hn_leave_absence").value = text;
    }

    let tb_007 = document.getElementById("tb_007").value;

    switch(drp_001.value) {
        case "01":
            if(resultCode01 === null || resultCode01 === undefined) {
            getDataLeave(tb_007, false);
            } else {
            if(Number(resultCode01.Result.Remain_hours) === 0 || resultCode01.Result.Remain_hours === null || resultCode01.Result.Remain_hours === undefined) {
                lbl_024.innerHTML = translate("msg.uni_form_001.013", "0");
                hn_date_005.value = 0;
                changeVisibleDate(true);
            } else {
                lbl_024.innerHTML = translate("msg.uni_form_001.013", resultCode01.Result.Remain_hours);
                hn_date_005.value = Number(resultCode01.Result.Remain_hours);
                changeVisibleDate(false);
            }
            }
            break
        case "02":
            if(resultCode02 === null || resultCode02 === undefined) {
            getDataLeave(tb_007, false);
            } else {
            if(Number(resultCode02.Result.Remain_hours) === 0 || resultCode02.Result.Remain_hours === null || resultCode02.Result.Remain_hours === undefined) {
                lbl_024.innerHTML = translate("msg.uni_form_001.013", "0");
                hn_date_005.value = 0;
                changeVisibleDate(true);
            } else {
                lbl_024.innerHTML = translate("msg.uni_form_001.013", resultCode02.Result.Remain_hours);
                hn_date_005.value = Number(resultCode02.Result.Remain_hours);
                changeVisibleDate(false);
            }
            }
            break
        case "03":
            if(resultCode03 === null || resultCode03 === undefined) {
                getDataLeave(tb_007, false);
            } else {
                if(Number(resultCode03.Result.Remain_hours) === 0 || resultCode03.Result.Remain_hours === null || resultCode03.Result.Remain_hours === undefined) {
                    lbl_024.innerHTML = translate("msg.uni_form_001.013", "0");
                    hn_date_005.value = 0;
                    changeVisibleDate(true);
                } else {
                    lbl_024.innerHTML = translate("msg.uni_form_001.013", resultCode03.Result.Remain_hours);
                    hn_date_005.value = Number(resultCode03.Result.Remain_hours);
                    changeVisibleDate(false);
                }
            }
            break
        case "04":
            if(resultCode04 === null || resultCode04 === undefined) {
                getDataLeave(tb_007, false);
            } else {
                if(Number(resultCode04.Result.Remain_hours) === 0 || resultCode04.Result.Remain_hours === null || resultCode04.Result.Remain_hours === undefined) {
                    lbl_024.innerHTML = translate("msg.uni_form_001.013", "0");
                    hn_date_005.value = 0;
                    changeVisibleDate(true);
                } else {
                    lbl_024.innerHTML = translate("msg.uni_form_001.013", resultCode04.Result.Remain_hours);
                    hn_date_005.value = Number(resultCode04.Result.Remain_hours);
                    changeVisibleDate(false);
                }
            }
            break
        case "05":
            if(resultCode05 === null || resultCode05 === undefined) {
                getDataLeave(tb_007, false);
            } else {
                if(resultCode05.Result.Start_date !== null && resultCode05.Result.Start_date !== undefined) {
                    lbl_024.innerHTML = resultCode05.Result.Start_date + " ~ " + resultCode05.Result.End_date;
                    document.getElementById("time_001_txt").value = "07:30";
                    document.getElementById("date_001_txt").value = resultCode05.Result.Start_date.replaceAll("-", "/");

                    let endDateReplace = resultCode05.Result.End_date.replaceAll("-", "/");
                    document.getElementById("date_002_txt").value = endDateReplace;
                    let endDateConverter = new Date(endDateReplace);
                    if(endDateConverter.getDay() === 6) {
                        document.getElementById("time_002_txt").value = "11:30";
                    } else {
                        document.getElementById("time_002_txt").value = "16:30";
                    }
                    updateDate();
                } else {
                    lbl_024.innerHTML = translate("msg.uni_form_001.013", "0");
                }
                changeVisibleDate(true);
            }
            break
        case "06":
            if(resultCode06 === null || resultCode06 === undefined) {
                getDataLeave(tb_007, false);
            } else {
                if(resultCode06.Result.Start_date !== null && resultCode06.Result.Start_date !== undefined) {
                    lbl_024.innerHTML = resultCode06.Result.Start_date + " ~ " + resultCode06.Result.End_date;
                    document.getElementById("time_001_txt").value = "07:30";
                    document.getElementById("date_001_txt").value = resultCode06.Result.Start_date.replaceAll("-", "/");

                    let endDateReplace = resultCode06.Result.End_date.replaceAll("-", "/");
                    document.getElementById("date_002_txt").value = endDateReplace;
                    let endDateConverter = new Date(endDateReplace);
                    if(endDateConverter.getDay() === 6) {
                        document.getElementById("time_002_txt").value = "11:30";
                    } else {
                        document.getElementById("time_002_txt").value = "16:30";
                    }
                    updateDate();
                } else {
                    lbl_024.innerHTML = translate("msg.uni_form_001.013", "0");
                }
                changeVisibleDate(true);
            }
            break
        case "99":
            if(resultCode99 === null || resultCode99 === undefined) {
                getDataLeave(tb_007, false);
            } else {
                if(Number(resultCode99.Result.Remain_hours === 0) || resultCode99.Result.Remain_hours === null || resultCode99.Result.Remain_hours === undefined) {
                    lbl_024.innerHTML = translate("msg.uni_form_001.013", "0");
                    hn_date_005.value = 0;
                    changeVisibleDate(true);
                } else {
                    lbl_024.innerHTML = translate("msg.uni_form_001.013", resultCode99.Result.Remain_hours);
                    hn_date_005.value = Number(resultCode99.Result.Remain_hours);
                    changeVisibleDate(false);
                }
            }
            break
        case "00":
            lbl_024.innerHTML = "";
            break
    }
}

/*
function sendApiLeave(offCode, empCode, offDate, offHour, tk) {
  let data = JSON.stringify({
    "apiName": "afl",
    "url": "/api/VNPEC/GET_AFL_ACCU_HOURS",
    "data": {
      "emp_no": '{ "emp_no": "' + empCode +  '", "off_date": "' + offDate + '", "off_type": "' + offCode + '", "off_hours": ' + offHour + ' }',
    }
  });

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {

    }
  });

  xhr.open("POST", "https://afltp.pec.com.tw/api/Send");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer " + tk);

  xhr.send(data);
}

function getTotalMinutesByEachDay(date001, date002, time001, time002) {
  	let minutesArr = [];
  	let isCompleted = false;

    let startDate = new Date(date001[0], Number(date001[1]) - 1, date001[2], time001[0], time001[1]);
    let endDate = new Date(date002[0], Number(date002[1]) - 1, date002[2], time002[0], time002[1]);

  	if(startDate.getFullYear() === endDate.getFullYear() && startDate.getMonth() === endDate.getMonth() && startDate.getDate() === endDate.getDate()) {
      let startMinutes = 0;
      let endMinutes = 0;

      schedule.forEach((v, index) => {
        if(index === startDate.getDay()) {
          let dateStartFilter = v;
          if(index !== 6 && index !== 0) {
            let newEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), dateStartFilter[4].getHours(), dateStartFilter[4].getMinutes());
            let diff = newEndDate.getTime() - startDate.getTime();
            diff /= 60000;
            if(startDate.getHours() <= 12) {
              diff -= 60;
            }
            startMinutes += diff;
          }

          if(index === 6) {
            let newEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), dateStartFilter[2].getHours(), dateStartFilter[2].getMinutes());
            let diff = newEndDate.getTime() - startDate.getTime();
            diff /= 60000;
            startMinutes += diff;
          }
        }

        if(index === endDate.getDay()) {
          let dateEndFilter = v;
          if(index !== 0 && index !== 6) {
            let newStartDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), dateEndFilter[4].getHours(), dateEndFilter[4].getMinutes());

            let diff = newStartDate.getTime() - endDate.getTime();
            diff /= 60000;
            if(endDate.getHours() <= 12) {
              diff -= 60;
            }
            endMinutes += diff;
          }

          if(index === 6) {
            let newStartDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), dateEndFilter[2].getHours(), dateEndFilter[2].getMinutes());

            let diff = newStartDate.getTime() - endDate.getTime();
            diff /= 60000;
            endMinutes += diff;
          }
        }
      });

      minutesArr.push([date001[0] + "-" +
                       date001[1] + "-" +
                       (String(date001[2]).length === 1 ? "0" : "") + date001[2],
                       time2dec(Math.floor((startMinutes - endMinutes) / 60) + "h" +
                                Math.floor((startMinutes - endMinutes) % 60) + "m")]);
    } else {
      schedule.forEach((v, index) => {
        if(index === startDate.getDay()) {
          let dateStartFilter = v;
          if(index !== 6 && index !== 0) {
            let newEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), dateStartFilter[4].getHours(), dateStartFilter[4].getMinutes());
            let diff = newEndDate.getTime() - startDate.getTime();
            diff /= 60000;
            if(startDate.getHours() <= 12) {
              diff -= 60;
            }
            minutesArr.push([date001[0] + "-" +
                             date001[1] + "-" +
                             (String(date001[2]).length === 1 ? "0" : "") + date001[2],
                             time2dec(Math.floor(diff / 60) + "h" + Math.floor(diff % 60) + "m")]);
          }

          if(index === 6) {
            let newEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), dateStartFilter[2].getHours(), dateStartFilter[2].getMinutes());
            let diff = newEndDate.getTime() - startDate.getTime();
            diff /= 60000;
            minutesArr.push([date001[0] + "-" +
                             date001[1] + "-" +
                             (String(date001[2]).length === 1 ? "0" : "") + date001[2],
                             time2dec(Math.floor(diff / 60) + "h" + Math.floor(diff % 60) + "m")]);
          }
        }

        if(index === endDate.getDay()) {
          let dateEndFilter = v;
          if(index !== 0) {
            let newStartDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), dateEndFilter[1].getHours(), dateEndFilter[1].getMinutes());

            let diff = endDate.getTime() - newStartDate.getTime();
            diff /= 60000;
            if(endDate.getHours() > 12) {
              diff -= 60;
            }
            minutesArr.push([date002[0] + "-" +
                             date002[1] + "-" +
                             (String(date002[2]).length === 1 ? "0" : "") + date002[2],
                             time2dec(Math.floor(diff / 60) + "h" + Math.floor(diff % 60) + "m")]);
          }
        }

      });
    }

    let startDate2 = new Date(date001[0], Number(date001[1]) - 1, date001[2], time001[0], time001[1]);
    let endDate2 = new Date(date002[0], Number(date002[1]) - 1, date002[2], time002[0], time002[1]);

  	if(startDate2.getDate() !== endDate2.getDate() || startDate2.getMonth() !== endDate2.getMonth()) {
     	startDate2.setDate(startDate.getDate() + 1);
    }

    do {
        if(startDate2.getDate() !== endDate2.getDate() || startDate2.getMonth() !== endDate2.getMonth()) {
          if(startDate2.getDay() !== 0) {
         	  if(startDate2.getDay() === 6) {
         	    minutesArr.push([startDate.getFullYear() + "-"
         	      + (String(startDate2.getMonth() + 1).length === 1 ? "0" : "") +
         	        (startDate2.getMonth() + 1) + "-" +
         	        (String(startDate2.getDate()).length === 1 ? "0" : "") + startDate2.getDate(), time2dec("4h0m")]);
         	  }
         	  if(startDate2.getDay() !== 6) {
         	    minutesArr.push([startDate.getFullYear() + "-"
         	      + (String(startDate2.getMonth() + 1).length === 1 ? "0" : "") +
         	        (startDate2.getMonth() + 1) + "-" +
         	        (String(startDate2.getDate()).length === 1 ? "0" : "") + startDate2.getDate(), time2dec("8h0m")]);
         	  }
         	}

          startDate2.setDate(startDate2.getDate() + 1);

          isCompleted = false;
        } else {
          isCompleted = true;
        }
    } while(!isCompleted);

  	return minutesArr;
}*/

function getApiToken() {
    //if(String(activityId) === "requester") {
        openLoading();
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
            loaded += 1;
            token = JSON.parse(this.responseText).access_token;
            getApiLeave("01", userId);
            getApiLeave("02", userId);
            getApiLeave("03", userId);
            getApiLeave("04", userId);
            getApiLeave("05", userId);
            getApiLeave("06", userId);
            getApiLeave("99", userId);
            drp_001_onchange();
            }
        });

        xhr.open("GET", "http://172.16.1.120:8087/api/v1/authentication");
        //xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send();
        setTimeout(() => {
            closeLoading();
        }, 3000);
    //}
}

function getApiLeave(offCode, empCode) {
  	var data = JSON.stringify({
    "apiName": "afl",
    "url": "/api/VNPEC/GET_AFL_INFO",
    "data": {
      "emp_no": empCode,
      "off_code": offCode
    }
  });

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      switch(offCode) {
        case "01":
          resultCode01 = JSON.parse(this.responseText);
      	  //let select = document.getElementById("drp_001");
		  //const selectedText = select.options[1];
          //selectedText.innerHTML = selectedText.text + " (còn lại <strong>" + resultCode01.Result.Remain_hours + " </strong> Giờ)";
          //console.log(resultCode01);
          break
        case "02":
          resultCode02 = JSON.parse(this.responseText);
          break
        case "03":
          resultCode03 = JSON.parse(this.responseText);
          break
        case "04":
          resultCode04 = JSON.parse(this.responseText);
          break
        case "05":
          resultCode05 = JSON.parse(this.responseText);
          break
        case "06":
          resultCode06 = JSON.parse(this.responseText);
          break
        case "99":
          resultCode99 = JSON.parse(this.responseText);
          break
      }
    }
  });

  xhr.open("POST", "https://afltp.pec.com.tw/api/Send");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer " + token);

  xhr.send(data);
}

function translate(key, ...params) {
    let result = "";

    const data = {
        "zh_TW": {
            "msg.uni_form_001.001": "請選擇假別",
            "msg.uni_form_001.002": "請填寫請假員",
            "msg.uni_form_001.003": "請填寫請假時間",
            "msg.uni_form_001.004": "請填寫事由",
            "msg.uni_form_001.005": "您已經增加了這種假",
            "msg.uni_form_001.006": "假數不足",
            "msg.uni_form_001.007": "請選擇在辦公時間內的時間！",
            "msg.uni_form_001.008": "開始時間和結束時間不能相同！",
            "msg.uni_form_001.009": "請先選擇假別",
            "msg.uni_form_001.010": "年假別不能少於4小時",
            "msg.uni_form_001.011": "假別不能少於30分鐘",
            "msg.uni_form_001.012": "您的假數不足",
            "msg.uni_form_001.013": "{{param_0}}小時",
            "msg.uni_form_001.014": "請在表格中輸入資料"
        },
        "vi_VN": {
            "msg.uni_form_001.001": "Vui lòng chọn loại nghỉ phép",
            "msg.uni_form_001.002": "Vui lòng nhập nhân viên nghỉ phép",
            "msg.uni_form_001.003": "Vui lòng nhập thời gian nghỉ phép",
            "msg.uni_form_001.004": "Vui lòng nhập lý do",
            "msg.uni_form_001.005": "Bạn đã thêm loại phép này!",
            "msg.uni_form_001.006": "Không đủ ngày phép",
            "msg.uni_form_001.007": "Vui lòng chọn thời gian trong giờ hành chính!",
            "msg.uni_form_001.008": "Thờ gian bắt đầu và kết thúc không thể giống nhau!",
            "msg.uni_form_001.009": "Vui lòng chọn loại nghỉ phép trước",
            "msg.uni_form_001.010": "Loại phép năm không thể nhỏ hơn 4 giờ",
            "msg.uni_form_001.011": "Loại phép không thể nhỏ hơn 30 phút",
            "msg.uni_form_001.012": "Phép của bạn không đủ",
            "msg.uni_form_001.013": "{{param_0}} Giờ",
            "msg.uni_form_001.014": "Vui lòng nhập dữ liệu vào bảng"
        }
    }

    result = data[locale]?.[key] || key;

    if (params.length > 0) {
        for (var i = 0; i < params.length; i++) {
            result = result.replace("{{param_" + i + "}}", params[i]);
        }
    }

    return result;
}
