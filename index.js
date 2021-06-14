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
        var t1 = {
            node: routes[key][0],
            distance: distances[key]
        }
        Adjlist.get(src).push(t);
        Adjlist.get(routes[key][1]).push(t1);
        
    }
    return Adjlist;
}
const isPresent = (arr,node)=>{
    for(item in arr){
        if(arr[item]===node) return true;
    }
    return false;
}
const handClick = ()=>{
    var src = document.getElementById("source").value;
    var dest = document.getElementById("destination").value;
    console.log(src);
    console.log(dest);
    console.log(state);
    var res = shortestPath(state.AdjList,src,dest);
    let optiRoute = res.path;
    console.log(optiRoute);
    var distance = res.distance;
    var dist = document.getElementById("cost");
    dist.innerHTML= "The total distance is: "+distance+" km";
    dist.style.display="block";
    var pathF = document.getElementById("route");
    var resString= "";
    resString+= "The cities in the minimum distance path will be: ";
    let newTemp = optiRoute;
    // newTemp.shift();
    console.log(newTemp);
    newTemp.forEach(city=>{
        resString+= state.cities[city]+" ";
        console.log(state.cities[city]);
    })
    pathF.innerHTML=resString;
    pathF.style.display="block";
    for(nodes in optiRoute) console.log(nodes);
    console.log(res);
    var cy = cytoscape({
            container: document.getElementById('cy'),
            boxSelectionEnabled: false,
            autounselectify: true,
            style: [
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
                    selector: ".edgeRoute",
                    css: {
                        "curve-style": "bezier",
                    "control-point-step-size": 40,
                   
                        lineColor:"blue"
                    }
                },
                {
                    selector: ".nodeRoute",
                    css:{
                        width: 50,
                        height: 50,
                        'background-color':'green'
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
            if(isPresent(optiRoute,city)){
                cy.add({
                    data: {id: city,name:state.cities[city]},
                    classes: 'nodeRoute'
                })
            }
            
            else{
                cy.add({
                    data: {id: city,name:state.cities[city]},
                })
            }
    
        }
        var visited={};
        for(city in state.cities){
            visited[city]=false;
        }
        for (const [key, value] of state.AdjList.entries()) {
            var source = key;
            for(var points of value){
                if(isPresent(optiRoute,source)&&isPresent(optiRoute,points['node'])&&(visited[points['node']]===false)){
                    visited[source]=true;
                    cy.add({
                        data:{
                            id: 'edge'+source+points['node'],
                            source: source,
                            target: points['node']
                        },
                        classes:'edgeRoute'
                    })
                }
                else if(visited[points['node']]===true){
                    console.log("yooo")
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
$(document).ready(function myFunc(){

    var cities = getCities();
    var distances = getDistances();
    var routes = getRoutes();
    var AdjList=getAdjacencyList(cities,distances,routes);
    state['cities']=cities;
    state['distances']=distances;
    state['routes']=routes;
    state['AdjList']=AdjList;
    
    makeGraph(cities,AdjList);
    
    console.log(shortestPath(AdjList,"1","8"));

    
});

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
const shortestPath=(adjList,src,end)=>{
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
            let newdistance = distance + +points['distance'];
            let v = points['node'];
            //console.log(newdistance);
            if(!visited[v] && distance!=Number.MAX_VALUE && newdistance<dist[v]){
                dist[v] = newdistance;
                parents[v] = node;
            }
        }
    }
    let shortestPath = [];
    let j=end;
    while(j)
    {
        shortestPath.push(j);
        j=parents[j];
    }
    shortestPath.reverse();
    let results = {
        distance: dist[end],
        path: shortestPath,
    };
    return results;
}
