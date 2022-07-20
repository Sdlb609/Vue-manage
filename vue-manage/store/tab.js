import Cookie from "js-cookie";

export default{
    state:{
        isCollapse:false,       //控制侧边栏是否展开,false为默认展开
        tabsList: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMenu: null,
        menu: []
    },
    mutations:{                 
        collapseMenu(state){        //更改展开状态的方法
            state.isCollapse = !state.isCollapse;
        },
        selectMenu(state, val){
            if(val.name !== 'home'){
                state.currentMenu = val
                const result = state.tabsList.findIndex(item => item.name === val.name)
                if(result === -1){
                    state.tabsList.push(val)
                }
            } else {
                state.currentMenu = null
            }
        },
        closeTag(state, val){
            const result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)
        },
        setMenu(state, val){
            state.menu = val        //缓存，避免丢失menu数据
            Cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state){
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state, router){
            if(!Cookie.get('menu')){
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    }) 
                    menuArray.push(...item.children)
                }else{
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            //路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('main', item)
            })
        }
    }
}