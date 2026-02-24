function func1(a,b)
{
    let result = a+b;
    return result;
    console.log("12345")
}
console.log("Addtion is : "+func1(4,5));

function func2(name = "yoyo") // when string is empty it gives 'undefined' value
{
    return `${name} login`
}
console.log(func2())

function func3(...name) // spread operator '...' converts value into array
{
    console.log(name)
}
// func3()
func3(100,20,40)

const func4 = (a,b)=>{
    console.log("Addition" + a+b)
}

//'this' keyword 
function person()
{
    // let username = "yo"
    username = "yo"
    
    console.log(this.username)
    // console.log(this)
}
person()

const arrowfunc = () =>{
    // let username = "goutam"
    username = "goutam"
    console.log(this.username)
    // console.log(this)
}
arrowfunc()