//Activity-1 : array, function,object declaration 
//Activity-2 : write code for reverse number 
//Activity-3 : write code for palindrom number 
//Activity-4 : write code for fibonachi series 
//Activity-5 : Find largest element in array 
//Activity-6 : remove duplicate number in array 
//Activity-7 : find missing number in array 
//Activity-8 : code for reverse a string  
//Activity-9 : count vowels in string  
//Activity-10 : check palindrome in string 
//Activity-11 : for numbers check prime, factorial number 
//Activity-12 : write code to find even or odd 
//Activity-13 : write code to find sum of array 

document.write("--------------Activity-1------------")
let arr1 = [1,2,3,34,4]
document.write("Array declared"+ arr1)
let func = function(){
    document.write("function declared")
}
func();

let obj  = {
    name : "G",
    ID : 136
}
document.write("Object declared "+ JSON.stringify(obj))

document.write("--------------Activity-2------------")
function reverseNumber(num)
{
    let rev  = 0;
    while(num>0){
        let digit = num%10
        rev = rev*10 + digit
        num = Math.floor(num/10)
    }
    return rev;
}
document.write("The reversed number is " + reverseNumber(123))

document.write("--------------Activity-3------------")
function isPalin(num)
{
    num = num.toString();
    let low = 0
    let high = num.length-1
    while(low<high)
        {
            if(num[low] != num[high]) return false;
            low++;
            high--;
        }
        return true;
    }
document.write("Is Palindrome " + isPalin(121))

document.write("--------------Activity-4------------")
function fibonachi(n)
{
    let a = 0, b = 1;
    for(let i=0;i<n;i++)
        {
            document.write(a)
            a = a + b;
            b = a - b;
        }
    }
document.write("Fibonachi series is : " + fibonachi(5))
    
document.write("--------------Activity-5------------")
let arr2 = [10,20,50,40,30,10]
document.write("The largest element in array is : " + Math.max(...arr2));

document.write("--------------Activity-6------------")
function removeDuplicates(arr2)
{
    let uniquearr = [...new Set(arr2)]
    return uniquearr;
}
document.write("Array before removing duplicates : " + arr2)
document.write("Array after removing duplicates : " + removeDuplicates(arr2))

document.write("--------------Activity-7------------")
let arr3 =  [0,1,2,3,4,5,7]
function findMissingNumber(arr3)
{
    let n = arr3.length;
    let sum = 0;
    for(let i=0;i<n;i++)
        {
            sum += arr3[i];
        }
        return (n*(n+1))/2 - sum;
    }
document.write("The array is : " + arr3)
document.write("The missing number in array is : " + findMissingNumber(arr3))

document.write("--------------Activity-8------------")
function revString(str)
{
    let revstr = ""
    for(let i = str.length-1;i>=0;i--)
        {
            revstr += str[i]
        }
        return revstr
    }
document.write("The reversed string is : " + revString("hello"))

document.write("--------------Activity-9------------")
function countVowels(str)
{
    let cnt = 0;
    for(let i=0;i<str.length;i++)
        {
            if('aeiouAEIOU'.includes(str[i])) cnt++;
        }
        return cnt;
    }
document.write("The number of vowels in the string are : " + countVowels("hello world"))

document.write("--------------Activity-10------------")
document.write("The code for this activity will remain same as activity-3")

document.write("--------------Activity-11------------")
function is_Prime_Fact(num)
{
    let isPrime = true;
    if(num <=1) isPrime = false;
    else if(num==2) isPrime = true;
    else if(num%2 == 0) isPrime = false;
    else
    {
        for(let i=3;i<Math.sqrt(num);i+=2)
            {
                if(num%i==0)
                    {
                        isPrime = false;
                        break;
                    }
            }            
    }
    document.write(`Is ${num} Prime : ${isPrime}`);
    let fact = 1;
    for(let i=2;i<=num;i++)
    {
            fact *= i;
    }
    document.write(`Factorial of ${num} is : ${fact}`);
};
is_Prime_Fact(5)

document.write("--------------Activity-12------------")
function even_odd(num)
{
    return num%2==0
}
document.write(`The number is : ${even_odd(4)?"Even":"Odd"}`)

document.write("--------------Activity-13------------")
function sumArray(arr4)
{
    let sum = 0;
    arr4.forEach(num=>{
        sum += num;
    })
    return sum
}
let arr4 = [10,,20,30,40,50]
document.write(`The sum of array is : ${sumArray(arr4)}`);