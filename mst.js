var state={};
const getCities = ()=>{
    var cities;
    $.ajax({
        url: "./server/fetchCities.php",
        type: 'GET',
        async:false,
        datatype: 'json',
        success: function(data){
            cities= JSON.parse(data);
            
        }
    
    })
    return cities;
}
const getRoutes = ()=>{
    var routes;
    $.ajax({
        url: "./server/fetchRoutes.php",
        type: 'GET',
        async:false,
        datatype: 'json',
        success: function(data){
            routes= JSON.parse(data);
            
        }
    })
    return routes;
}
const getDistances = ()=>{
    var distances;
    $.ajax({
        url: "./server/fetchDistances.php",
        type: 'GET',
        async:false,
        datatype: 'json',
        success: function(data){
            distances= JSON.parse(data);
            
        }
    })
    return distances;
}
$(document).ready(function myfunc(){
    var cities = getCities();
    var distances = getDistances();
    var routes = getRoutes();
    console.log(distances);
    var AdjList=getAdjacencyList(cities,distances,routes);
    makeGraph(cities,AdjList);
})
const makeGraph=(cities,adjList)=>{
    var cy = cytoscape({
        container: document.getElementById('cy'),
        style: [
            {
                selector: 'node',
                css: {
                    width: 50,
                    height: 50,
                    'background-color':'#61bffc',
                    content: 'data(name)',
                    
                }
                
            }
        ],
        
        layout: {
            name: 'breadthfirst',
            directed: true,
            padding: 10,
           /* color: "#ffff00",*/
            fit: true
        }
    });
    
    for(city in cities){
    
        cy.add({
            data: {id: city,name:cities[city]}
        })

    }
    for (const [key, value] of adjList.entries()) {
        var source = key;
        for(var points of value){
            cy.add({
                data:{
                    id: 'edge'+source+points['node'],
                    source: source,
                    target: points['node']
                }
            })
        }
      }
    cy.layout({
        name: 'circle'
    }).run();   
}
const getAdjacencyList = (cities,distances,routes)=>{
    var Adjlist = new Map();
    for(city in cities){
        Adjlist.set(city,[]);
    }
    for(key in routes){
        var src = routes[key][0];
        var t = {
            node: routes[key][1],
            distance: distances[key]
        }
        Adjlist.get(src).push(t);
        
    }
    return Adjlist;
}

let shortestDistanceNode = (dist,visited)=>{
    let shortest = null;
    let distance = Number.MAX_VALUE;
    for(var node in dist)
    {
        if(!visited[node])
        {
            if(dist[node]<distance){
                shortest = node;
                distance = dist[node];
            }
        }
    }
    return shortest;
}
const getGraph = ()=>{
    var cities = getCities();
    var routes = getRoutes();
    var distances = getDistances();
    var adjList = getAdjacencyList(cities,distances,routes);
    state['cities']=cities;
    state['routes']= routes;
    state['distances']=distances;
    state['adjList']= adjList;
    return adjList;
}
const mst=()=>{
	var adjList = getGraph();

	var src = "1";

	let dist = {};
    let parents = {};
    let visited = {};
    for(const [key,value] of adjList.entries())
    {
        dist[key] = Number.MAX_VALUE;
        visited[key] = false;
    }
    parent[src] = "-1";
    dist[src] = 0;

    let size = adjList.size;
    size = size-1;
    while(size--)
    {
        let node = shortestDistanceNode(dist,visited);
        visited[node] = true;
        let distance = dist[node];
        let children = adjList.get(node);

        for(var points of children)
        {
            let v = points['node'];
            //console.log(newdistance);
            if(!visited[v] && (+points['distance'])<dist[v]){
                dist[v] = (+points['distance']);
                parents[v] = node;
            }
        }
    }
    let res = [];

    
    for(nodes in parents)
    {
    	var pair = {
    		u: nodes,
    		v: parents[nodes],
    	}
    	res.push(pair);
    }
    // console.log(mst);


    return res;
}
const isPresent = (arr,node)=>{
    for(item in arr){
        if(arr[item]===node) return true;
    }
    return false;
}
const isMSTEdge = (mst,n1,n2)=>{
    for (const [key, points] of mst.entries()){
        if((points['u']==n1 && points['v']==n2) || (points['u']==n2 && points['v']==n1))  return true;
    }
    return false;
}
const onClickHand = ()=>{
    var mstSet = mst();
    
    console.log(mstSet);
    // console.log(state);
    var cy = cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        autounselectify: true,
        style:[
            {
            selector: 'node',
            css: {
                width: 50,
                height: 50,
                'background-color':'#61bffc',
                content: 'data(name)'
            }
        },
        {
            selector: '.mstEdge',
            css:{
                    lineColor:"green"
            }
        }
    ],
        layout: {
            name: 'breadthfirst',
            directed: true,
            padding: 10,
           /* color: "#ffff00",*/
            fit: true
        }
    });
    for(city in state.cities){
       
        
        
            cy.add({
                data: {id: city,name:state.cities[city]},
            })
        

    }
    for (const [key, value] of state.adjList.entries()) {
        var source = key;
        for(var points of value){
            if(isMSTEdge(mstSet,source,points['node'])){
                cy.add({
                    data:{
                        id: 'edge'+source+points['node'],
                        source: source,
                        target: points['node']
                    },
                    classes:'mstEdge'
                })
            }
            else{
                cy.add({
                    data:{
                        id: 'edge'+source+points['node'],
                        source: source,
                        target: points['node']
                    }
                })
            }
            
            
        }
      }
      cy.layout({
        name: 'circle'
    }).run();

}