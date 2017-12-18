/*
id  姓名   电话     拼音
1   张三  123456  zhangsan

l[{},[],{}]   w[{},{}]  d   g   d  
{
	l[{},[],{}]
	w[{},{}] 
	d
	g
	d  
}
*/
$(function(){
	// let arr = [
	// 	{id:1,name:'一',tel:'111111',pinyin:'yi'},
	// 	{id:2,name:'二',tel:'222222',pinyin:'er'},
	// 	{id:2,name:'二',tel:'222222',pinyin:'er'},
	// 	{id:2,name:'二',tel:'222222',pinyin:'er'},
	// 	{id:3,name:'三',tel:'333333',pinyin:'san'},
	// 	{id:4,name:'四',tel:'444444',pinyin:'si'},
	// 	{id:5,name:'五',tel:'555555',pinyin:'wu'},
	// 	{id:6,name:'六',tel:'666666',pinyin:'liu'},
	// 	{id:6,name:'六',tel:'666666',pinyin:'liu'},
	// 	{id:6,name:'六',tel:'666666',pinyin:'liu'},
	// 	{id:6,name:'六',tel:'666666',pinyin:'liu'},
	// 	{id:6,name:'六',tel:'666666',pinyin:'liu'},
	// 	{id:7,name:'七',tel:'777777',pinyin:'qi'},
	// 	{id:8,name:'八',tel:'888888',pinyin:'ba'},
	// 	{id:8,name:'九',tel:'999999',pinyin:'jiu'},
	// 	{id:8,name:'十',tel:'101010',pinyin:'shi'}
	// ];
	// localStorage.setItem('contact',JSON.stringify(arr));  //对象转字符串
	let data = JSON.parse(localStorage.getItem('contact'));  //字符串转对象
	let dl = $('dl')[0];
	let ul = $('.slide')[0];
	let tip = $('.tip')[0];
	let arr1 = [];
	let height = $('header')[0].offsetHeight + $('.tip')[0].offsetHeight;
	let search = $('input')[0];
	render(data);
	let dts = $('dt');
	Array.prototype.forEach.call(dts,function(element){
		arr1.push(element.offsetTop);
	});
	window.addEventListener('scroll',function(){
		let gdtTop = document.body.scrollTop || document.documentElement.scrollTop;
		arr1.forEach((element,index)=>{
			if(gdtTop + height >= element){
				tip.innerText = dts[index].innerText;
			}
		})
	});
	search.addEventListener('input',function(){
		let v = this.value.trim();
		let obj = data.filter(element => element.name.includes(v) || element.pinyin.includes(v) || element.tel.includes(v));
		render(obj);
	});
	function render(data){
		dl.innerHTML = "";
		ul.innerHTML = "";
		let obj = {};
		//联系人首字母分类
		data.forEach(person => {
			//联系人首字母去空大写：首字符做属性->属性值->联系人
			let firstChar = person.pinyin.trim().charAt(0).toUpperCase();
			if(!obj[firstChar]){   // 数据中没有该首字母，先初始化属性：新建一个空数组
				obj[firstChar] = [];
			}
			obj[firstChar].push(person);  //有首字母的直接插入
		})

		let keys = Object.keys(obj).sort();  //拿到属性，进行首字母排序
		//console.log(keys);
		tip.innerHTML = keys[0];
		keys.forEach(element => {
			dl.innerHTML += `<dt>${element}</dt>`;
			ul.innerHTML += `<li>${element}</li>`;
			obj[element].forEach(v =>{
				dl.innerHTML += `
					<dd>
						<a href="tel:${v.tel}">${v.name}</a>
					</dd>
				`;
			})
			
		})
	}
})