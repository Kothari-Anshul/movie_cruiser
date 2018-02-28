function getResultItem(id,content,collection_titles){
	/* Get the String you want to display in the body section of the accordian!*/
    var checkbox_str = "";
    for(let key in collection_titles){
        checkbox_str += `<input type = "checkbox" name = collection${id} value ="${key}"> ${key}<br>`;
    }
    var str_in = "";
    console.log((id == 0));
    if(id == 0){

        str_in = "";
        console.log(str_in);
    }
	var str  = 
	`<div class = "addBorder">
    <div class = "text-center">
        <img class = "tnai" src = "https://image.tmdb.org/t/p/w500${content["poster_path"]}" style = "width:300px; height:326px; margin-top:10px; margin-bottom:10px;">
    </div>
    <div class="panel panel-primary">
	<div class="panel-heading" id = "head${id}">
                        <h4 class="panel-title">
				        <a class="accordion-toggle" data-toggle="collapse"  href="#collapse${id}">
				          More Details
				        </a>
				      </h4>
                    </div>
                    <div id="collapse${id}" class="panel-collapse collapse ${str_in}">
                        <div class="panel-body">
                            
                            <br>
                            OVERVIEW: ${content["overview"]}
                            <br><br>
                            RATING: ${content["vote_average"]}
                            <br><br>SELECT TO ADD MOVIE TO YOUR COLLECTIONS:
                            <form action="#">
                                ${checkbox_str}
                               <div class = "text-center">
                                    <input type = "button" class = "btn btn-success" id="btn${id}" value = "Add to Collection">
                                </div>
                            </form>
                        </div>
                    </div>
    <div>
    </div>`

    return str;
}

