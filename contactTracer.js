
class Queue
{
	constructor()
	{
		this.items = [];
	}
    push(element)
    {	
	
	this.items.push(element);
    }
    pop()
    {
	if(this.isEmpty())
		return "Underflow";
	return this.items.shift();
    }
    
    front()
    {
	if(this.isEmpty())
		return "No elements in Queue";
	return this.items[0];
    }
    
    isEmpty()
    {
	
	return this.items.length == 0;
    }
    printQueue()
    {
	var str = "";
	for(var i = 0; i < this.items.length; i++)
		str += this.items[i] +" ";
	return str;
    }
    size(){
        return this.items.length;
    }





	
}

const isPresent = (arr,node)=>{
    for(item in arr){
        if(arr[item]===node) return true;
    }
    return false;
}
const BFS = (adjList,contactList,infected,persons)=>{
    var level={};
    level[0]=[];
    level[1]=[];
    level[2]=[];
    var ht=0;
    queue = new Queue();
    
    var visited={};
    for(person in persons){
        visited[person]=false;
    }
    for(person in infected){
        queue.push(infected[person]);
        visited[person]=true;
    }
    
    
    while(!queue.isEmpty()){
        if(ht>2)    break;
        let s = queue.size();
        for(var i=0;i<s;i+=1){
            var t = queue.front();
            queue.pop();
            level[ht].push(t);
            var list = adjList.get(t);
            list.forEach(person=>{
                if(visited[person]===false)
                    {queue.push(person);visited[person]=true;}
            })
            // console.log(s);


            
        }
        console.log(visited);
        ht= ht+1;
    }
    console.log(level);
    return level;


}
const getGraph=()=>{
    var adjList = new Map();
   const persons = {
        "0": "Anil",
        "1": "Aman",
        "2": "Ajay",
        "3": "Bijoy",
        "4": "Beena",
        "5": "Cheema",
        "6": "Sam",
        "7": "Chandu",
        "8": "Dhaara",
        "9":  "Dharma",
        "10": "Fatima",
        "11": "Golu",
        "12": "Geek",
        "13": "Satya",
        "14": "Sanjeeb",
        "15": "Tushin"
    }
    contactList= {
        "0":["1","3","10","11"],
        "1":["2","4","7"],
        "2":['14',"15"],
        "3":[],
        "4":[],
        "5":["2","0","1"],
        "6":[],
        "7":[],
        "8":[],
        "9":[],
        "10":[],
        "11":[],
        "12":[],
        "13":[],
        "14":[],
        "15":[],

    }
    infected=["0","1"];
    for(person in persons){
        adjList.set(person,[]);
    }
    for(key in contactList){
        var src = key;
        contactList[src].forEach(element => {
            adjList.get(src).push(element);
            adjList.get(element).push(src);
        });
    }
    var level=BFS(adjList,contactList,infected,persons);
    var i1 = level[0].length;
    var c1 = level[1].length;
    var c2 = level[2].length;
    var safe =0;
    for(person in persons)
        safe+=1;
    safe= safe-i1-c1-c2;
    document.getElementById("infected").innerHTML= "Infected: "+i1;
    document.getElementById("contact1").innerHTML= "High Risk: "+c1;
    document.getElementById("contact2").innerHTML= "Medium Risk: "+c2;
    document.getElementById("safe").innerHTML= "Safe: "+safe;
    var cy = cytoscape({
        container: document.getElementById('cy'),
        style: [
            {
                selector: 'node',
                css: {
                    width: 50,
                    height: 50,
                    'background-color':'green',
                    content: 'data(name)',
                    
                }
                
            },
            {
                selector: '.infected',
                css: {
                    width: 50,
                    height: 50,
                    'background-color':'red',
                    content: 'data(name)',
                    
                }
                
            },
            {
                selector: '.contacted1',
                css: {
                    width: 50,
                    height: 50,
                    'background-color':'magenta',
                    content: 'data(name)',
                    
                }
                
            },
            {
                selector: '.contacted2',
                css: {
                    width: 50,
                    height: 50,
                    'background-color':'blue',
                    content: 'data(name)',
                    
                }
                
            },
            {
                selector: '.iedge',
                css: {
                    
                    // "curve-style": "bezier",
                    // "control-point-step-size": 40,
                    // "target-arrow-shape": "triangle",
                    lineColor:"red"
                }
            },
            {
                selector: '.c1edge',
                css: {
                    
                    // "curve-style": "bezier",
                    // "control-point-step-size": 40,
                    // "target-arrow-shape": "triangle",
                    lineColor:"magenta"
                }
            },
            {
                selector: '.c2edge',
                css: {
                    
                    // "curve-style": "bezier",
                    // "control-point-step-size": 40,
                    // "target-arrow-shape": "triangle",
                    lineColor:"blue"
                }
            },
            {
                selector: '.safe',
                css: {
                    
                    // "curve-style": "bezier",
                    // "control-point-step-size": 40,
                    // "target-arrow-shape": "triangle",
                    lineColor:"green"
                }
            }
        ],
        
        layout: {
            name: 'breadthfirst',
            directed: false,
            padding: 10,
           /* color: "#ffff00",*/
            fit: true
        }
    });
    
    for(person in persons){

        if(isPresent(level[0],person)){
            cy.add({
                        data: {id: person,name:persons[person]},
                        classes: "infected"
            })
        }
        else if(isPresent(level[1],person)){
            cy.add({
                        data: {id: person,name:persons[person]},
                        classes: "contacted1"
            })
        }
        else if(isPresent(level[2],person)){
            cy.add({
                data: {id: person,name:persons[person]},
                classes: "contacted2"
            })
        }
        else{
            cy.add({
                data: {id: person,name:persons[person]},
                classes:"safe"
                })
        }
    
        
        

    }
    for (const [key, value] of adjList.entries()) {
        var source = key;
        
        value.forEach(point=>{
            if(isPresent(level[0],source)||isPresent(level[0],point)){
                // console.log(source);
                cy.add({
                data:{
                    id: 'edge'+source+point,
                    source: source,
                    target: point
                },
                classes:"iedge"
                })
            }
            else if( isPresent(level[1],source)||isPresent(level[1],point)){
                cy.add({
                data:{
                    id: 'edge'+source+point,
                    source: source,
                    target: point
                },
                classes:"c1edge"
                })
            }
            else if( isPresent(level[2],source)||isPresent(level[2],point)){
                cy.add({
                data:{
                    id: 'edge'+source+point,
                    source: source,
                    target: point
                },
                classes:"c2edge"
                })
            }
            else{
                cy.add({
                data:{
                    id: 'edge'+source+point,
                    source: source,
                    target: point
                },
                classes:"safe"
            })
            }
            
        })
      }
    cy.layout({
        name: 'concentric'
    }).run();   
}
$(document).ready(function(){
    getGraph();
})