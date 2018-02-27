function sum(a,b){
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			//console.log(a+b);
			resolve(a+b);
		},1000);
	});
}


function a(x,y){
	return new Promise( (resolve,reject) => {
		var re = sum(x,y);
		re.then(function(data) {
		resolve(data);
	});
	});
	
}


async function b(){
	console.log(await a(50,70));
}
b();



