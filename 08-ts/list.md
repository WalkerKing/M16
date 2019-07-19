Question list
- 可索引的类型
```
// 将索引签名设置为只读，这样就防止了给索引赋值：
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
// 你不能设置myArray[2]，因为索引签名是只读的。
```
