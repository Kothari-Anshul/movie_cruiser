function getResultItem(id,content,collection_titles){
	/* Get the String you want to display in the body section of the accordian!*/
    var checkbox_str = "";
    for(let key in collection_titles){
        checkbox_str += `<input type = "checkbox" name = collection${id} value ="${key}"> ${key}<br>`;
    }
    
	var str  = 
	`<div class="panel panel-default">
	<div class="panel-heading">
                        <h4 class="panel-title">
				        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse${id}">
				          ${content["original_title"]}
				        </a>
				      </h4>
                    </div>
                    <div id="collapse${id}" class="panel-collapse collapse">
                        <div class="panel-body">
                            ${content["overview"]}
                            <form action="#">
                                ${checkbox_str}
                               <div class = "text-center">
                                    <input type = "button" class = "btn btn-success" id="btn${id}" value = "Add to Collection">
                                </div>
                            </form>
                        </div>
                    </div>
    <div>`
    return str;
}

