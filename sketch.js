var populationmax=100;
var mutationrate=1;
var target="rinoisagoodboy";
var population=[];
var pool=[];
var generations=0;
var max_score=0;
var bestpopulation;
function getchar(){
	var  c = floor(random(97, 122));
  	return String.fromCharCode(c);
}
function setup(){
	for(var i=0;i<populationmax;i++){
		population[i]=new Object();
		population[i].genes=[];
		population[i].score=0;
		for(var j=0;j<target.length;j++){
			population[i].genes[j]=getchar();
		}
	}
}
function calfitnessscore(){
	for(var i=0;i<populationmax;i++){
		var temp_score=0;
		var temp=population[i].genes;
		for(var j=0;j<temp.length;j++){
			if(temp[j]==target[j]){
				temp_score++;
			}
		}
		temp_score=temp_score/target.length;
		population[i].score=temp_score;
	}
}
function crossover(parenta,parentb){
	var child=new Object();
	child.genes=[];
	child.score=0;	
	var midpoint=floor(random(target.length));
	for(var i=0;i<target.length;i++){
		if(i>midpoint){
			child.genes[i]=parenta.genes[i];
		}
		else{
			child.genes[i]=parentb.genes[i];
		}
	}
	return child;
}
function mutate(child){
	for(var i=0;i<target.length;i++){
		if(random(100)<mutationrate){
			child.genes[i]=getchar();
		}
	}
	return child;
}
function naturalselection(){
	//forming poo
	pool=[];
	for(var i=0;i<populationmax;i++){
		var score=population[i].score;
		score=floor(score*100);
		for(var j=0;j<score;j++){
			pool.push(population[i]);
		}
	}
	for(var i=0;i<populationmax;i++){
		var temp=floor(random(0,pool.length));
		var parenta=pool[temp];
		var temp=floor(random(0,pool.length));
		var parentb=pool[temp];
		var child=crossover(parenta,parentb);
		child=mutate(child);	
		population[i]=child;
	}
	generations++;
}
function isfinished(){
	for(var i=0;i<populationmax;i++){
		if(population[i].score==1)
			return true;
	}
	return false;
}
function draw(){
	calfitnessscore();
	var temp_max=0;
	var temp_population;
	for(var i=0;i<populationmax;i++){
		if(population[i].score>temp_max){
			temp_max=population[i].score;
			temp_population=population[i];
		}
	}
	bestpopulation=temp_population;
	max_score=temp_max;
	var temp="";
	for(var i=0;i<target.length;i++){
		temp+=temp_population.genes[i];
	}	
	document.getElementById("bestpopulation").innerHTML="Current Best Pop: "+temp;
	document.getElementById("bestscore").innerHTML="Current Best Score: "+max_score;
	document.getElementById("generations").innerHTML="generations: "+generations;
	var html="";
	for(var i=0;i<populationmax;i++){
		for(var j=0;j<population[i].genes.length;j++)
				html+=population[i].genes[j];
		html+="<br>"
	}
	document.getElementById("populations").innerHTML=html;
	if(isfinished()){
		noLoop();
	}
	naturalselection();
}