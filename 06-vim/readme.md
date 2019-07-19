## study note

### 命令行状态下
^w 删除一个单词
^u 删除一行
^h 向前删除
^b 向前移动光标
^f 向后移动光标
^a 快速移动到开头
^e 快速移动到结尾

### 快速切换inset和normal模式
- 使用^c(但是可能会中断某些插件)或者^[
- gi快速跳转到你最后一次编辑的地方并进入插入模式

### 单词之间的移动
- w 跳转到下一个单词的开头
- b 跳转到上一个单词的开头

### 行间搜索移动
- f{char}可以移动到char上,t移动到char的前一个字符
- 如果第一次没搜到,可以用分好(;)/都好(,)继续搜该行下一个/上一个

### 快速移动到行首或者行尾
- 0 移动到行首第一个字符,^移动到第一个非空白字符
- $ 移动到行尾,g_移动到行尾非空字符
- 通常 0 $就满足需要了

### 页面移动
- gg 开头
- G 结尾
- zz 把当前行移动到屏幕中间
- ^u ^f 上下翻页,upword forward

## vim 增删改查
### 快速删除
- x 快速一个字符
- d 快速删除一个单词 daw d around word

### 快速修改
- r replace c change s substitute
- normal模式下使用r可以替换一个字符,s替换并进入插入模式

### 查询
- / 或者 ? 进行前向或者反向搜索
- 使用n / N 跳转到下一个或者上一个匹配

### 搜索替换
- substitute :[range]s[ubstitute]/{pattern}/{string}/{flags}
- range 范围 10,20 表示10-20行 % 表示全部 pattern 正则 
- flags g全局 c确认 n统计 

## 文本对象的操作方式
- [number]<command>[text object]
- number表示操作次数,command表示操作命令(d-delete,c-change,y-yank)
- text object 表示文本对象,w-word单词,s-sentence句子,p-paragraph段落
- iw-inner word, aw-around word,包含单词后面的空格
- ci"-删除引号中的内容,并进入插入模式,ciw-删除光标所在的单词并进入插入模式

## 复制黏贴
- normal模式下y-yank p-put进行复制粘贴,也可以使用d-delete p-put进行剪切粘贴
- 配合文本对象使用,yy复制一行,yiw复制一个单词
- insert模式下,使用cmd+v黏贴出现缩进问题 :set paste

## 无名寄存器
- 默认y和d命令都将操作内容放到了"无名寄存器"
- x删除一个字符,p粘贴一个字符,可以实现字符位置互换
- "{register},前缀指定寄存器,不指定默认使用无名寄存器
- "ayiw复制一个单词到a寄存器 "bdd删除一行到b寄存器中
- "+ 系统剪贴板,这里可以使用:echo has('clipboard')检查是否支持,返回1代表支持,0不支持,也可以执行:set clipboard=unnamed来把系统剪贴板设置为默认剪贴板,前提:vim要支持粘贴板寄存器

## vim 的宏
### 什么是宏
- 宏可以看成是一系列命令的集合
- 我们可以使用宏"录制"一系列操作,然后用于"回放"
- 宏可以非常方便地把一系列命令用在多行文本上

### 如何使用宏
宏的使用分为录制和回访
- vim使用q来录制,再次使用q结束录制
- 使用q{register}选择要保存的寄存器,把录制的命令保存其中
- 使用@{register}回放寄存器中保存的一系列命令

> 可以选中文本,然后进入命令行状态,输入normal + 命令,可以在命令行执行normal命令
> 例, :normal I"

## vim的补全
- ctrl n/p 补全单词
- ctrl x/f 补全文件名
- ctrl x/o 补全代码,需要开启文件类型检查,安装插件

## vim更换配色
- :colorscheme 显示当前的主题配色,默认是default
- :colorscheme <ctrl+ d> 可以显示所有配色
- :colorscheme 配色名,就可以修改配色
- 网络配色: 将相应文件复制到.vim/colors下就可以使用了

## nerdTree的快捷键设置




"Simple is better than complex"
"Simple is better than complex"
"Simile is better "than" complex"
"Simile is better "than" complex"

"Simple is better than complex
"Simile is better "than" complex
"Simple is better than complex
"Simple is better than complex
"
"
"class Child extends Parent {
    "constructor(name, age) {
        "super(name);
        "this.age = age;
    "}
    "sayHello() {
        "console.log(this.age)
        "return this.age;
    "}
"}
