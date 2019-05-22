

document.addEventListener("DOMContentLoaded",()=>{

    var convert = document.getElementById("convert");

    convert.addEventListener("click", (e) => {
        e.preventDefault()
        var text = document.querySelector("#text").value;
        // console.log(text)
        var show = document.querySelector(".show")
        if(text === "")
        {
            show.textContent = "Please Enter some quantity and unit"
            
        }
        else{
            var url = 'api/convert/?input='+text;
            fetch(url).then(data =>data.json())
                      .then(data=>{
                                   Object.keys(data).map(element =>{
                                       var node = document.createElement("LI"); 
                                       var f = `${element}   :  ${data[element]}`
                                       var textnode = document.createTextNode(f.toString()); // Create a text node
                                       node.appendChild(textnode);
                                       document.getElementById("output").appendChild(node);
                                       return node
                                   }) 
                                })
        }
    })
    
})
