import HashMap from "./hashMap.mjs";

let myHashMap = HashMap();

myHashMap.set("First", "Eric");
myHashMap.set("Second", "Zain");
myHashMap.set("Third", "Hamid");
myHashMap.set("Fourth", "Abood");
myHashMap.set("Fifth", "Tharri");
myHashMap.set("Sixth", "Maran");
myHashMap.set("Seventh", "Dey");
myHashMap.set("Eighth", "Arvin");
myHashMap.set("Ninth", "Victor");
myHashMap.set("Tenth", "John");
myHashMap.set("Eleventh", "Matthew");
myHashMap.set("Twelfth", "Kres");
myHashMap.set("Thirteenth", "Drake");
myHashMap.set("Fourteenth", "Sara");
myHashMap.set("Fifteenth", "Belle");

console.log(myHashMap.entries());
console.log(myHashMap.length());

console.log(myHashMap.get("Fourteenth")); // Sara
console.log(myHashMap.has("Sixth")); // True

console.log(myHashMap.values());
console.log(myHashMap.remove("Tenth")); // Removed John
console.log(myHashMap.values()); // No John in values
console.log(myHashMap.length()); // 14

console.log(myHashMap.entries());
myHashMap.clear();
console.log(myHashMap.entries()); // hashMap is empty
