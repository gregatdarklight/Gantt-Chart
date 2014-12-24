
var taskStatus = {
	"SUCCESS" : "bar-done",
	"IN PROGRESS" : "bar-running",
	"PLANNED" : "bar-planned"
};

var taskTipCompute = function(d) {
	var format = d3.time.format("%H:%M:%S");
	var durationTotalSeconds = (d.endDate - d.startDate) / 1000;
	var durationSeconds = durationTotalSeconds % 60;
	var durationMinutesTotal = Math.floor(durationTotalSeconds / 60);
	var durationMinutes = durationMinutesTotal % 60;
	var durationHeures = Math.floor(durationMinutesTotal / 60);
	var durationDays = Math.floor(durationHeures / 24);
	var tipContent = d.taskName + " - ";
	if (durationDays > 0) {
		tipContent += durationDays + " days";
	}
	tipContent += "<br>";
	if (d.data && d.data.report) {
		tipContent += "<br>";
		tipContent += "<br>";
		tipContent += d.data.report;
	}
	tipContent += "<br>";
	tipContent += "<br>";
	switch (d.status) {
		case "SUCCESS":
			tipContent += "&nbsp;&nbsp;<span class=\"end\">SUCCESS</span>";
			break;
		case "IN_PROGRESS":
			tipContent += "&nbsp;&nbsp;<span class=\"eoj\">IN PROGRESS</span>";
			break;
		case "PLANNED":
				tipContent += "&nbsp;&nbsp;<span class=\"eoj\">PLANNED</span>";
		  break;
		default:
			tipContent += "Wrong status.";
			break;
	}
	tipContent += "<br>";
	return tipContent;
}

var clickFunction = function(d) {
	if (d.data && d.data.link) {
		location.href = d.data.link;
	}
	return;
}

function getHeightForGraph(gantt) {
	return 350;//document.body.clientHeight - parseInt(d3.select("h1").style('height')) - gantt.margin().top - gantt.margin().bottom - 30;
}

function getWidthForGraph(gantt) {
	return 800;//document.body.clientWidth - gantt.margin().right - gantt.margin().left - 5;
}

//First display of the gantt.
var format = "W%U";
var gantt = d3.gantt().taskStatus(taskStatus).tickFormat(format);
gantt.tipFunction(taskTipCompute).clickFunction(clickFunction)
gantt.margin({top : 20, right : 40, bottom : 20, left : 200});
gantt.width(getWidthForGraph(gantt));
gantt.height(getHeightForGraph(gantt));
gantt.rectRound(1);
gantt.horizontalLines(true);
gantt.activateZooming(true);
gantt.timeDomainMode("fit"); //automatic scale.
gantt(tasks);

//Auto resize
window.onresize = function(){
   gantt.height(getHeightForGraph(gantt));
   gantt.width(getWidthForGraph(gantt));
}
