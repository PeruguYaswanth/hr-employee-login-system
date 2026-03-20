interface obj{
    name:string;
    id:number;

}
function def():obj{
    return{
        name:"yash",
        id:1,
    }
}
interface age{
    age:number;
}
let myage=():age=>{
    return{
        age:38,
    }
}
let multiply=(a:number,b:number):number=>{
    return a*b
}
interface Book{
    title:string,
    pages:number,
    author:string,
}
let myfunc=():Book=>{
    return{
        title:"its me",
        pages:4,
        author:"iam",

    }

}
interface employee{
    name:string;
    salary:number;
    department?:string;
}
let withdepart=():employee=>{
    return{
        name:"yash",
        salary:50000,
        department:"ece"
    }
}
let withoutdepart=():employee=>{
    return{
        name:"ram",
        salary:40000
    }
}
interface product{
    name:string;
    price:number;
}
let arr1:product[]=[]
arr1.push({name:"apple",price:20});

interface User{
    name:string;
    id:number;
}
function getuser():User{
    return {
        name:"yse",
        id:2
    }
}
interface employee{
    name:string;
    id:number;
    salary:number;
    bonus?:number;
}
function getsalary(emp:employee){
    if(emp.bonus){
        return  emp.salary+emp.bonus
    }
    else{
        return emp.salary
    }
}type role="admin"|"user"|"guest"
function defrole(Role:role):string{
    if(Role==="admin"){
        return "fullAccess"
    }
    else if(Role==="user"){
        return "Limited Access"
    }
    else{
        return "No Access"
    }
}