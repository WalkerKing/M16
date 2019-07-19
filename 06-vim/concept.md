## buffer
### 概念
- vim 打开一个文件会将文件内容加载到缓冲区
- 修改都只是对内存缓冲区进行修改,而不会直接保存到文件
- 直到我们执行 `:w` 才会把修改内容保存到文件

### Buffer切换
- 使用 `:ls` 会列举当前缓冲区,然后使用`:b n`跳转到第n个缓冲区
- :bpre :bnext :first :blast
- 或者使用 :b buffer_name 加上tab补全来跳转

## window
- 窗口是可视化的分割区域
- :sp 水平分割 :vs 垂直分割
- ctrl + w w 在窗口间循环切换

## tab 容纳一系列窗口的容器

## text object 文本对象


