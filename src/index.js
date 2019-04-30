import {createStore} from 'redux'
//
// 纯函数:函数结果只依赖于参数且没有副作用
// 创建一个reducer归纳函数，作用是传入一个state、一个action，返回一个新的state。（按下按钮后把这段文字添加到state）。

function addItem(state = [], action) {
    switch (action.type) {
        case 'ADD_ITEM':{
            return [action.text,...state]
        }
        default:
            return state;

    }

}

// 用createStore把reducer传入
const store=createStore(addItem)

// 写一个渲染函数来呈现状态变化，最重要的是用store.getState()方法取出store里面的状态值
function render(){
    const items = store.getState().map(item => (
        (item) ? `<li>${item}</li>` : ''
    ))
    document.getElementById('itemlist').innerHTML = `<ul>${items.join('')}</ul>`

}

// 订阅render函数到store，这种订阅会让store中如果有新的状态就重新调用一次render。（就是跟React很相似的设计。。。这种设计模式叫做
// pub-sub（发布-订阅）系统。）

store.subscribe(render)

// 触发事件要调用store.dispatch(action)。
document.getElementById('itemadd').addEventListener('click',()=>{
const itemText=document.getElementById('itemtext')
    store.dispatch({type:'ADD_ITEM',text:itemText.value})
    itemText.value=''

})