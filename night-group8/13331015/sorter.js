window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}
function getAllTables() {
	return document.getElementsByTagName("table");
}
function makeAllTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		var getTr = tables[i].getElementsByTagName("tr");
		var getHead = getTr[0]; //get head
		var getTh = getHead.cells;
		var getRows = new Array();
		for (var j = 1; j < getTr.length; j++) {
			getRows[j-1] = getTr[j]; //get row
		}
		for (var j = 0; j < getTh.length; j++) {
			getTh[j].onclick = SortTables(j, getRows, tables[i], getTh);
		}
	}
}

function SortTables(colnum, rows, table, getTh) {
	return function() {
		for (var k = 0; k < getTh.length; k++) {
			getTh[k].className = "";       
		}
		if (!ifsorted(colnum, rows)) {
			rows.sort(SortOrder(colnum));
			this.className = "up";
		} else {
			rows.reverse();
			this.className = "down";
		}
		for (var j = 0 ; j < rows.length ; j++) {
    		if (j % 2 == 0) {   
    			rows[j].className = "";
    		} else {    
    			rows[j].className = "alternate";
    		}
    		table.tBodies[0].appendChild(rows[j]);
    	}
    }
}
function SortOrder(colnum) {
	return function (rowa, rowb) {return rowa.cells[colnum].innerText > rowb.cells[colnum].innerText ? 1 : -1}
}
function ifsorted(colnum, rows) {
	for (var i = 1; i < rows.length; i++) {
		if (rows[i - 1].cells[colnum].innerText > rows[i].cells[colnum].innerText) {  
    	    return false;
        }
	}
	return true;
}
